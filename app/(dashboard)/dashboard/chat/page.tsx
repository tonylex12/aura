"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ChatSimulator from "@/components/ChatSimulator";
import { speakText } from "@/lib/speech";
import { toast } from "sonner";

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
      { keywords: ["solved", "challenge", "problem", "difficult", "fixed", "managed"], text: "Impressive problem-solving skills! Handling challenges gracefully is essential here. Now, where do you see yourself professionally in five years?", translation: "¡Impresionantes habilidades de resolución de problemas! Manejar los desafíos con elegancia es esencial aquí. Ahora, ¿dónde te ves profesionalmente en esa dirección en cinco años?", vocab: ["Problem-solving", "Gracefully", "Professionally"] },
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

function ChatSimulatorContent() {
  const searchParams = useSearchParams();
  const scenarioParam = searchParams.get("scenario");

  const [activeScenario, setActiveScenario] = useState<string>("casual");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<ChatFeedback | null>(null);
  const [apiConfigured, setApiConfigured] = useState<boolean | null>(null);

  // Sync activeScenario from search parameter
  useEffect(() => {
    if (scenarioParam && LOCAL_SCENARIOS[scenarioParam]) {
      setActiveScenario(scenarioParam);
    }
  }, [scenarioParam]);

  // Check API configuration
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
        console.error("Failed to check server API config:", err);
        setApiConfigured(false);
      }
    };
    checkApiConfig();
  }, []);

  // Fetch or initialize history from DB
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
            // Initialize Scenario with introductory message and save to PostgreSQL
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
        console.error("Error al cargar historial desde PostgreSQL:", err);
      } finally {
        setIsTyping(false);
      }
    };
    fetchHistory();
  }, [activeScenario]);

  const resetChat = async () => {
    setIsTyping(true);
    try {
      // 1. Delete history in DB
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
      console.error("Error al reiniciar chat en PostgreSQL:", err);
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

    // Simulated rules-based grammar corrections
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

      // Save Aura response to PostgreSQL
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
        console.error("Error saving fallback message to PostgreSQL:", err);
      }
    }, 1000);
  };

  const handleSendMessage = async (text: string, isVoice: boolean) => {
    const userMsg: ChatMessage = { sender: "user", text, isVoice };
    const updatedHistory = [...chatHistory, userMsg];
    setChatHistory(updatedHistory);
    setIsTyping(true);

    // Update messagesSent count in local storage analytics
    let localSent = 0;
    let localAccuracy = 0;
    const savedStats = localStorage.getItem("aura_stats");
    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats);
        localSent = parsed.messagesSent || 0;
        localAccuracy = parsed.pronunciationAccuracy || 0;
      } catch (e) {}
    }
    localStorage.setItem("aura_stats", JSON.stringify({
      messagesSent: localSent + 1,
      pronunciationAccuracy: localAccuracy,
      accuracyCounts: (savedStats ? JSON.parse(savedStats).accuracyCounts : 0) || 0
    }));

    const activeData = LOCAL_SCENARIOS[activeScenario];

    try {
      // 1. Save User message to PostgreSQL DB
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
        // 2. Call server-side API Route (Gemini)
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            history: updatedHistory.slice(-6),
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
          } catch (e) {}

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

        // 3. Save Aura response to PostgreSQL DB
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

  return (
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
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex-grow flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 bg-white/3 border border-white/5 p-8 rounded-2xl glass-panel">
          <span className="w-12 h-12 rounded-full border-4 border-primary-color border-t-transparent animate-spin"></span>
          <p className="text-sm font-semibold text-text-secondary">
            Cargando simulación de conversación...
          </p>
        </div>
      </div>
    }>
      <ChatSimulatorContent />
    </Suspense>
  );
}
