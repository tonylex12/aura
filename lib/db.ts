import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

// Cargar dinámicamente DATABASE_URL si no está definida en process.env
// (ej. si el servidor de Next.js se inició antes de crear el archivo de variables de entorno)
if (!process.env.DATABASE_URL) {
  try {
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const match = content.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
      if (match && match[1]) {
        process.env.DATABASE_URL = match[1];
      }
    } else {
      const envDefaultPath = path.resolve(process.cwd(), ".env");
      if (fs.existsSync(envDefaultPath)) {
        const content = fs.readFileSync(envDefaultPath, "utf-8");
        const match = content.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
        if (match && match[1]) {
          process.env.DATABASE_URL = match[1];
        }
      }
    }
  } catch (e) {
    console.error("Error al cargar DATABASE_URL de manera dinámica:", e);
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
