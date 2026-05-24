"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

interface SidebarProps {
  userRole: "USER" | "ADMIN";
  onOpenSettings: () => void;
}

export default function Sidebar({ userRole, onOpenSettings }: SidebarProps) {
  const pathname = usePathname();
  const { signOut } = useClerk();

  const menuItems = [
    { href: "/dashboard", label: "Inicio", icon: "fa-house-chimney" },
    { href: "/dashboard/chat", label: "Conversación", icon: "fa-comments" },
    { href: "/dashboard/pronunciation", label: "Pronunciación", icon: "fa-microphone-lines" },
    { href: "/dashboard/vocabulary", label: "Vocabulario", icon: "fa-layer-group" },
    { href: "/dashboard/grammar", label: "Gramática", icon: "fa-book-open" },
    { href: "/dashboard/quizzes", label: "Cuestionarios", icon: "fa-graduation-cap" },
  ];

  // If the user has an ADMIN role, add the admin route to the sidebar
  if (userRole === "ADMIN") {
    menuItems.push({
      href: "/dashboard/admin",
      label: "Admin",
      icon: "fa-shield-halved",
    });
  }

  return (
    <aside 
      className="w-[80px] lg:w-[260px] fixed top-4 bottom-4 left-4 flex flex-col p-4 lg:p-6 z-50 glass-panel"
      aria-label="Navegación principal"
    >
      {/* Branding Logo */}
      <div className="flex items-center gap-3 mb-8 justify-center lg:justify-start">
        <span className="w-3 h-3 bg-accent-cyan rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] animate-pulse"></span>
        <h1 className="hidden lg:block text-2xl font-extrabold font-display bg-linear-to-r from-white to-text-secondary bg-clip-text text-transparent">
          Aura
        </h1>
      </div>
      
      {/* Nav List */}
      <nav className="grow overflow-y-auto pr-1 select-none">
        <ul className="list-none flex flex-col gap-2 p-0 m-0">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-[0.95rem] font-medium transition-all duration-300 border border-transparent cursor-pointer justify-center lg:justify-start ${
                    isActive
                      ? "bg-primary-color-glow text-text-primary border-panel-border-glow shadow-[inset_0_0_0_1px_var(--color-panel-border-glow)] relative before:content-[''] before:absolute before:left-0 before:top-1/4 before:h-1/2 before:w-1 before:bg-primary-color before:rounded-r before:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                      : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <i className={`fa-solid ${item.icon} text-lg ${isActive ? "text-primary-color" : ""}`}></i>
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-white/5">
        {/* Settings button */}
        <button 
          onClick={onOpenSettings}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-[0.9rem] font-medium border border-white/5 text-text-secondary hover:bg-primary-color-glow hover:border-panel-border-glow hover:text-text-primary cursor-pointer transition-all duration-300 justify-center lg:justify-start"
        >
          <i className="fa-solid fa-sliders text-base animate-spin-slow"></i>
          <span className="hidden lg:block">Configuración</span>
        </button>

        {/* Clerk Sign Out button */}
        <button 
          onClick={() => signOut({ redirectUrl: "/auth/login" })}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-[0.9rem] font-semibold border border-red-500/10 text-red-400/80 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] cursor-pointer transition-all duration-300 justify-center lg:justify-start"
        >
          <i className="fa-solid fa-right-from-bracket text-base"></i>
          <span className="hidden lg:block">Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
