// Shared Speech Synthesis TTS Utility for Aura
export const speakText = (text: string) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  // Cancel any active speech first to prevent queues overlay
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  try {
    // Dynamically retrieve preferences from localStorage
    const savedVoice = localStorage.getItem("aura_tts_voice");
    const savedRate = localStorage.getItem("aura_tts_rate");

    if (savedVoice) {
      const voice = window.speechSynthesis.getVoices().find((v) => v.name === savedVoice);
      if (voice) {
        utterance.voice = voice;
      }
    }
    
    if (savedRate) {
      utterance.rate = parseFloat(savedRate);
    } else {
      utterance.rate = 0.9; // Default rate
    }
  } catch (e) {
    console.error("Falla al aplicar preferencias de TTS:", e);
    utterance.rate = 0.9;
  }

  window.speechSynthesis.speak(utterance);
};
