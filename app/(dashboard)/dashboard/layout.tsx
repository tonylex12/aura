"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import SettingsDialog from "@/components/SettingsDialog";
import { Toaster } from "@/components/ui/sonner";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [apiConfigured, setApiConfigured] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<"USER" | "ADMIN">("USER");
  const [syncing, setSyncing] = useState(true);

  // 1. Sync User with Postgres Database (Lazy-Sync)
  useEffect(() => {
    if (!isLoaded || !user) return;

    const syncUser = async () => {
      try {
        const response = await fetch("/api/sync");
        if (response.ok) {
          const dbUser = await response.json();
          setUserRole(dbUser.role);
        } else {
          const errData = await response.json().catch(() => ({}));
          console.error("Error al sincronizar el usuario con la base de datos:", errData.error || response.statusText);
        }
      } catch (err) {
        console.error("Fallo de red al intentar sincronizar usuario:", err);
      } finally {
        setSyncing(false);
      }
    };

    syncUser();
  }, [isLoaded, user]);

  // 2. Check Gemini API Configuration
  useEffect(() => {
    const checkApiConfig = async () => {
      try {
        const res = await fetch("/api/chat");
        if (res.ok) {
          const data = await res.json();
          setApiConfigured(data.configured);
        } else {
          setApiConfigured(false);
        }
      } catch (err) {
        console.error("Fallo al verificar la configuración de la API:", err);
        setApiConfigured(false);
      }
    };
    checkApiConfig();
  }, []);

  const userName = user?.firstName || "Learner";

  return (
    <div className="flex min-h-screen bg-[#070913]">
      {/* Floating Hamburger Toggle Button for mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-5 left-5 z-40 lg:hidden w-11 h-11 rounded-xl flex items-center justify-center bg-bg-secondary/70 border border-panel-border text-text-primary shadow-lg backdrop-blur-md cursor-pointer hover:bg-white/10 active:scale-95 transition-all duration-300"
        aria-label="Open Navigation Menu"
      >
        <i className="fa-solid fa-bars text-lg"></i>
      </button>

      {/* Mobile Drawer Sidebar Navigation using Shadcn UI Sheet */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent 
          side="left" 
          className="p-0 bg-transparent border-none w-[280px] h-full"
          showCloseButton={false}
        >
          <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
          <SheetDescription className="sr-only">
            Panel de control para navegar a través de la aplicación de aprendizaje de inglés Aura.
          </SheetDescription>
          <Sidebar
            userRole={userRole}
            onOpenSettings={() => setSettingsOpen(true)}
            onClose={() => setSidebarOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop Permanent Sidebar Navigation */}
      <div className="hidden lg:block">
        <Sidebar
          userRole={userRole}
          onOpenSettings={() => setSettingsOpen(true)}
        />
      </div>

      {/* Main Panel Viewport: set ml-0 on mobile, lg:ml-[280px] on desktop */}
      <main className="flex-grow ml-0 lg:ml-[280px] p-6 lg:p-10 lg:pr-12 max-w-full lg:max-w-[1400px] flex flex-col min-h-screen">
        {/* Common Page Header */}
        <Header userName={userName} apiConfigured={apiConfigured} />

        {/* Dynamic Subroute children */}
        <div className="flex-grow flex flex-col">
          {syncing ? (
            <div className="flex-grow flex items-center justify-center">
              <div className="flex flex-col items-center gap-4 bg-white/3 border border-white/5 p-8 rounded-2xl glass-panel">
                <span className="w-12 h-12 rounded-full border-4 border-primary-color border-t-transparent animate-spin"></span>
                <p className="text-sm font-semibold text-text-secondary font-display">
                  Sincronizando sesión segura con Aura...
                </p>
              </div>
            </div>
          ) : (
            children
          )}
        </div>
      </main>

      {/* Settings Dialog */}
      <SettingsDialog
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      {/* Premium Sonner Toast Notification */}
      <Toaster closeButton theme="dark" position="bottom-right" richColors />
    </div>
  );
}
