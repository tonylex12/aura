"use client";

import React, { useState, useEffect } from "react";
import PronunciationSandbox from "@/components/PronunciationSandbox";
import { speakText } from "@/lib/speech";

export default function PronunciationPage() {
  const [stats, setStats] = useState({
    messagesSent: 0,
    pronunciationAccuracy: 0,
    accuracyCounts: 0,
  });

  useEffect(() => {
    const savedStats = localStorage.getItem("aura_stats");
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        console.error("Error al cargar estadísticas locales:", e);
      }
    }
  }, []);

  const handleAccuracyUpdate = (accuracy: number) => {
    const counts = stats.accuracyCounts + 1;
    const avg = Math.round(
      ((stats.pronunciationAccuracy * (stats.accuracyCounts)) + accuracy) / counts
    );
    
    const newStats = {
      ...stats,
      pronunciationAccuracy: avg,
      accuracyCounts: counts
    };

    setStats(newStats);
    localStorage.setItem("aura_stats", JSON.stringify(newStats));
  };

  return (
    <PronunciationSandbox
      onAccuracyUpdate={handleAccuracyUpdate}
      speakText={speakText}
    />
  );
}
