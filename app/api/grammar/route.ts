import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/grammar
export async function GET() {
  try {
    const lessons = await prisma.grammarLesson.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(lessons);
  } catch (err: any) {
    console.error("Error al obtener lecciones de gramática:", err);
    return NextResponse.json(
      { error: "Error al obtener lecciones de gramática" },
      { status: 500 }
    );
  }
}

// POST /api/grammar
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, completed } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Falta el ID de la lección" },
        { status: 400 }
      );
    }

    const updatedLesson = await prisma.grammarLesson.update({
      where: { id },
      data: {
        completed: !!completed,
      },
    });

    return NextResponse.json(updatedLesson);
  } catch (err: any) {
    console.error("Error al actualizar estado de lección de gramática:", err);
    return NextResponse.json(
      { error: "Error al actualizar estado de la lección" },
      { status: 500 }
    );
  }
}
