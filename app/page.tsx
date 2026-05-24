"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import ChatSimulator from "@/components/ChatSimulator";
import PronunciationSandbox from "@/components/PronunciationSandbox";
import Flashcards from "@/components/Flashcards";
import Quizzes from "@/components/Quizzes";
import GrammarPanel from "@/components/GrammarPanel";
import SettingsDialog from "@/components/SettingsDialog";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

// Local Simulated Scenarios data for offline fallback
const LOCAL_SCENARIOS: { [key: string]: { character: string; intro: string; introTranslation: string; responses: any[]; fallback: any } } = {
  casual: {
    character: "Friendly Peer",
    intro: "Hi there! I'm Aura. I'd love to chat with you today. How is your day going so far, and what do you like to do in your free time?",
    introTranslation: "¡Hola! Soy Aura. Me encantaría charlar contigo hoy. ¿Cómo va tu día hasta ahora y qué te gusta hacer en tu tiempo libre?",
    responses: [
      { keywords: ["good", "great", "fine", "awesome", "well", "excellent"], text: "I'm so glad to hear that! Personal hobbies make everything more exciting. Personally, I love reading books. What kind of hobbies do you enjoy?", translation: "¡Me alegra mucho oír eso! Los pasatiempos personales hacen que todo sea más emocionante. Personalmente, me encanta leer libros. ¿Qué tipo de pasatiempos disfrutas?", vocab: ["Glad", "Hobbies", "Personally"] },
      { keywords: ["bad", "tired", "sad", "busy", "exhausted", "not well"], text: "Oh, I'm really sorry to hear that. Some days can be quite challenging. Remember to take a break and rest. What usually helps you relax?", translation: "Oh, lamento mucho oír eso. Algunos días pueden ser bastante desafiantes. Recuerda tomarte un descanso y reposar. ¿Qué te ayuda normalmente a relajarte?", vocab: ["Challenging", "Take a break", "Relax"] },
      { keywords: ["music", "sing", "listen", "song", "band", "genre"], text: "Music is wonderful! It connects people so beautifully. I enjoy everything from soft jazz to energetic pop. Who is your absolute favorite artist?", translation: "¡La música es maravillosa! Conecta a la gente de una forma hermosa. Disfruto de todo, desde jazz suave hasta pop enérgico. ¿Quién es tu artista favorito absoluto?", vocab: ["Absolute", "Energetic", "Connects"] },
      { keywords: ["book", "read", "novel", "writer", "author", "story"], text: "Reading is like traveling without moving! What was the last book you read, and would you recommend it to me?", translation: "¡Leer es como viajar sin moverse! ¿Cuál fue el último libro que leíste y me lo recomendarías?", vocab: ["Immersive", "Recommend", "Without moving"] }
    ],
    fallback: { text: "That is very interesting! Tell me more about that, or let me know if you would like to discuss another topic like your plans for the weekend.", translation: "¡Eso es muy interesante! Cuéntame más sobre eso, o dime si te gustaría discutir otro tema como tus planes para el fin de semana.", vocab: ["Discuss", "Weekend", "Tell me more"] }
  },
  restaurant: {
    character: "Polite Waiter (Henry)",
    intro: "Good evening! Welcome to Aura's Bistro. I am Henry, your waiter today. Would you like to start with some drinks, or are you ready to order your main course?",
    introTranslation: "¡Buenas noches! Bienvenido al Bistro de Aura. Soy Henry, su mesero hoy. ¿Le gustaría empezar con algunas bebidas o está listo para ordenar su plato fuerte?",
    responses: [
      { keywords: ["drink", "water", "soda", "wine", "beer", "juice", "beverage"], text: "Excellent choice. I will bring that right away. For our main courses tonight, our chef highly recommends the grilled salmon or our special truffle pasta. Which one sounds appealing?", translation: "Excelente elección. Traeré eso enseguida. Para nuestros platos principales esta noche, nuestro chef recomienda encarecidamente el salmón a la parrilla o nuestra pasta de trufa especial. ¿Cuál le parece atractivo?", vocab: ["Right away", "Highly recommends", "Appealing"] },
      { keywords: ["salmon", "fish", "seafood"], text: "The grilled salmon is incredibly fresh, served with organic asparagus and a lemon butter sauce. How would you like that cooked?", translation: "El salmón a la parrilla es increíblemente fresco, servido con espárragos orgánicos y una salsa de mantequilla de limón. ¿Cómo le gustaría que esté cocido?", vocab: ["Organic", "Lemon butter sauce", "Fresh"] },
      { keywords: ["pasta", "spaghetti", "truffle", "vegetarian"], text: "The truffle pasta is a customer favorite! It is creamy, rich, and topped with aged parmesan cheese. Would you like to add some grilled chicken or mushrooms?", translation: "¡La pasta de trufa es una de las favoritas de los clientes! Es cremosa, rica y coronada con queso parmesano madurado. ¿Le gustaría añadir pollo a la parrilla o champiñones?", vocab: ["Creamy", "Topped with", "Aged"] },
      { keywords: ["check", "bill", "pay", "card", "cash"], text: "Of course! I will prepare the bill for you. We accept both cash and credit cards. Did you enjoy your dinner tonight, and would you like dessert?", translation: "¡Por supuesto! Prepararé la cuenta para usted. Aceptamos tanto efectivo como tarjetas de crédito. ¿Disfrutó de su cena esta noche y le gustaría postre?", vocab: ["Bill", "Credit cards", "Dessert"] }
    ],
    fallback: { text: "Certainly! I can arrange that for you. Is there anything else I can assist you with regarding our menu?", translation: "¡Ciertamente! Puedo organizar eso para usted. ¿Hay algo más en lo que pueda ayudarle con respecto a nuestro menú?", vocab: ["Certainly", "Arrange", "Regarding"] }
  },
  interview: {
    character: "Hiring Manager (Sarah)",
    intro: "Hello. Thank you for coming today. I'm Sarah, the hiring manager here. Let's start the interview. Can you please introduce yourself and tell me why you are interested in this position?",
    introTranslation: "Hola. Gracias por venir hoy. Soy Sarah, la gerente de contratación aquí. Empecemos la entrevista. ¿Podrías presentarte y decirme por qué estás interesado en este puesto?",
    responses: [
      { keywords: ["experience", "work", "job", "career", "engineer", "developer", "designer"], text: "That sounds like a solid background! In this role, we value teamwork and continuous learning. Could you describe a difficult challenge you faced in a past project?", translation: "¡Eso suena como una trayectoria sólida! En este rol, valoramos el trabajo en equipo y el aprendizaje continuo. ¿Podrías describir un desafío difícil que hayas enfrentado en un proyecto anterior?", vocab: ["Solid background", "Teamwork", "Continuous learning"] },
      { keywords: ["solved", "challenge", "problem", "difficult", "fixed", "managed"], text: "Impressive problem-solving skills! Handling challenges gracefully is essential here. Now, where do you see yourself professionally in five years?", translation: "¡Impresionantes habilidades de resolución de problemas! Manejar los desafíos con elegancia es esencial aquí. Ahora, ¿dónde te ves profesionalmente en cinco años?", vocab: ["Problem-solving", "Gracefully", "Professionally"] },
      { keywords: ["years", "future", "grow", "lead", "manager", "learn"], text: "Ambition is wonderful! We love supporting our team's growth. Why do you believe we should hire you over other candidates?", translation: "¡La ambición es maravillosa! Nos encanta apoyar el crecimiento de nuestro equipo. ¿Por qué crees que deberíamos contratarte a ti sobre otros candidatos?", vocab: ["Growth", "Hire", "Ambition"] }
    ],
    fallback: { text: "Understood. That is very relevant to our goals here. Could you elaborate a bit more on your experience working with teams?", translation: "Entendido. Eso es muy relevante para nuestros objetivos aquí. ¿Podrías detallar un poco más tu experiencia trabajando con equipos?", vocab: ["Elaborate", "Relevant", "Elaborate"] }
  }
};

