require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { sequelize, User, History } = require("./db");

const app = express();
const port = 3001;
const JWT_SECRET = process.env.JWT_SECRET || "your-default-secret-change-this";
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// Database logic (synced when running)

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return next(); // Token is optional for /api/prompt

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
  },
});

const anthropic = axios.create({
  baseURL: "https://api.anthropic.com/v1",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.CLAUDE_API_KEY,
    "anthropic-version": "2023-06-01",
  },
});

const gemini = axios.create({
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/models',
  headers: {
    'Content-Type': 'application/json',
  },
});

app.post("/api/auth/google", async (req, res) => {
  const { credential } = req.body;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    const [user] = await User.findOrCreate({
      where: { googleId },
      defaults: { email, name, picture },
    });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, picture: user.picture } });
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ error: "Invalid Google token" });
  }
});

app.get("/api/history", authenticateToken, async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  try {
    const history = await History.findAll({
      where: { UserId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

app.post("/api/prompt", authenticateToken, async (req, res) => {
  const { prompt } = req.body;

  try {
    const [chatGPTResult, claudeResult, geminiResult] = await Promise.allSettled([
      openai.post('/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      }),
      anthropic.post("/messages", {
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
      gemini.post('/gemini-2.5-flash:generateContent?key=' + process.env.GEMINI_API_KEY, {
        contents: [{ parts: [{ text: prompt }] }],
      }),
    ]);

    const responses = {
      chatGPT: chatGPTResult.status === 'fulfilled' ? chatGPTResult.value.data.choices?.[0]?.message?.content : `Error: ${chatGPTResult.reason.response?.data?.error?.message || chatGPTResult.reason.message}`,
      claude: claudeResult.status === 'fulfilled' ? claudeResult.value.data.content?.[0]?.text : `Error: ${claudeResult.reason.response?.data?.error?.message || claudeResult.reason.message}`,
      gemini: geminiResult.status === 'fulfilled' ? geminiResult.value.data.candidates?.[0]?.content?.parts?.[0]?.text : `Error: ${geminiResult.reason.response?.data?.error?.message || geminiResult.reason.message}`,
    };

    if (chatGPTResult.status === 'rejected') console.error('ChatGPT Error:', chatGPTResult.reason.response?.data || chatGPTResult.reason.message);
    if (claudeResult.status === 'rejected') {
      console.error('Claude Full Error:', JSON.stringify(claudeResult.reason.response?.data, null, 2));
    }
    if (geminiResult.status === 'rejected') console.error('Gemini Error:', geminiResult.reason.response?.data || geminiResult.reason.message);

    // Filter out error messages for synthesis
    const validResponses = Object.entries(responses)
      .filter(([_, content]) => !content.startsWith("Error:"))
      .map(([name, content]) => `${name}: ${content}`);

    let similarities = "";
    if (validResponses.length >= 2) {
      try {
        const synthesisResponse = await openai.post('/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: [
            { 
              role: 'system', 
              content: 'You are a high-precision entity extractor. Your ONLY task is to identify and list specific items or entities that appear in ALL provided responses. \n\nSTRICT RULES:\n1. Output ONLY a bulleted list.\n2. NO FULL SENTENCES. NO EXPLANATIONS. NO VERBS.\n3. NO bolding and NO category headers.\n4. Each bullet must be 1-4 words maximum.\n5. NO introductory or concluding text.\n6. Return an empty string if no specific items overlap.' 
            },
            { 
              role: 'user', 
              content: `List the specific shared entities from these responses:\n\n${validResponses.join('\n\n')}` 
            }
          ],
        });
        similarities = synthesisResponse.data.choices?.[0]?.message?.content;
      } catch (synthesisError) {
        console.error('Synthesis Error:', synthesisError.response?.data || synthesisError.message);
        similarities = "Error synthesizing similarities.";
      }
    } else {
      similarities = "Need at least two successful model responses to synthesize similarities.";
    }

    // Save to history if user is logged in
    if (req.user) {
      await History.create({
        UserId: req.user.id,
        prompt,
        chatGPTResponse: responses.chatGPT,
        claudeResponse: responses.claude,
        geminiResponse: responses.gemini,
        similarities,
      });
    }

    res.json({ responses, similarities });
  } catch (error) {
    console.error('Unexpected Error:', error);
    res
      .status(500)
      .json({ error: "An unexpected error occurred." });
  }
});

if (require.main === module) {
  sequelize.sync().then(() => {
    console.log("Database synced");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  });
}

module.exports = app;
