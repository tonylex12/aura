"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import SettingsDialog from "@/components/SettingsDialog";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const [settingsOpen, setSettingsOpen] = useState(false);
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
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <Sidebar
        userRole={userRole}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {/* Main Panel Viewport */}
      <main className="flex-grow ml-[80px] lg:ml-[260px] p-6 lg:p-10 lg:pr-12 max-w-[1400px] flex flex-col min-h-screen">
        {/* Common Page Header */}
        <Header userName={userName} apiConfigured={apiConfigured} />

        {/* Dynamic Subroute children */}
        <div className="flex-grow flex flex-col">
          {syncing ? (
            <div className="flex-grow flex items-center justify-center">
              <div className="flex flex-col items-center gap-4 bg-white/3 border border-white/5 p-8 rounded-2xl glass-panel">
                <span className="w-12 h-12 rounded-full border-4 border-primary-color border-t-transparent animate-spin"></span>
                <p className="text-sm font-semibold text-text-secondary">
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
