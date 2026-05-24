import React, { useState, useEffect, useRef } from "react";

interface Phrase {
  text: string;
  translation: string;
}

interface GradedWord {
  word: string;
  isCorrect: boolean;
}

const SANDBOX_PHRASES: { [key: string]: Phrase[] } = {
  common: [
    { text: "Would you mind if I asked a question?", translation: "¿Te importaría si hiciera una pregunta?" },
    { text: "Could you tell me how to get to the nearest station?", translation: "¿Podrías decirme cómo llegar a la estación más cercana?" },
    { text: "Thank you so much for your help, I appreciate it.", translation: "Muchas gracias por tu ayuda, lo agradezco." },
    { text: "I am looking forward to speaking with you again.", translation: "Tengo muchas ganas de volver a hablar contigo." }
  ],
  business: [
    { text: "I agree with your proposal and would like to proceed.", translation: "Estoy de acuerdo con tu propuesta y me gustaría proceder." },
    { text: "Let us schedule a meeting to coordinate our goals.", translation: "Programemos una reunión para coordinar nuestros objetivos." },
    { text: "We need to analyze the data before making a decision.", translation: "Necesitamos analizar los datos antes de tomar una decisión." }
  ],
  travel: [
    { text: "I would like to order a cup of coffee and a sandwich, please.", translation: "Me gustaría ordenar una taza de café y un sándwich, por favor." },
    { text: "Is there a good local restaurant you recommend nearby?", translation: "¿Hay algún buen restaurante local que recomiende cerca?" },
    { text: "Where can I collect my luggage after the flight?", translation: "¿Dónde puedo recoger mi equipaje después del vuelo?" }
  ]
};

interface PronunciationSandboxProps {
  onAccuracyUpdate: (accuracy: number) => void;
  speakText: (text: string) => void;
}

