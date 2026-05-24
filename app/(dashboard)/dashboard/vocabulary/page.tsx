"use client";

import React, { useState, useEffect } from "react";
import Flashcards from "@/components/Flashcards";
import { speakText } from "@/lib/speech";

export default function VocabularyPage() {
  const [masteredFlashcards, setMasteredFlashcards] = useState<Set<string>>(new Set());

  // Load dynamic mastered cards from PostgreSQL on mount
  useEffect(() => {
    const syncDbVocab = async () => {
      try {
        const res = await fetch("/api/vocabulary");
        if (res.ok) {
          const vocabList = await res.json();
          const masteredSet = new Set<string>(
            vocabList.filter((item: any) => item.mastered).map((item: any) => item.id)
          );
          setMasteredFlashcards(masteredSet);
          localStorage.setItem("aura_mastered_cards", JSON.stringify(Array.from(masteredSet)));
        }
      } catch (err) {
        console.error("Error al sincronizar vocabulario dominado:", err);
      }
    };
    syncDbVocab();
  }, []);

  const handleCardMasteredToggle = async (cardId: string) => {
    const isMasteredCurrently = masteredFlashcards.has(cardId);
    const updated = new Set(masteredFlashcards);
    
    if (isMasteredCurrently) {
      updated.delete(cardId);
    } else {
      updated.add(cardId);
    }
    setMasteredFlashcards(updated);
    localStorage.setItem("aura_mastered_cards", JSON.stringify(Array.from(updated)));

    try {
      await fetch("/api/vocabulary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: cardId,
          mastered: !isMasteredCurrently
        })
      });
    } catch (err) {
      console.error("Fallo al actualizar la maestría del vocabulario:", err);
    }
  };

  return (
    <Flashcards
      masteredFlashcards={masteredFlashcards}
      onCardMasteredToggle={handleCardMasteredToggle}
      speakText={speakText}
    />
  );
}
