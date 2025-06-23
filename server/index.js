import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { OpenAI } from "openai";

config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Chat completion endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
    });

    res.json({ result: completion.choices[0].message });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Generate interview questions
app.post("/api/questions", async (req, res) => {
  try {
    const { questionsAmount, category, difficulty, jobRole, company } =
      req.body;

    if (!category || !difficulty) {
      return res
        .status(400)
        .json({ error: "category and difficulty are required" });
    }

    const prompt = `
You are an expert interview coach.
Generate "${questionsAmount}" interview questions focusing on the category "${category}" with difficulty "${difficulty}".
Make questions suitable for a ${jobRole || "technical"} role at ${
      company || "a company"
    }.
Return a JSON array of objects, each with fields: id, text, category, difficulty.
Example:
[
  { "id": 1, "text": "Question text here", "category": "category", "difficulty": "difficulty" }
]
Only output valid JSON without any markdown code block or explanation.
Ensure each feedback response is concise but somewhat detailed. Please limit to 3-4 sentences.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    });

    let raw = completion.choices[0].message.content || "";

    // Strip markdown code block formatting if present
    if (raw.startsWith("```json") || raw.startsWith("```")) {
      raw = raw.replace(/```json|```/g, "").trim();
    }

    let questions = [];
    try {
      questions = JSON.parse(raw);
    } catch (err) {
      console.warn("JSON parse failed, falling back to line parsing:", err);
      questions = raw
        .split("\n")
        .filter(Boolean)
        .map((text, idx) => ({
          id: idx + 1,
          text,
          category,
          difficulty,
        }));
    }

    res.json({ questions });
  } catch (error) {
    console.error("Error in /api/questions:", error);
    res.status(500).json({ error: "Failed to generate questions" });
  }
});

// Generate feedback for an answer
app.post("/api/feedback", async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res
        .status(400)
        .json({ error: "question and answer are required" });
    }

    const prompt = `
You are an expert interview coach. Given the interview question and the candidate's answer, provide clear and concise feedback.

Keep it to only 2 short sentences. Highlight one thing the candidate did well and one area they can improve. Do not use markdown, formatting, or lists.

Question: ${question}
Answer: ${answer}

Feedback:
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    });

    const rawFeedback = completion.choices[0].message.content.trim();
    const feedback = rawFeedback
      .split(/(?<=[.!?])\s+/) // split by sentence endings
      .slice(0, 2) // keep only 2 sentences
      .join(" ")
      .trim();

    res.json({ feedback });
  } catch (error) {
    console.error("Error in /api/feedback:", error);
    res.status(500).json({ error: "Failed to generate feedback" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
