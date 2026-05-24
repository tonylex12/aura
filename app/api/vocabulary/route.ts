import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

// GET /api/vocabulary?category=xxx
export async function GET(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const query: any = {};
    if (category && category !== "all") {
      query.category = category;
    }

    // Include the user's specific mastery status for each vocabulary item
    const vocabulary = await prisma.vocabulary.findMany({
      where: query,
      include: {
        userMastery: {
          where: {
            userId,
          },
        },
      },
      orderBy: { word: "asc" },
    });

    // Map to a structure that is 100% compatible with the client-side component (which expects a flat 'mastered' boolean)
    const mappedVocab = vocabulary.map((item) => ({
      id: item.id,
      word: item.word,
      translation: item.translation,
      example: item.example,
      category: item.category,
      mastered: item.userMastery.length > 0 ? item.userMastery[0].mastered : false,
      createdAt: item.createdAt,
    }));

    return NextResponse.json(mappedVocab);
  } catch (err: any) {
    console.error("Error al obtener vocabulario:", err);
    return NextResponse.json({ error: "Error al obtener vocabulario" }, { status: 500 });
  }
}

// POST /api/vocabulary
export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { id, mastered } = body;

    if (!id) {
      return NextResponse.json({ error: "Falta el ID del vocabulario" }, { status: 400 });
    }

    // Upsert the vocabulary mastery record for this specific user
    const updatedMastery = await prisma.vocabularyMastery.upsert({
      where: {
        userId_vocabularyId: {
          userId,
          vocabularyId: id,
        },
      },
      update: {
        mastered: !!mastered,
      },
      create: {
        userId,
        vocabularyId: id,
        mastered: !!mastered,
      },
    });

    return NextResponse.json({ id, mastered: updatedMastery.mastered });
  } catch (err: any) {
    console.error("Error al actualizar estado de vocabulario:", err);
    return NextResponse.json({ error: "Error al actualizar estado" }, { status: 500 });
  }
}