export default function PronunciationSandbox({ onAccuracyUpdate, speakText }: PronunciationSandboxProps) {
  const [activeCategory, setActiveCategory] = useState<string>("common");
  const [activePhraseIndex, setActivePhraseIndex] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [voiceStatus, setVoiceStatus] = useState<string>("Presiona el micrófono para empezar a grabar");
  
  // Results states
  const [userTranscription, setUserTranscription] = useState<string>("");
  const [gradedWords, setGradedWords] = useState<GradedWord[]>([]);
  const [score, setScore] = useState<number | null>(null);
  
  const recognitionRef = useRef<any>(null);

  // Load Speech Recognition client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.lang = "en-US";
        rec.continuous = false;
        rec.interimResults = false;
        
        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          evaluatePronunciation(transcript);
        };
        
        rec.onerror = (event: any) => {
          console.error("Pronunciation Sandbox recognition error:", event.error);
          setVoiceStatus(`Error: ${event.error}. Intenta de nuevo.`);
          stopRecordingState();
        };
        
        rec.onend = () => {
          stopRecordingState();
        };
        
        recognitionRef.current = rec;
      }
    }
  }, [activeCategory, activePhraseIndex]);

  const activePhrases = SANDBOX_PHRASES[activeCategory];
  const currentPhrase = activePhrases[activePhraseIndex];

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    setActivePhraseIndex(0);
    clearResults();
  };

  const handleSelectPhrase = (idx: number) => {
    setActivePhraseIndex(idx);
    clearResults();
  };

  const clearResults = () => {
    setUserTranscription("");
    setGradedWords([]);
    setScore(null);
    setVoiceStatus("Presiona el micrófono para empezar a grabar");
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("El reconocimiento de voz no es compatible con tu navegador actual.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setIsRecording(true);
      setVoiceStatus("Listening... Speak now!");
      setUserTranscription("Listening...");
      setScore(null);
      setGradedWords([]);
      recognitionRef.current.start();
    }
  };

  const stopRecordingState = () => {
    setIsRecording(false);
    setVoiceStatus("Presiona el micrófono para empezar a grabar");
  };

  const evaluatePronunciation = (userTranscript: string) => {
    setUserTranscription(userTranscript);
    const targetText = currentPhrase.text;
    
    // Normalization helper
    const normalize = (txt: string) => {
      return txt.toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
        .replace(/\s+/g, " ")
        .trim();
    };
    
    const targetWords = normalize(targetText).split(" ");
    const userWords = normalize(userTranscript).split(" ");
    
    const graded: GradedWord[] = userWords.map((word) => {
      const isCorrect = targetWords.includes(word);
      return { word, isCorrect };
    });
    
    setGradedWords(graded);
    
    // Calculation: uniquely correct words matched / total target words
    const uniqueMatches = [...new Set(userWords.filter(w => targetWords.includes(w)))];
    const precisionScore = Math.round((uniqueMatches.length / targetWords.length) * 100);
    
    setScore(precisionScore);
    onAccuracyUpdate(precisionScore);
  };

  const getEvaluationDetails = (precision: number) => {
    if (precision >= 85) {
      return {
        title: "¡Excelente pronunciación!",
        desc: "¡Lo dijiste de forma casi impecable! Sigue practicando otras frases.",
        colorClass: "text-success-color",
        bgClass: "bg-success-color/5 border-success-color/15"
      };
    } else if (precision >= 50) {
      return {
        title: "¡Buen esfuerzo!",
        desc: "Te escuchamos bastante bien, pero algunas palabras pueden pulirse. ¡Inténtalo de nuevo!",
        colorClass: "text-warning-color",
        bgClass: "bg-warning-color/5 border-warning-color/15"
      };
    } else {
      return {
        title: "Sigue practicando",
        desc: "Escucha la guía de pronunciación y vuelve a modular tu voz de forma pausada.",
        colorClass: "text-danger-color",
        bgClass: "bg-danger-color/5 border-danger-color/15"
      };
    }
  };

  const evalDetails = score !== null ? getEvaluationDetails(score) : null;
  const strokeOffset = score !== null ? 283 - (283 * score) / 100 : 283;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5 h-[calc(100vh-180px)] min-h-[500px]">
      
      {/* Sidebar Phrase List Pane */}
      <div className="p-6 glass-panel flex flex-col h-full overflow-hidden">
        <h4 className="text-lg font-bold mb-4 text-text-primary">Selecciona una Frase</h4>
        
        {/* Category switcher tabs */}
        <div className="flex bg-white/3 rounded-xl p-1 mb-4">
          {["common", "business", "travel"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleSelectCategory(cat)}
              className={`flex-grow py-2 text-xs font-semibold rounded-lg cursor-pointer transition-colors duration-200 uppercase ${
                activeCategory === cat ? "bg-primary-color text-white" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {cat === "common" ? "Comunes" : cat === "business" ? "Negocios" : "Viajes"}
            </button>
          ))}
        </div>

        {/* Phrases scrollable list */}
        <div className="flex-grow overflow-y-auto flex flex-col gap-2">
          {activePhrases.map((phrase, idx) => {
            const isActive = idx === activePhraseIndex;
            return (
              <button
                key={idx}
                onClick={() => handleSelectPhrase(idx)}
                className={`w-full p-3.5 rounded-xl cursor-pointer text-left border transition-all duration-300 ${
                  isActive
                    ? "bg-primary-color-glow border-panel-border-glow shadow-[inset_0_0_0_1px_rgba(99,102,241,0.2)]"
                    : "bg-white/2 border-white/4 text-text-secondary hover:bg-white/4 hover:border-white/6"
                }`}
              >
                <span className="block font-medium text-[0.88rem] text-text-primary leading-tight">{phrase.text}</span>
                <span className="block text-[0.78rem] text-text-muted mt-1">{phrase.translation}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Pronunciation Evaluator Sandbox board */}
      <div className="p-6 lg:p-10 glass-panel flex flex-col justify-between h-full overflow-hidden gap-6">
        
        {/* Target model card */}
        <div className="bg-white/2 border border-white/4 rounded-2xl p-6 lg:p-8 relative">
          <span className="text-[0.7rem] text-accent-cyan font-bold tracking-wider uppercase">Frase Objetivo</span>
          <h3 className="text-xl lg:text-2xl font-bold mt-2.5 mb-1.5 text-text-primary leading-relaxed">
            {currentPhrase.text}
          </h3>
          <p className="text-[0.95rem] text-text-secondary mb-5">{currentPhrase.translation}</p>
          
          <div className="flex">
            <button
              onClick={() => speakText(currentPhrase.text)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/8 text-sm font-semibold rounded-xl cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all transform hover:-translate-y-0.5"
            >
              <i className="fa-solid fa-volume-high text-accent-cyan"></i> Escuchar pronunciación correcta
            </button>
          </div>
        </div>

        {/* Circular progress Accuracy Gauge */}
        {score !== null && evalDetails && (
          <div className={`flex items-center gap-6 border rounded-2xl p-5 px-6 animate-fadeIn ${evalDetails.bgClass}`}>
            <div className="score-circular-progress">
              <svg viewBox="0 0 100 100" className="score-svg">
                <circle cx="50" cy="50" r="45" className="score-bg"></circle>
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="score-fill"
                  id="score-circle-fill"
                  style={{ strokeDashoffset: strokeOffset }}
                ></circle>
              </svg>
              <div className="score-text">
                <span id="score-percentage-value" className="text-lg lg:text-xl font-bold text-text-primary">
                  {score}%
                </span>
                <span className="score-label text-[0.55rem] text-text-muted tracking-wide uppercase">Precisión</span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-1">
              <h5 className={`text-base font-bold ${evalDetails.colorClass}`}>
                {evalDetails.title}
              </h5>
              <p className="text-[0.85rem] text-text-secondary leading-relaxed">
                {evalDetails.desc}
              </p>
            </div>
          </div>
        )}

        {/* Interactive Speech Recording Box */}
        <div className="space-y-4">
          
          {/* Output alignment grading feedback text */}
          <div className="flex flex-col space-y-2">
            <span className="text-[0.75rem] font-bold text-text-muted uppercase tracking-wider">Lo que dijiste:</span>
            <div className="bg-black/15 border border-white/4 rounded-xl p-5 text-lg min-h-[80px] leading-relaxed flex flex-wrap gap-1.5 items-center">
              {gradedWords.length > 0 ? (
                gradedWords.map((item, idx) => (
                  <span
                    key={idx}
                    className={`inline-block px-1 rounded font-bold ${
                      item.isCorrect ? "text-success-color bg-success-color/8" : "text-danger-color bg-danger-color/8"
                    }`}
                  >
                    {item.word}
                  </span>
                ))
              ) : userTranscription ? (
                <em className="text-text-secondary text-base">{userTranscription}</em>
              ) : (
                <em className="text-text-muted text-base">Presiona el micrófono y lee la frase en voz alta...</em>
              )}
            </div>
          </div>

          {/* Micro Recording Action Trigger */}
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={toggleRecording}
              className={`w-[70px] h-[70px] rounded-full flex items-center justify-center text-[1.6rem] cursor-pointer transition-all duration-300 shadow-lg ${
                isRecording
                  ? "bg-danger-color text-white shadow-danger-color/40 animate-recording-pulse-red"
                  : "bg-primary-color text-white hover:bg-primary-color-hover hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-[1.05]"
              }`}
              aria-label={isRecording ? "Detener grabación" : "Grabar pronunciación"}
            >
              <i className="fa-solid fa-microphone"></i>
            </button>
            
            <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">
              {isRecording ? "Listening... Speak now" : voiceStatus}
            </span>
            
            {/* Live recording indicator sound bars */}
            {isRecording && (
              <div className="flex gap-1 h-5 items-center">
                <div className="w-1 h-2/5 bg-danger-color rounded-full animate-sandbox-bar-pulse"></div>
                <div className="w-1 h-[80%] bg-danger-color rounded-full animate-sandbox-bar-pulse [animation-delay:0.12s]"></div>
                <div className="w-1 h-full bg-danger-color rounded-full animate-sandbox-bar-pulse [animation-delay:0.24s]"></div>
                <div className="w-1 h-3/5 bg-danger-color rounded-full animate-sandbox-bar-pulse [animation-delay:0.36s]"></div>
                <div className="w-1 h-[30%] bg-danger-color rounded-full animate-sandbox-bar-pulse [animation-delay:0.48s]"></div>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
