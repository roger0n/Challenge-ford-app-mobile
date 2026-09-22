import { Router } from "express";
import { GoogleGenAI } from "@google/genai";

const router = Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        error: "Pergunta não informada."
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: question
    });

    return res.json({
      answer: response.text
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao consultar a IA."
    });
  }
});

export default router;