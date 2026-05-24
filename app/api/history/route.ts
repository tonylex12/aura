import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/history?scenario=xxx
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const scenario = searchParams.get("scenario");

    if (!scenario) {
      return NextResponse.json({ error: "Falta el parámetro 'scenario'" }, { status: 400 });
    }

    const messages = await prisma.chatMessage.findMany({
      where: { scenario },
      orderBy: { createdAt: "asc" },
      take: 50, // Keep it compact to save load time and context window
    });

    return NextResponse.json(messages);
  } catch (err: any) {
    console.error("Error al obtener historial de chat:", err);
    return NextResponse.json({ error: "Error al recuperar el historial" }, { status: 500 });
  }
}

// POST /api/history
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sender, text, translation, isVoice, scenario } = body;

    if (!sender || !text || !scenario) {
      return NextResponse.json({ error: "Faltan campos obligatorios (sender, text, scenario)" }, { status: 400 });
    }

    const newMessage = await prisma.chatMessage.create({
      data: {
        sender,
        text,
        translation,
        isVoice: !!isVoice,
        scenario,
      },
    });

    return NextResponse.json(newMessage);
  } catch (err: any) {
    console.error("Error al guardar mensaje en historial:", err);
    return NextResponse.json({ error: "Error al guardar el mensaje" }, { status: 500 });
  }
}

// DELETE /api/history?scenario=xxx
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const scenario = searchParams.get("scenario");

    if (!scenario) {
      return NextResponse.json({ error: "Falta el parámetro 'scenario'" }, { status: 400 });
    }

    await prisma.chatMessage.deleteMany({
      where: { scenario },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error al borrar historial:", err);
    return NextResponse.json({ error: "Error al borrar el historial" }, { status: 500 });
  }
}
