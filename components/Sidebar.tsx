import React from "react";

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onOpenSettings: () => void;
}

export default function Sidebar({ currentView, onViewChange, onOpenSettings }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Inicio", icon: "fa-house-chimney" },
    { id: "chat-simulator", label: "Conversación", icon: "fa-comments" },
    { id: "pronunciation-sandbox", label: "Pronunciación", icon: "fa-microphone-lines" },
    { id: "flashcards", label: "Vocabulario", icon: "fa-layer-group" },
    { id: "grammar", label: "Gramática", icon: "fa-book-open" },
    { id: "quizzes", label: "Cuestionarios", icon: "fa-graduation-cap" },
  ];

  return (
    <aside 
      className="w-[80px] lg:w-[260px] fixed top-4 bottom-4 left-4 flex flex-col p-4 lg:p-6 z-100 glass-panel"
      aria-label="Navegación principal"
    >
      {/* Branding Logo */}
      <div className="flex items-center gap-3 mb-10 justify-center lg:justify-start">
        <span className="w-3 height-3 h-3 bg-accent-cyan rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] animate-pulse"></span>
        <h1 className="hidden lg:block text-2xl font-extrabold font-display bg-linear-to-r from-white to-text-secondary bg-clip-text text-transparent">
          Aura
        </h1>
      </div>
      
      {/* Nav List */}
      <nav className="grow">
        <ul className="list-none flex flex-col gap-2 p-0 m-0">
          {menuItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-[0.95rem] font-medium transition-all duration-300 border border-transparent cursor-pointer justify-center lg:justify-start ${
                    isActive
                      ? "bg-primary-color-glow text-text-primary border-panel-border-glow shadow-[inset_0_0_0_1px_var(--color-panel-border-glow)] relative before:content-[''] before:absolute before:left-0 before:top-1/4 before:h-1/2 before:w-1 before:bg-primary-color before:rounded-r before:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                      : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <i className={`fa-solid ${item.icon} text-lg`}></i>
                  <span className="hidden lg:block">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="mt-auto">
        <button 
          onClick={onOpenSettings}
          className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-[0.95rem] font-medium border border-white/5 text-text-secondary hover:bg-primary-color-glow hover:border-panel-border-glow hover:text-text-primary cursor-pointer transition-all duration-300 justify-center lg:justify-start"
        >
          <i className="fa-solid fa-sliders text-lg animate-spin-slow"></i>
          <span className="hidden lg:block">Configuración</span>
        </button>
      </div>
    </aside>
  );
}
