import React from "react";

interface HeaderProps {
  userName: string;
  apiConfigured: boolean | null;
}

export default function Header({ userName, apiConfigured }: HeaderProps) {
  return (
    <header className="h-20 flex justify-between items-center mb-6 pl-14 lg:pl-0">
      <div className="flex flex-col">
        <p className="text-[0.75rem] tracking-[0.15em] text-text-muted font-bold">
          LET'S IMPROVE TODAY
        </p>
        <h2 className="text-2xl lg:text-3xl font-extrabold text-text-primary font-display">
          Hello, {userName}!
        </h2>
      </div>

      <div className="flex items-center gap-3">
        {apiConfigured === null ? (
          <div className="flex items-center gap-2 bg-white/4 border border-white/6 px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-text-muted animate-pulse"></span>
            <span className="text-[0.8rem] font-semibold text-text-secondary">Comprobando API...</span>
          </div>
        ) : apiConfigured ? (
          <div 
            className="flex items-center gap-2 bg-success-color/10 border border-success-color/20 px-4 py-2 rounded-full"
            title="Conexión segura con Gemini API activada en el servidor"
          >
            <span className="w-2 h-2 rounded-full bg-success-color shadow-[0_0_10px_var(--color-success-color)]"></span>
            <span className="text-[0.8rem] font-semibold text-text-secondary">Modo Inteligente</span>
          </div>
        ) : (
          <div 
            className="flex items-center gap-2 bg-warning-color/10 border border-warning-color/20 px-4 py-2 rounded-full"
            title="Falta configurar GEMINI_API_KEY en .env.local. Usando diálogos locales."
          >
            <span className="w-2 h-2 rounded-full bg-warning-color shadow-[0_0_10px_var(--color-warning-color)]"></span>
            <span className="text-[0.8rem] font-semibold text-text-secondary">Modo Simulado</span>
          </div>
        )}
      </div>
    </header>
  );
}
