"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (userId) {
      router.replace("/dashboard");
    } else {
      router.replace("/auth/login");
    }
  }, [userId, isLoaded, router]);

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 bg-white/3 border border-white/5 p-8 rounded-2xl glass-panel">
        <span className="w-12 h-12 rounded-full border-4 border-primary-color border-t-transparent animate-spin"></span>
        <p className="text-sm font-semibold text-text-secondary font-display">
          Cargando Aura...
        </p>
      </div>
    </div>
  );
}
