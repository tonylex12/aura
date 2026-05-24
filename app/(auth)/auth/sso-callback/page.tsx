"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
      <span className="w-10 h-10 rounded-full border-4 border-primary-color border-t-transparent animate-spin"></span>
      <p className="text-sm font-semibold text-text-secondary animate-pulse">
        Estableciendo conexión segura con Clerk...
      </p>
      {/* Componente que procesa la autenticación e inicia sesión */}
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
