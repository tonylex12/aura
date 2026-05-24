import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/vocabulary?category=xxx
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const query: any = {};
    if (category && category !== "all") {
      query.category = category;
    }

    const vocabulary = await prisma.vocabulary.findMany({
      where: query,
      orderBy: { word: "asc" },
    });

    return NextResponse.json(vocabulary);
  } catch (err: any) {
    console.error("Error al obtener vocabulario:", err);
    return NextResponse.json({ error: "Error al obtener vocabulario" }, { status: 500 });
  }
}

// POST /api/vocabulary
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, mastered } = body;

    if (!id) {
      return NextResponse.json({ error: "Falta el ID del vocabulario" }, { status: 400 });
    }

    const updatedWord = await prisma.vocabulary.update({
      where: { id },
      data: {
        mastered: !!mastered,
      },
    });

    return NextResponse.json(updatedWord);
  } catch (err: any) {
    console.error("Error al actualizar estado de vocabulario:", err);
    return NextResponse.json({ error: "Error al actualizar estado" }, { status: 500 });
  }
}
