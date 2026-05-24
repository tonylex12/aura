const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Intentando consultar GrammarLesson...");
    const lessons = await prisma.grammarLesson.findMany();
    console.log(`¡Consulta exitosa! Se encontraron ${lessons.length} lecciones.`);
  } catch (err) {
    console.error("ERROR DETECTADO AL CONSULTAR:");
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
