import { Router } from "express";
import { GoogleGenAI } from "@google/genai";

const router = Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

router.post("/", async (req, res) => {
  try {
    const { question, vehicles } = req.body;

    if (!question) {
      return res.status(400).json({
        error: "Pergunta não informada."
      });
    }

    if (!vehicles || !Array.isArray(vehicles) || vehicles.length === 0) {
      return res.status(400).json({
        error: "Nenhum veículo foi informado."
      });
    }

   const prompt = `
Você é o assistente de inteligência automotiva
do sistema Ford Auto Intelligence.

Sua função é ajudar o usuário a entender e comparar
os veículos disponíveis no aplicativo.

REGRAS:
- Responda sempre em português.
- Seja claro e objetivo.
- Utilize os dados fornecidos abaixo para responder
  perguntas sobre os veículos.
- Não invente especificações.
- Se uma informação não estiver nos dados,
  informe que ela não está disponível.
- Valores "X", vazios ou nulos devem ser tratados
  como informação não disponível.
- Ao comparar veículos, deixe claro quais versões
  estão sendo comparadas.
- Você pode utilizar conhecimento automotivo geral
  apenas para explicar conceitos.
- Não utilize conhecimento externo para inventar
  características de um veículo.
- Responda somente em texto simples.
- Não utilize Markdown.
- Não utilize asteriscos para destacar palavras.
- Não utilize símbolos como **, *, # ou _ para formatação.
- Organize a resposta usando frases curtas e quebras de linha.

VEÍCULOS DISPONÍVEIS:

${JSON.stringify(vehicles, null, 2)}

PERGUNTA:

${question}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt
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