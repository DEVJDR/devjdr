// app/api/contact/ai/route.ts
export const runtime = "nodejs";

import Groq from "groq-sdk";
import { buildPortfolioContext } from "@/lib/ai-context";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message?.trim()) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const context = buildPortfolioContext();

    // Enable streaming from Groq
    const stream = await groq.chat.completions.create({
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
      stream: true, // ← very important!
    });

    // Create a ReadableStream to pipe Groq's chunks directly to client
    const readable = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          for await (const chunk of stream) {
            const content = chunk.choices?.[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch (err) {
          console.error("Streaming error:", err);
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no", // important for some hosts
      },
    });
  } catch (error) {
    console.error("API error:", error);

    return new Response(
      JSON.stringify({
        reply: "Sorry — something went wrong. Please try again.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}