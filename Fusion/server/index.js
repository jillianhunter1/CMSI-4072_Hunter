require("dotenv").config();
const { findSimilarities } = require("./comparison.js");
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
      // gemini: geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text,
    };

    const similarities = findSimilarities(responses);

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
