"use client";

import React, { useState } from "react";
import { useSignIn } from "@clerk/nextjs/legacy";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthInput from "@/components/ui/AuthInput";
import { toast } from "sonner";

export default function LoginPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    
    setLoading(true);
    setError("");

    try {
      // 1. Iniciar la sesión únicamente con el correo (identificador)
      let result = await signIn.create({
        identifier: email,
      });

      // 2. Si Clerk solicita el primer factor (contraseña), enviarla de manera explícita
      if (result.status === "needs_first_factor") {
        result = await signIn.attemptFirstFactor({
          strategy: "password",
          password,
        });
      }

      // 3. Confirmar que el flujo se haya completado
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("¡Bienvenido a Aura!");
        router.push("/dashboard");
      } else {
        console.warn("Flujo de Clerk incompleto:", result);
        setError(`El flujo no se pudo completar. Estado de Clerk: ${result.status}`);
      }
    } catch (err: any) {
      console.error("Falla al iniciar sesión en Clerk:", err);
      const errorMsg = err.errors?.[0]?.message || "Credenciales inválidas. Por favor intenta de nuevo.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-1.5 select-none">
        <h2 className="text-xl font-bold text-text-primary tracking-tight">
          Iniciar Sesión
        </h2>
        <p className="text-[0.75rem] text-text-muted font-medium">
          Ingresa tus credenciales para continuar practicando
        </p>
      </div>

      {error && (
        <div className="p-3 bg-danger-color/10 border border-danger-color/20 text-danger-color text-xs rounded-xl font-medium animate-shake">
          ❌ {error}
        </div>
      )}

      {/* Email Input */}
      <AuthInput
        label="Correo Electrónico"
        type="email"
        placeholder="tu-correo@ejemplo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon="fa-envelope"
        required
      />

      {/* Password Input */}
      <AuthInput
        label="Contraseña"
        type="password"
        placeholder="••••••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon="fa-lock"
        required
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 py-3 bg-primary-color hover:bg-primary-hover text-white text-sm font-bold rounded-xl cursor-pointer shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:shadow-[0_4px_25px_rgba(99,102,241,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            <span>Ingresando...</span>
          </>
        ) : (
          <>
            <i className="fa-solid fa-right-to-bracket"></i>
            <span>Entrar a Aura</span>
          </>
        )}
      </button>

      {/* Register Link */}
      <p className="text-xs text-text-muted text-center mt-2 select-none font-medium">
        ¿No tienes una cuenta?{" "}
        <Link 
          href="/auth/register" 
          className="text-accent-cyan hover:text-accent-cyan/80 hover:underline font-bold transition-all ml-1"
        >
          Regístrate aquí
        </Link>
      </p>
    </form>
  );
}
