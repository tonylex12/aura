"use client";

import React, { useState, useEffect } from "react";
import Dashboard from "@/components/Dashboard";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    messagesSent: 0,
    pronunciationAccuracy: 0,
    masteredFlashcardsCount: 0,
  });

  useEffect(() => {
    // 1. Load LocalStorage Stats
    let localSent = 0;
    let localAccuracy = 0;

    const savedStats = localStorage.getItem("aura_stats");
    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats);
        localSent = parsed.messagesSent || 0;
        localAccuracy = parsed.pronunciationAccuracy || 0;
      } catch (e) {
        console.error("Error al parsear estadísticas locales:", e);
      }
    }

    // 2. Fetch real-time mastered cards from PostgreSQL via API
    const fetchMasteredCount = async () => {
      try {
        const res = await fetch("/api/vocabulary");
        if (res.ok) {
          const vocabList = await res.json();
          const masteredCount = vocabList.filter((item: any) => item.mastered).length;
          setStats({
            messagesSent: localSent,
            pronunciationAccuracy: localAccuracy,
            masteredFlashcardsCount: masteredCount,
          });
        } else {
          setStats({
            messagesSent: localSent,
            pronunciationAccuracy: localAccuracy,
            masteredFlashcardsCount: 0,
          });
        }
      } catch (err) {
        console.error("Fallo al obtener tarjetas dominadas:", err);
        setStats({
          messagesSent: localSent,
          pronunciationAccuracy: localAccuracy,
          masteredFlashcardsCount: 0,
        });
      }
    };

    fetchMasteredCount();
  }, []);

  return <Dashboard stats={stats} />;
}
