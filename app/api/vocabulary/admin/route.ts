import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

// POST /api/vocabulary/admin
export async function POST(request: Request) {
  try {
    // 1. Authenticate user session
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // 2. Fetch user details and verify ADMIN privileges
    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!dbUser || dbUser.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Acceso denegado: Se requieren permisos de administrador" },
        { status: 403 }
      );
    }

    // 3. Parse request variables
    const body = await request.json();
    const { word, translation, example, category } = body;

    if (!word || !translation || !example || !category) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios (word, translation, example, category)" },
        { status: 400 }
      );
    }

    // 4. Validate unique word constraint
    const normalizedWord = word.trim();
    const existingWord = await prisma.vocabulary.findFirst({
      where: {
        word: {
          equals: normalizedWord,
          mode: "insensitive", // Case-insensitive check
        },
      },
    });

    if (existingWord) {
      return NextResponse.json(
        { error: `La palabra '${normalizedWord}' ya existe en el vocabulario global.` },
        { status: 400 }
      );
    }

    // 5. Create new global Vocabulary record
    const newVocab = await prisma.vocabulary.create({
      data: {
        word: normalizedWord,
        translation: translation.trim(),
        example: example.trim(),
        category: category.trim(),
      },
    });

    return NextResponse.json(newVocab);
  } catch (err: any) {
    console.error("Error en API de administración de vocabulario:", err);
    return NextResponse.json(
      { error: "Error en el servidor al intentar agregar la palabra" },
      { status: 500 }
    );
  }
}
