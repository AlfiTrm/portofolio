import { NextRequest, NextResponse } from "next/server";
import { personalData } from "@/features/home/hero/data/personalData";
import { projectsData } from "@/features/home/projects/data/projectsData";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const requestCounts = new Map<string, { count: number; resetAt: number }>();
const portfolioTopics = [
  "alfi",
  "tsan",
  "tsani",
  "portfolio",
  "portofolio",
  "project",
  "proyek",
  "karya",
  "experience",
  "pengalaman",
  "skill",
  "kemampuan",
  "frontend",
  "front-end",
  "backend",
  "nestjs",
  "quality assurance",
  "ui/ux",
  "design",
  "desain",
  "contact",
  "kontak",
  "email",
  "hire",
  "kerja",
  "collaboration",
  "kolaborasi",
  "resume",
  "cv",
  "ifl",
  "it fest",
  "kbmdsi",
  "akademicompetition",
] as const;

const systemPrompt = `You are the portfolio assistant for ${personalData.name}, a ${personalData.title} based in Malang, Indonesia.
Only answer questions about Alfi, his portfolio, skills, projects, experience, or collaboration.
Politely refuse unrelated topics. Answer directly in 2-4 short sentences, and never invent facts.
Do not repeat the question or list every capability. Ask at most one relevant follow-up question.
Use plain text only. Use hyphen bullets only when the visitor asks for multiple items, without Markdown emphasis.
Current interests: frontend engineering, quality assurance, backend development with NestJS, and UI/UX design.
Projects: ${projectsData.projects.map(({ title, focus }) => `${title} (${focus})`).join("; ")}.
For hiring or collaboration, direct visitors to the Contact section.`;

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;

  const message = value as Record<string, unknown>;
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0 &&
    message.content.length <= 500
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const messages = (body as { messages?: unknown } | null)?.messages;

  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 8 || !messages.every(isChatMessage)) {
    return NextResponse.json({ error: "Invalid chat message." }, { status: 400 });
  }

  const userMessages = messages.filter((message) => message.role === "user");
  const latestQuestion = userMessages.at(-1)?.content.trim().toLowerCase() || "";

  if (/^(hi|hello|hey|halo|hai|pagi|siang|sore|malam)[!.?\s]*$/i.test(latestQuestion)) {
    return NextResponse.json({
      message: "Hey! Ask me about Alfi, his work, skills, or how to collaborate with him.",
    });
  }

  const isPortfolioTopic = portfolioTopics.some((topic) => latestQuestion.includes(topic));
  const hasPortfolioContext = userMessages
    .slice(0, -1)
    .some(({ content }) => portfolioTopics.some((topic) => content.toLowerCase().includes(topic)));
  const isClearFollowUp =
    hasPortfolioContext &&
    messages.some((message) => message.role === "assistant") &&
    /\b(dia|nya|beliau|tersebut|itu|his|him|that|those)\b/i.test(latestQuestion);

  if (!isPortfolioTopic && !isClearFollowUp) {
    return NextResponse.json({
      message: "I can only answer questions about Alfi, his work, skills, and collaborations.",
    });
  }

  const apiKey = process.env.NEXT_SUMOPOD_AI;

  if (!apiKey) {
    return NextResponse.json({ error: "Chat is not configured." }, { status: 503 });
  }

  const clientId = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const current = requestCounts.get(clientId);

  if (current && current.resetAt > now && current.count >= 10) {
    return NextResponse.json({ error: "Too many messages. Try again shortly." }, { status: 429 });
  }

  requestCounts.set(
    clientId,
    current && current.resetAt > now
      ? { ...current, count: current.count + 1 }
      : { count: 1, resetAt: now + 60_000 },
  );

  // ponytail: per-instance limiter; use a shared store if public traffic outgrows one Vercel instance.
  if (requestCounts.size > 1_000) requestCounts.clear();

  try {
    const response = await fetch("https://ai.sumopod.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.SUMOPOD_MODEL || "qwen3.7-flash-2026-07-15",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        temperature: 0.5,
        max_tokens: 120,
      }),
      signal: AbortSignal.timeout(20_000),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "The AI provider is unavailable." }, { status: 502 });
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const message = data.choices?.[0]?.message?.content?.trim().replace(/\*\*/g, "");

    if (!message) {
      return NextResponse.json({ error: "The AI returned an empty response." }, { status: 502 });
    }

    return NextResponse.json({ message });
  } catch {
    return NextResponse.json({ error: "The AI request timed out." }, { status: 504 });
  }
}
