export const runtime = "nodejs";

import Groq from "groq-sdk";
import { buildPortfolioContext } from "@/lib/ai-context";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {

  try {

    const { message } = await req.json();

    const context = buildPortfolioContext();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: context,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {

    console.error(error);

    return Response.json({
      reply: "AI failed to respond."
    });
  }
}