interface ChatMessage {
  sender: "aura" | "user";
  text: string;
  translation?: string;
  isVoice?: boolean;
}

interface Correction {
  incorrect: string;
  correct: string;
  explain: string;
}

interface ChatFeedback {
  corrections: Correction[];
  suggestedVocab: string[];
}

export default function Page() {
  // Navigation states
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  // Profile and configuration states
  const [userName, setUserName] = useState<string>("Learner");
  const [apiConfigured, setApiConfigured] = useState<boolean | null>(null);
  
  // Voice states
  const [ttsVoice, setTtsVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [ttsRate, setTtsRate] = useState<number>(0.9);

  // Stats states
  const [stats, setStats] = useState({
    messagesSent: 0,
    pronunciationAccuracy: 0,
    accuracyCounts: 0,
  });

  const [masteredFlashcards, setMasteredFlashcards] = useState<Set<string>>(new Set());

  // Chat Simulator states
  const [activeScenario, setActiveScenario] = useState<string>("casual");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<ChatFeedback | null>(null);

  // Check API configuration and load local state from LocalStorage on mount safely
  useEffect(() => {
    // 1. Fetch API configuration status
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
        console.error("Failed to check server API config:", err);
        setApiConfigured(false);
      }
    };
    checkApiConfig();

    // 2. Load dynamic mastered cards from SQLite
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

    // 3. Load LocalStorage States
    const savedName = localStorage.getItem("aura_user_name");
    if (savedName) setUserName(savedName);

    const savedStats = localStorage.getItem("aura_stats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Sync conversation history from SQLite when scenario changes
  useEffect(() => {
    const fetchHistory = async () => {
      setIsTyping(true);
      try {
        const res = await fetch(`/api/history?scenario=${activeScenario}`);
        if (res.ok) {
          const history = await res.json();
          if (history.length > 0) {
            setChatHistory(history.map((m: any) => ({
              sender: m.sender,
              text: m.text,
              translation: m.translation,
              isVoice: m.isVoice
            })));
            setFeedback(null);
          } else {
            // If no history exists, load the default introduction and save it in SQLite!
            const activeData = LOCAL_SCENARIOS[activeScenario];
            const initialMsg = {
              sender: "aura",
              text: activeData.intro,
              translation: activeData.introTranslation,
              scenario: activeScenario,
              isVoice: false
            };
            setChatHistory([initialMsg as any]);
            setFeedback(null);
            
            await fetch("/api/history", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(initialMsg)
            });
            speakText(activeData.intro);
          }
        }
      } catch (err) {
        console.error("Error al cargar historial desde SQLite:", err);
      } finally {
        setIsTyping(false);
      }
    };
    fetchHistory();
  }, [activeScenario]);

  // Voice synthesis selection auto-resolver on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v => v.name.includes("Google US English") || v.lang === "en-US") 
                     || voices.find(v => v.lang.startsWith("en")) 
                     || voices[0];
      if (preferred) setTtsVoice(preferred);
    }
  }, []);

  const saveStatsToStorage = (newStats: typeof stats) => {
    setStats(newStats);
    localStorage.setItem("aura_stats", JSON.stringify(newStats));
  };

  const speakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (ttsVoice) {
      utterance.voice = ttsVoice;
    }
    utterance.rate = ttsRate;
    window.speechSynthesis.speak(utterance);
  };

  const resetChat = async () => {
    setIsTyping(true);
    try {
      // 1. Delete history in SQLite
      await fetch(`/api/history?scenario=${activeScenario}`, {
        method: "DELETE"
      });

      // 2. Insert fresh introduction
      const activeData = LOCAL_SCENARIOS[activeScenario];
      const initialMsg = {
        sender: "aura",
        text: activeData.intro,
        translation: activeData.introTranslation,
        scenario: activeScenario,
        isVoice: false
      };
      
      setChatHistory([initialMsg as any]);
      setFeedback(null);

      await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(initialMsg)
      });
      speakText(activeData.intro);
    } catch (err) {
      console.error("Error al reiniciar chat en SQLite:", err);
    } finally {
      setIsTyping(false);
    }
  };



  const runOfflineFallback = (text: string) => {
    const activeData = LOCAL_SCENARIOS[activeScenario];
    const textLower = text.toLowerCase();
    let matched = null;
    for (const res of activeData.responses) {
      if (res.keywords.some((k: string) => textLower.includes(k))) {
        matched = res;
        break;
      }
    }

    const chosen = matched || activeData.fallback;

    // Simulated rules-based translations corrections
    const simulatedCorrections: Correction[] = [];
    if (/\b(i have \d+ years)\b/i.test(textLower)) {
      simulatedCorrections.push({
        incorrect: "I have X years",
        correct: "I am X years old",
        explain: "En inglés se utiliza el verbo 'to be' para expresar la edad, no el verbo 'to have'."
      });
    }
    if (/\b(people is)\b/i.test(textLower)) {
      simulatedCorrections.push({
        incorrect: "People is",
        correct: "People are",
        explain: "'People' es un sustantivo plural en inglés, por lo tanto requiere el verbo 'are'."
      });
    }
    if (/\b(i am agree)\b/i.test(textLower)) {
      simulatedCorrections.push({
        incorrect: "I am agree",
        correct: "I agree",
        explain: "'Agree' ya funciona como verbo. Decir 'I am agree' es redundante; simplemente di 'I agree'."
      });
    }

    setTimeout(async () => {
      const auraMsg = {
        sender: "aura" as const,
        text: chosen.text,
        translation: chosen.translation
      };

      setChatHistory(prev => [...prev, auraMsg]);
      speakText(chosen.text);
      
      setFeedback({
        corrections: simulatedCorrections,
        suggestedVocab: chosen.vocab || ["English", "Practice", "Fluency"]
      });
      setIsTyping(false);

      // Save Aura simulated response to SQLite database!
      try {
        await fetch("/api/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sender: "aura",
            text: chosen.text,
            translation: chosen.translation,
            scenario: activeScenario
          })
        });
      } catch (err) {
        console.error("Error saving fallback message to SQLite:", err);
      }
    }, 1000);
  };

  // SEND MESSAGE CONTROLLER
  const handleSendMessage = async (text: string, isVoice: boolean) => {
    const userMsg: ChatMessage = { sender: "user", text, isVoice };
    const updatedHistory = [...chatHistory, userMsg];
    setChatHistory(updatedHistory);
    setIsTyping(true);

    // Update global user stats
    const newStats = { ...stats, messagesSent: stats.messagesSent + 1 };
    saveStatsToStorage(newStats);

    const activeData = LOCAL_SCENARIOS[activeScenario];

    try {
      // Save User message to SQLite database!
      await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: "user",
          text,
          isVoice,
          scenario: activeScenario
        })
      });

      if (apiConfigured) {
        // CALL SECURE NEXT.JS SERVER-SIDE API
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            history: updatedHistory.slice(-6), // Keep history compact
            scenario: activeScenario,
            character: activeData.character
          })
        });

        if (!response.ok) {
          let errorMessage = "El Tutor de IA no respondió.";
          try {
            const errData = await response.json();
            if (errData && errData.error) {
              errorMessage = errData.error;
            }
          } catch (e) {
            // JSON parsing failed
          }

          let friendlyMsg = "El Tutor de IA no respondió. Cambiando a Modo Simulado local.";
          const errLower = errorMessage.toLowerCase();

          if (errLower.includes("quota") || errLower.includes("limit") || errLower.includes("exhausted") || errLower.includes("429")) {
            friendlyMsg = "Límite de cuota de la API de Gemini excedido (429: Resource Exhausted). Cambiando a Modo Simulado local.";
          } else if (errLower.includes("key") || errLower.includes("api key") || errLower.includes("api_key") || errLower.includes("invalid")) {
            friendlyMsg = "Error de clave API de Gemini (inválida o ausente). Cambiando a Modo Simulado local.";
          } else if (errorMessage) {
            friendlyMsg = `Error de API: ${errorMessage}. Cambiando a Modo Simulado local.`;
          }

          toast.error(friendlyMsg, { duration: 6000 });
          runOfflineFallback(text);
          return;
        }

        const data = await response.json();
        
        const auraMsg = {
          sender: "aura" as const,
          text: data.response,
          translation: data.translation
        };

        setChatHistory(prev => [...prev, auraMsg]);
        speakText(data.response);
        
        setFeedback({
          corrections: data.corrections || [],
          suggestedVocab: data.suggested_vocab || []
        });
        setIsTyping(false);

        // Save Aura response to SQLite database!
        await fetch("/api/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sender: "aura",
            text: data.response,
            translation: data.translation,
            scenario: activeScenario
          })
        });

      } else {
        runOfflineFallback(text);
      }
    } catch (err) {
      console.warn("Fallo de conexión con la API de IA:", err);
      toast.error("Error de conexión con el Tutor de IA. Cambiando a Modo Simulado local.");
      runOfflineFallback(text);
    }
  };

  // PRONUNCIATION SANDBOX ACCURACY UPDATE
  const handleAccuracyUpdate = (accuracy: number) => {
    const counts = stats.accuracyCounts + 1;
    const avg = Math.round(
      ((stats.pronunciationAccuracy * (counts - 1)) + accuracy) / counts
    );
    const newStats = {
      ...stats,
      pronunciationAccuracy: avg,
      accuracyCounts: counts
    };
    saveStatsToStorage(newStats);
  };

  // FLASHCARDS DOMINANCE SYNC LOGIC
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
      console.error("Failed to sync card mastered status with DB:", err);
    }
  };

  // SETTINGS SAVE CONTROLLER
  const handleSaveSettings = (name: string, voiceName: string, rate: number) => {
    setUserName(name);
    setTtsRate(rate);
    localStorage.setItem("aura_user_name", name);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const selected = window.speechSynthesis.getVoices().find(v => v.name === voiceName);
      if (selected) setTtsVoice(selected);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {/* Main Panel Viewport */}
      <main className="flex-grow ml-[80px] lg:ml-[260px] p-6 lg:p-10 lg:pr-12 max-w-[1400px]">
        {/* Common Page Header */}
        <Header userName={userName} apiConfigured={apiConfigured} />

        {/* Dynamic Inner View Switch */}
        {currentView === "dashboard" && (
          <Dashboard
            stats={{
              messagesSent: stats.messagesSent,
              pronunciationAccuracy: stats.pronunciationAccuracy,
              masteredFlashcardsCount: masteredFlashcards.size
            }}
            onStartScenario={(scen) => {
              setActiveScenario(scen);
              setCurrentView("chat-simulator");
            }}
            onSwitchView={setCurrentView}
          />
        )}

        {currentView === "chat-simulator" && (
          <ChatSimulator
            activeScenario={activeScenario}
            onChangeScenario={setActiveScenario}
            chatHistory={chatHistory}
            onSendMessage={handleSendMessage}
            apiConfigured={apiConfigured}
            isTyping={isTyping}
            feedback={feedback}
            speakText={speakText}
            onResetChat={resetChat}
          />
        )}

        {currentView === "pronunciation-sandbox" && (
          <PronunciationSandbox
            onAccuracyUpdate={handleAccuracyUpdate}
            speakText={speakText}
          />
        )}

        {currentView === "flashcards" && (
          <Flashcards
            masteredFlashcards={masteredFlashcards}
            onCardMasteredToggle={handleCardMasteredToggle}
            speakText={speakText}
          />
        )}

        {currentView === "quizzes" && (
          <Quizzes
            speakText={speakText}
            onUpdateStats={async () => {
              try {
                const res = await fetch("/api/vocabulary");
                if (res.ok) {
                  const vocabList = await res.json();
                  const masteredSet = new Set<string>(
                    vocabList.filter((item: any) => item.mastered).map((item: any) => item.id)
                  );
                  setMasteredFlashcards(masteredSet);
                }
              } catch (e) {
                console.error(e);
              }
            }}
          />
        )}

        {currentView === "grammar" && (
          <GrammarPanel speakText={speakText} />
        )}
      </main>

      {/* Settings Native Modal Dialog */}
      <SettingsDialog
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        userName={userName}
        onSave={handleSaveSettings}
        ttsRate={ttsRate}
        ttsVoice={ttsVoice}
      />

      {/* Premium Sonner Toast Notification */}
      <Toaster closeButton theme="dark" position="bottom-right" richColors />
    </div>
  );
}
