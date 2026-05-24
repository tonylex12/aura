"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [example, setExample] = useState("");
  const [category, setCategory] = useState("Transitivos");
  const [submitting, setSubmitting] = useState(false);

  // 1. Authorize Admin role on mount
  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await fetch("/api/sync");
        if (response.ok) {
          const dbUser = await response.json();
          if (dbUser.role === "ADMIN") {
            setAuthorized(true);
          } else {
            toast.error("Acceso denegado: Se requieren permisos de administrador.");
            router.push("/dashboard");
          }
        } else {
          toast.error("Error al autenticar rol de administrador.");
          router.push("/dashboard");
        }
      } catch (err) {
        console.error("Error verificando permisos de administrador:", err);
        router.push("/dashboard");
      }
    };
    verifyAdmin();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!word.trim() || !translation.trim() || !example.trim() || !category.trim()) {
      toast.warning("Por favor, rellene todos los campos.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/vocabulary/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word: word.trim(),
          translation: translation.trim(),
          example: example.trim(),
          category: category.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`¡Palabra '${word}' añadida exitosamente al vocabulario global!`);
        // Reset form
        setWord("");
        setTranslation("");
        setExample("");
      } else {
        toast.error(data.error || "Ocurrió un error al añadir la palabra.");
      }
    } catch (err) {
      console.error("Error al enviar palabra:", err);
      toast.error("Fallo de conexión al servidor.");
    } finally {
      setSubmitting(false);
    }
  };

  if (authorized === null) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 bg-white/3 border border-white/5 p-8 rounded-2xl glass-panel">
          <span className="w-12 h-12 rounded-full border-4 border-primary-color border-t-transparent animate-spin"></span>
          <p className="text-sm font-semibold text-text-secondary">
            Verificando permisos de administración...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full pt-4 pb-10">
      {/* Page Title */}
      <div className="mb-6">
        <h3 className="text-2xl lg:text-3xl font-extrabold text-text-primary font-display flex items-center gap-3">
          <i className="fa-solid fa-shield-halved text-primary-color"></i> Panel Administrativo
        </h3>
        <p className="text-sm text-text-secondary">
          Añade nuevas palabras al vocabulario global. El sistema evitará automáticamente registros duplicados.
        </p>
      </div>

      {/* Admin Form Card */}
      <div className="glass-panel p-6 md:p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Word field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="admin-word" className="text-xs font-bold text-text-secondary uppercase tracking-wider">
              Palabra o Frase (Inglés)
            </label>
            <input
              type="text"
              id="admin-word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="e.g. Carry out"
              disabled={submitting}
              className="bg-white/3 border border-white/6 rounded-xl p-3 px-4 text-text-primary text-sm outline-none transition-all focus:bg-white/5 focus:border-primary-color disabled:opacity-50"
            />
          </div>

          {/* Translation field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="admin-translation" className="text-xs font-bold text-text-secondary uppercase tracking-wider">
              Traducción (Español)
            </label>
            <input
              type="text"
              id="admin-translation"
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              placeholder="e.g. Llevar a cabo / Realizar"
              disabled={submitting}
              className="bg-white/3 border border-white/6 rounded-xl p-3 px-4 text-text-primary text-sm outline-none transition-all focus:bg-white/5 focus:border-primary-color disabled:opacity-50"
            />
          </div>

          {/* Example field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="admin-example" className="text-xs font-bold text-text-secondary uppercase tracking-wider">
              Ejemplo en contexto (Inglés)
            </label>
            <textarea
              id="admin-example"
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder="e.g. We need to carry out a comprehensive investigation."
              disabled={submitting}
              rows={3}
              className="bg-white/3 border border-white/6 rounded-xl p-3 px-4 text-text-primary text-sm outline-none transition-all focus:bg-white/5 focus:border-primary-color disabled:opacity-50 resize-none"
            />
          </div>

          {/* Category selection */}
          <div className="flex flex-col gap-2">
            <label htmlFor="admin-category" className="text-xs font-bold text-text-secondary uppercase tracking-wider">
              Categoría de Vocabulario
            </label>
            <select
              id="admin-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={submitting}
              className="bg-bg-secondary border border-white/6 text-text-primary p-3 px-4 rounded-xl text-sm outline-none cursor-pointer hover:bg-white/5 transition-colors"
            >
              <option value="Transitivos">Phrasal Verbs Transitivos</option>
              <option value="Intransitivos">Phrasal Verbs Intransitivos</option>
              <option value="De movimiento">Phrasal Verbs de Movimiento</option>
              <option value="De comunicación">Phrasal Verbs de Comunicación</option>
              <option value="De estado/cambio">Phrasal Verbs de Estado o Cambio</option>
            </select>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary-color hover:bg-primary-color-hover text-white font-bold rounded-xl cursor-pointer hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                <span>Añadiendo palabra...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-plus"></i>
                <span>Añadir Palabra</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
