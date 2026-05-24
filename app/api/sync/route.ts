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

    // 1. Obtener los detalles del usuario desde el directorio seguro de Clerk
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

    // 2. Buscar si existe un registro por correo electrónico
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });

    let dbUser;

    if (existingUserByEmail) {
      if (existingUserByEmail.id !== userId) {
        // Si el ID en base de datos es distinto al ID de la sesión actual de Clerk:
        // (Esto cubre tanto al placeholder del seed como a Clerk IDs antiguos de previas pruebas en dev)
        // Eliminamos el registro anterior en cascada para evitar colisiones de clave única de correo
        await prisma.user.delete({
          where: { email },
        });

        // Creamos el nuevo registro con el Clerk userId definitivo y el rol correspondiente
        dbUser = await prisma.user.create({
          data: {
            id: userId,
            email,
            role: targetRole,
          },
        });
        console.log(`[Sync] Usuario emparejado y re-creado con éxito para el correo: ${email}`);
      } else {
        // Si el ID coincide perfectamente, no hay nada que cambiar, retornamos el existente
        dbUser = existingUserByEmail;
      }
    } else {
      // 3. Si no existe ningún usuario con ese correo electrónico, crearlo desde cero
      dbUser = await prisma.user.create({
        data: {
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
