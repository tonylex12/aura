import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

// GET /api/sync
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // 1. Obtener los detalles del usuario desde el directorio seguro de Clerk en el servidor
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);
    const email = clerkUser.emailAddresses[0]?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { error: "El usuario no tiene una dirección de correo válida" },
        { status: 400 }
      );
    }

    // El correo tonylex12@gmail.com siempre será ADMIN
    const targetRole = email === "tonylex12@gmail.com" ? "ADMIN" : "USER";

    // 2. Verificar si existe un registro pre-sembrado (placeholder) con ese correo
    const existingPlaceholder = await prisma.user.findUnique({
      where: { email },
    });

    let dbUser;
    if (existingPlaceholder && existingPlaceholder.id === "admin-clerk-placeholder-id") {
      // Sincronizar el ID temporal de semilla por el Clerk userId definitivo
      dbUser = await prisma.user.update({
        where: { email },
        data: { 
          id: userId,
          role: "ADMIN" // Asegurar privilegios
        },
      });
      console.log(`[Lazy-Sync] Admin pre-sembrado emparejado exitosamente para: ${email}`);
    } else {
      // Upsert estándar: Crea el perfil de base de datos si no existe, o actualiza si cambió
      dbUser = await prisma.user.upsert({
        where: { id: userId },
        update: { email },
        create: {
          id: userId,
          email,
          role: targetRole,
        },
      });
    }

    return NextResponse.json(dbUser);
  } catch (err: any) {
    console.error("Error en endpoint de sincronización de usuario:", err);
    return NextResponse.json(
      { error: "Error en el servidor al sincronizar usuario" },
      { status: 500 }
    );
  }
}
