import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Helper to shuffle array in-place
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// GET /api/quizzes?action=generate|records&category=xxx
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action") || "records";
    const category = searchParams.get("category") || "all";

    if (action === "records") {
      // Fetch historical quiz attempts
      const records = await prisma.quizRecord.findMany({
        orderBy: { createdAt: "desc" },
        take: 30,
      });

      // Calculate overall best score (highest ratio)
      const best = await prisma.quizRecord.findFirst({
        orderBy: [
          { score: "desc" },
          { createdAt: "desc" }
        ],
      });

      return NextResponse.json({ records, bestRecord: best });
    }

    if (action === "generate") {
      // Action: generate dynamic quiz
      const query: any = {};
      if (category && category !== "all") {
        query.category = category;
      }

      // Fetch vocabulary to select questions from
      const allWords = await prisma.vocabulary.findMany({
        where: query,
      });

      if (allWords.length < 4) {
        return NextResponse.json({
          error: "No hay suficiente vocabulario en la base de datos para generar un cuestionario. Se necesitan al menos 4 palabras."
        }, { status: 400 });
      }

      // Select up to 10 random words for the quiz
      const shuffledWords = shuffle(allWords);
      const quizWords = shuffledWords.slice(0, Math.min(10, allWords.length));

      // Build dynamic questions
      const questions = quizWords.map((item) => {
        // Generate distractors from the rest of the vocabulary
        const otherTranslations = allWords
          .filter((w) => w.id !== item.id)
          .map((w) => w.translation);

        const uniqueDistractors = Array.from(new Set(otherTranslations));
        const chosenDistractors = shuffle(uniqueDistractors).slice(0, 3);

        // If not enough unique distractors (rare fallback), add placeholders
        while (chosenDistractors.length < 3) {
          chosenDistractors.push("Opción alternativa " + (chosenDistractors.length + 1));
        }

        const options = shuffle([item.translation, ...chosenDistractors]);

        return {
          id: item.id,
          word: item.word,
          example: item.example,
          correctAnswer: item.translation,
          options,
        };
      });

      return NextResponse.json(questions);
    }

    return NextResponse.json({ error: "Acción no admitida" }, { status: 400 });
  } catch (err: any) {
    console.error("Error en API de Quizzes:", err);
    return NextResponse.json({ error: "Error en la operación del cuestionario" }, { status: 500 });
  }
}

// POST /api/quizzes
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { score, total, category } = body;

    if (score === undefined || total === undefined) {
      return NextResponse.json({ error: "Faltan campos (score, total)" }, { status: 400 });
    }

    const newRecord = await prisma.quizRecord.create({
      data: {
        score: parseInt(score, 10),
        total: parseInt(total, 10),
        category: category || "all",
      },
    });

    return NextResponse.json(newRecord);
  } catch (err: any) {
    console.error("Error al registrar récord de quiz:", err);
    return NextResponse.json({ error: "Error al guardar el récord" }, { status: 500 });
  }
}
