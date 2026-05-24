import React, { useState, useEffect, useRef } from "react";

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

interface ChatSimulatorProps {
  activeScenario: string;
  onChangeScenario: (scenario: string) => void;
  chatHistory: ChatMessage[];
  onSendMessage: (message: string, isVoice: boolean) => Promise<void>;
  apiConfigured: boolean | null;
  isTyping: boolean;
  feedback: ChatFeedback | null;
  speakText: (text: string) => void;
  onResetChat: () => void;
}

export default function ChatSimulator({
  activeScenario,
  onChangeScenario,
  chatHistory,
  onSendMessage,
  apiConfigured,
  isTyping,
  feedback,
  speakText,
  onResetChat,
}: ChatSimulatorProps) {
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  const [visibleTranslations, setVisibleTranslations] = useState<{ [key: number]: boolean }>({});
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isTyping]);

  // Init Speech Recognition on Client Mount
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
          setInputValue(transcript);
          setVoiceStatus(`Transcripción: "${transcript}"`);
        };
        
        rec.onerror = (event: any) => {
          console.error("Speech Recognition error:", event.error);
          setVoiceStatus(`Error: ${event.error}. Intenta de nuevo.`);
          stopRecordingState();
        };
        
        rec.onend = () => {
          stopRecordingState();
        };
        
        recognitionRef.current = rec;
      }
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("El reconocimiento de voz no es compatible con tu navegador actual.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setIsRecording(true);
      setVoiceStatus("Listening... Speak in English now");
      recognitionRef.current.start();
    }
  };

  const stopRecordingState = () => {
    setIsRecording(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    
    // Clear input state immediately to prevent duplicate submissions from fast clicks
    setInputValue("");
    setVoiceStatus("");
    
    onSendMessage(trimmed, isRecording);
  };

  const toggleTranslation = (idx: number) => {
    setVisibleTranslations(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleSuggestedVocabClick = (vocab: string) => {
    setInputValue(prev => (prev ? `${prev} ${vocab}` : vocab));
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5 h-auto xl:h-[calc(100vh-180px)] min-h-[500px]">
      
      {/* Main Chat Simulator Section */}
      <div className="flex flex-col h-[500px] sm:h-[600px] xl:h-full overflow-hidden relative glass-panel">
        
        {/* Scenario selection header bar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/6">
          <div className="flex items-center gap-3">
            <span className="text-[0.85rem] text-text-muted font-bold uppercase tracking-wider">Escenario Activo:</span>
            <select
              value={activeScenario}
              onChange={(e) => onChangeScenario(e.target.value)}
              className="bg-white/4 border border-white/8 text-text-primary px-4 py-2 rounded-xl text-sm font-medium outline-none cursor-pointer hover:bg-white/6 transition-colors"
              aria-label="Seleccionar escenario de conversación"
            >
              <option value="casual" className="bg-bg-secondary text-text-primary">Casual Conversation</option>
              <option value="restaurant" className="bg-bg-secondary text-text-primary">At the Restaurant (Waiter Roleplay)</option>
              <option value="interview" className="bg-bg-secondary text-text-primary">Job Interview (Professional Roleplay)</option>
            </select>
          </div>
          
          <button
            onClick={onResetChat}
            className="w-10 h-10 flex items-center justify-center bg-white/4 border border-white/8 rounded-xl text-text-secondary cursor-pointer hover:bg-white/8 hover:text-text-primary hover:rotate-15 transition-all duration-300"
            title="Reiniciar chat actual"
          >
            <i className="fa-solid fa-rotate-right"></i>
          </button>
        </div>

        {/* Scrollable messages area */}
        <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-5">
          {chatHistory.map((msg, idx) => {
            const isAura = msg.sender === "aura";
            const showTranslation = visibleTranslations[idx];
            
            return (
              <div
                key={idx}
                className={`flex flex-col max-w-[75%] animate-fadeIn ${
                  isAura ? "self-start items-start" : "self-end items-end"
                }`}
              >
                {/* Voice input indicator badge */}
                {!isAura && msg.isVoice && (
                  <span className="text-[0.7rem] text-accent-cyan flex items-center gap-1 mb-1 font-bold uppercase">
                    <i className="fa-solid fa-microphone"></i> Grabado por voz
                  </span>
                )}
                
                {/* Chat Bubble container */}
                <div
                  className={`p-3.5 px-4.5 rounded-[18px] text-[0.98rem] leading-relaxed shadow-lg ${
                    isAura
                      ? "bg-white/3 border border-white/6 rounded-tl-[4px] text-text-primary"
                      : "bg-gradient-to-br from-primary-color to-indigo-600 rounded-tr-[4px] text-white shadow-primary-color/10"
                  }`}
                >
                  <p>{msg.text}</p>
                  
                  {/* Aura Spanish translations */}
                  {isAura && msg.translation && showTranslation && (
                    <div className="mt-2.5 p-2 px-3 bg-white/2 border-l-2 border-accent-cyan text-xs text-text-secondary rounded-r-[6px] animate-fadeIn">
                      {msg.translation}
                    </div>
                  )}
                </div>
                
                {/* Action buttons under Aura's bubble */}
                {isAura && (
                  <div className="flex gap-2.5 mt-1.5 px-1">
                    <button
                      onClick={() => speakText(msg.text)}
                      className="bg-none border-none text-text-muted hover:text-text-primary cursor-pointer text-xs font-semibold flex items-center gap-1 transition-colors duration-200"
                    >
                      <i className="fa-solid fa-volume-high"></i> Escuchar
                    </button>
                    {msg.translation && (
                      <button
                        onClick={() => toggleTranslation(idx)}
                        className="bg-none border-none text-text-muted hover:text-text-primary cursor-pointer text-xs font-semibold flex items-center gap-1 transition-colors duration-200"
                      >
                        <i className="fa-solid fa-language"></i> {showTranslation ? "Ocultar" : "Traducir"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing processing animation dots */}
          {isTyping && (
            <div className="flex items-center gap-1 px-4.5 py-3 bg-white/2 border border-white/5 rounded-[18px] w-max self-start ml-2 mb-2 animate-fadeIn">
              <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:-0.32s]"></span>
              <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:-0.16s]"></span>
              <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce"></span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Form message typing input controls area */}
        <div className="p-4 px-6 pb-6 border-t border-white/6 flex flex-col gap-2">
          <form onSubmit={handleSubmit} className="flex gap-3 items-center relative">
            <div className="flex-grow relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isRecording ? "Listening... Speak now!" : isTyping ? "Aura is thinking..." : "Type your response in English..."}
                disabled={isRecording || isTyping}
                className="w-full bg-white/3 border border-white/6 rounded-[30px] p-4 px-6 text-text-primary text-[0.95rem] outline-none transition-all duration-300 focus:bg-white/5 focus:border-panel-border-glow focus:shadow-[inset_0_0_0_1px_rgba(99,102,241,0.25),_0_0_20px_rgba(99,102,241,0.1)] disabled:opacity-75"
                aria-label="Escribe tu mensaje en inglés"
              />
              
              {/* Voice pulse indicator waves */}
              {isRecording && (
                <div className="absolute right-6 flex items-center gap-0.5 h-5">
                  <span className="w-0.5 h-3/5 bg-accent-cyan rounded-full animate-wave-pulse [animation-delay:0.1s]"></span>
                  <span className="w-0.5 h-full bg-accent-cyan rounded-full animate-wave-pulse [animation-delay:0.25s]"></span>
                  <span className="w-0.5 h-2/5 bg-accent-cyan rounded-full animate-wave-pulse [animation-delay:0.4s]"></span>
                  <span className="w-0.5 h-[80%] bg-accent-cyan rounded-full animate-wave-pulse [animation-delay:0.55s]"></span>
                </div>
              )}
            </div>

            <div className="flex gap-2 items-center">
              {/* Voice dictation button */}
              <button
                type="button"
                onClick={toggleRecording}
                disabled={isTyping}
                className={`w-[50px] h-[50px] rounded-full flex items-center justify-center text-[1.15rem] cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isRecording
                    ? "bg-accent-cyan text-black shadow-[0_0_20px_rgba(6,182,212,0.4)] animate-recording-pulse"
                    : "bg-white/3 border border-white/6 text-text-secondary hover:bg-accent-cyan-glow hover:border-accent-cyan/20 hover:text-accent-cyan hover:scale-[1.05]"
                }`}
                title={isRecording ? "Detener grabación" : "Presionar para hablar en inglés"}
              >
                <i className="fa-solid fa-microphone"></i>
              </button>
              
              {/* Send Button */}
              <button
                type="submit"
                disabled={isRecording || !inputValue.trim() || isTyping}
                className="w-[50px] h-[50px] rounded-full flex items-center justify-center text-[1.15rem] bg-primary-color text-white cursor-pointer hover:bg-primary-color-hover hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-[1.05] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none transition-all duration-300"
                aria-label="Enviar mensaje"
              >
                <i className="fa-solid fa-arrow-up"></i>
              </button>
            </div>
          </form>
          
          {voiceStatus && (
            <div className="text-[0.75rem] color-accent-cyan text-accent-cyan text-center min-h-[12px] font-semibold">
              {voiceStatus}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Grammar Assistant Pane */}
      <div className="p-6 glass-panel flex flex-col h-[400px] xl:h-full overflow-hidden">
        <h4 className="text-lg font-bold flex items-center gap-2 border-b border-white/5 pb-3 mb-5 text-text-primary">
          <i className="fa-solid fa-wand-magic-sparkles text-primary-color animate-pulse"></i> Aura Assistant
        </h4>
        
        {!feedback ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center text-text-muted gap-4 p-5">
            <i className="fa-solid fa-circle-info text-3xl opacity-20"></i>
            <p className="text-[0.88rem] leading-relaxed">
              Envía tu primer mensaje. Aura te proporcionará retroalimentación sobre tu gramática y te sugerirá alternativas más naturales aquí.
            </p>
          </div>
        ) : (
          <div className="flex-grow flex flex-col gap-5 overflow-y-auto pr-1">
            {/* Grammar correction section */}
            <div className="bg-white/2 border border-white/4 rounded-xl p-4 space-y-3">
              <h5 className="text-[0.85rem] text-text-primary font-bold uppercase tracking-wider">Gramática y Estilo</h5>
              {feedback.corrections && feedback.corrections.length > 0 ? (
                <ul className="list-none flex flex-col gap-4 p-0 m-0">
                  {feedback.corrections.map((corr, idx) => (
                    <li key={idx} className="border-b border-dashed border-white/4 pb-3.5 last:border-b-0 last:pb-0">
                      <span className="line-through text-danger-color text-[0.85rem] block">
                        <i className="fa-solid fa-xmark mr-1"></i> &quot;{corr.incorrect}&quot;
                      </span>
                      <span className="text-success-color font-medium text-[0.85rem] block mt-0.5">
                        <i className="fa-solid fa-check mr-1"></i> &quot;{corr.correct}&quot;
                      </span>
                      <span className="text-text-muted italic text-[0.78rem] block mt-1">
                        {corr.explain}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-success-color font-semibold text-[0.85rem] flex items-center gap-1.5 py-1">
                  <i className="fa-solid fa-circle-check text-base"></i> Excellent! No grammar mistakes detected.
                </div>
              )}
            </div>

            {/* Suggested Vocabulary Tags */}
            <div className="bg-white/2 border border-white/4 rounded-xl p-4 space-y-3">
              <h5 className="text-[0.85rem] text-text-primary font-bold uppercase tracking-wider">Vocabulario Sugerido</h5>
              <p className="text-xs text-text-secondary leading-relaxed">Intenta incorporar estas palabras en tu próxima respuesta haciendo clic sobre ellas:</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {feedback.suggestedVocab.map((vocab, idx) => (
                  <span
                    key={idx}
                    onClick={() => handleSuggestedVocabClick(vocab)}
                    className="bg-primary-color-glow text-text-primary border border-panel-border-glow px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer hover:bg-primary-color hover:text-white transition-all duration-200"
                  >
                    {vocab}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
