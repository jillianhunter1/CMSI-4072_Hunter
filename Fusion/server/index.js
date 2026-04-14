require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

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

// const gemini = axios.create({
//   baseURL: 'https://generativelanguage.googleapis.com/v1',
//   headers: {
//     'Content-Type': 'application/json',
//     'x-goog-api-key': process.env.GEMINI_API_KEY,
//   },
// });

app.post("/api/prompt", async (req, res) => {
  const { prompt } = req.body;

  try {
    const [chatGPTResponse, claudeResponse] = await Promise.all([
      openai.post('/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      }),
      anthropic.post("/messages", {
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
      // gemini.post('/models/gemini-pro:generateContent', {
      //   contents: [{ parts: [{ text: prompt }] }],
      // }),
    ]);

    console.log('chatGPTResponse:', chatGPTResponse.data);
    console.log('claudeResponse:', claudeResponse.data);

    const responses = {
      chatGPT: chatGPTResponse.data.choices?.[0]?.message?.content,
      claude: claudeResponse.data.content?.[0]?.text,
    };

    // Use OpenAI to synthesize a beautiful, formatted summary
    const synthesisResponse = await openai.post('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { 
          role: 'system', 
          content: 'You are a high-precision entity extractor. Your ONLY task is to identify and list specific items or entities that appear in BOTH responses. \n\nSTRICT RULES:\n1. Output ONLY a bulleted list.\n2. NO FULL SENTENCES. NO EXPLANATIONS. NO VERBS.\n3. NO bolding and NO category headers.\n4. Each bullet must be 1-4 words maximum (e.g., "Harry Potter by J.K. Rowling").\n5. NO introductory or concluding text of any kind.\n6. DO NOT use words like "Both", "Shared", "Mentioned", or "Include".\n7. NO punctuation at the end of bullets.\n8. Return an empty string if no specific items overlap.' 
        },
        { 
          role: 'user', 
          content: `List the specific shared entities from these two responses:\n\n1: ${responses.chatGPT}\n\n2: ${responses.claude}` 
        }
      ],
    });

    const similarities = synthesisResponse.data.choices?.[0]?.message?.content;

    res.json({ responses, similarities });
  } catch (error) {
    if (error.response) {
      console.error('Error during API call:', error.response.data);
    } else {
      console.error('Error during API call:', error.message);
    }
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
