"use client";

import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs/legacy";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthInput from "@/components/ui/AuthInput";
import { toast } from "sonner";

export default function RegisterPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  // Registration form states
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Verification OTP states
  const [pendingVerification, setPendingVerification] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  // Step 1: Submit details to Clerk and send verification email code
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName,
      });

      // Prepare email verification strategy
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      toast.success("Código de verificación enviado a tu correo.");
    } catch (err: any) {
      console.error("Error al registrarse en Clerk:", err);
      const errorMsg = err.errors?.[0]?.message || "No se pudo crear la cuenta. Intenta con otra dirección.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify the OTP code and active session
  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        toast.success("¡Registro exitoso! Bienvenido a Aura.");
        router.push("/dashboard");
      } else {
        console.warn("Clerk completeSignUp status:", completeSignUp);
        setError("Falta completar algún requerimiento en tu cuenta.");
      }
    } catch (err: any) {
      console.error("Falla en verificación OTP de Clerk:", err);
      const errorMsg = err.errors?.[0]?.message || "Código incorrecto. Verifica e intenta de nuevo.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Render Step 2: Verification Code input form
  if (pendingVerification) {
    return (
      <form onSubmit={handleVerifySubmit} className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-1.5 select-none">
          <h2 className="text-xl font-bold text-text-primary tracking-tight">
            Verifica tu Correo
          </h2>
          <p className="text-[0.75rem] text-text-muted font-medium">
            Ingresa el código OTP de 6 dígitos enviado a <strong className="text-text-secondary">{email}</strong>
          </p>
        </div>

        {error && (
          <div className="p-3 bg-danger-color/10 border border-danger-color/20 text-danger-color text-xs rounded-xl font-medium animate-shake">
            ❌ {error}
          </div>
        )}

        {/* Verification Code Input */}
        <AuthInput
          label="Código de Verificación"
          type="text"
          placeholder="123456"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          icon="fa-key"
          required
        />

        {/* Submit Verification Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3 bg-accent-cyan hover:bg-accent-cyan/80 text-black text-sm font-bold rounded-xl cursor-pointer shadow-[0_4px_15px_rgba(6,182,212,0.3)] hover:shadow-[0_4px_25px_rgba(6,182,212,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
              <span>Verificando...</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-circle-check"></i>
              <span>Confirmar Registro</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setPendingVerification(false)}
          className="text-xs text-text-muted hover:text-text-primary text-center font-bold transition-all underline cursor-pointer"
        >
          Regresar a editar datos
        </button>
      </form>
    );
  }

  // Render Step 1: General registration form
  return (
    <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-1.5 select-none">
        <h2 className="text-xl font-bold text-text-primary tracking-tight">
          Crear Cuenta
        </h2>
        <p className="text-[0.75rem] text-text-muted font-medium">
          Regístrate gratis y comienza a mejorar tu inglés hoy
        </p>
      </div>

      {error && (
        <div className="p-3 bg-danger-color/10 border border-danger-color/20 text-danger-color text-xs rounded-xl font-medium animate-shake">
          ❌ {error}
        </div>
      )}

      {/* First Name Input */}
      <AuthInput
        label="Nombre de pila"
        type="text"
        placeholder="Juan"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        icon="fa-user"
        required
      />

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
        placeholder="Mínimo 8 caracteres"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon="fa-lock"
        required
      />

      {/* Placeholder for Clerk Bot Protection CAPTCHA widget */}
      <div id="clerk-captcha" data-cl-theme="dark" />

      {/* Submit Details Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 py-3 bg-primary-color hover:bg-primary-hover text-white text-sm font-bold rounded-xl cursor-pointer shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:shadow-[0_4px_25px_rgba(99,102,241,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            <span>Creando cuenta...</span>
          </>
        ) : (
          <>
            <i className="fa-solid fa-user-plus"></i>
            <span>Comenzar Registro</span>
          </>
        )}
      </button>

      {/* Login Link */}
      <p className="text-xs text-text-muted text-center mt-2 select-none font-medium">
        ¿Ya tienes una cuenta?{" "}
        <Link 
          href="/auth/login" 
          className="text-accent-cyan hover:text-accent-cyan/80 hover:underline font-bold transition-all ml-1"
        >
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}
