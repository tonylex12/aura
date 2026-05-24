"use client";

import React from "react";
import Quizzes from "@/components/Quizzes";
import { speakText } from "@/lib/speech";

export default function QuizzesPage() {
  const handleUpdateStats = async () => {
    try {
      // Sync vocabulary data on the server when quiz finishes
      await fetch("/api/vocabulary");
    } catch (e) {
      console.error("Fallo al actualizar estadísticas tras cuestionario:", e);
    }
  };

  return (
    <Quizzes
      speakText={speakText}
      onUpdateStats={handleUpdateStats}
    />
  );
}
