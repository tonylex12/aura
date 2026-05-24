import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

// GET /api/grammar
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const lessons = await prisma.grammarLesson.findMany({
      include: {
        userProgress: {
          where: {
            userId,
          },
        },
      },
      orderBy: { order: "asc" },
    });

    // Map lessons to include a flat completed boolean for the active user
    const mappedLessons = lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      category: lesson.category,
      summary: lesson.summary,
      formula: lesson.formula,
      content: lesson.content,
      examplesJson: lesson.examplesJson,
      order: lesson.order,
      completed: lesson.userProgress.length > 0 ? lesson.userProgress[0].completed : false,
      createdAt: lesson.createdAt,
    }));

    return NextResponse.json(mappedLessons);
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
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { id, completed } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Falta el ID de la lección" },
        { status: 400 }
      );
    }

    // Upsert user progress for this lesson
    const updatedProgress = await prisma.grammarProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId: id,
        },
      },
      update: {
        completed: !!completed,
      },
      create: {
        userId,
        lessonId: id,
        completed: !!completed,
      },
    });

    return NextResponse.json({ id, completed: updatedProgress.completed });
  } catch (err: any) {
    console.error("Error al actualizar estado de lección de gramática:", err);
    return NextResponse.json(
      { error: "Error al actualizar estado de la lección" },
      { status: 500 }
    );
  }
}
