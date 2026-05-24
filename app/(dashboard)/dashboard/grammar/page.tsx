"use client";

import React from "react";
import GrammarPanel from "@/components/GrammarPanel";
import { speakText } from "@/lib/speech";

export default function GrammarPage() {
  return <GrammarPanel speakText={speakText} />;
}
