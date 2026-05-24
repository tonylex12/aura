import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onSave: (name: string, voiceName: string, rate: number) => void;
  ttsRate: number;
  ttsVoice: SpeechSynthesisVoice | null;
}

export default function SettingsDialog({
  isOpen,
  onClose,
  userName,
  onSave,
  ttsRate,
  ttsVoice,
}: SettingsDialogProps) {
  const [nameInput, setNameInput] = useState(userName);
  const [rateInput, setRateInput] = useState(ttsRate);
  const [selectedVoiceName, setSelectedVoiceName] = useState(ttsVoice?.name || "");
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Load Speech Synthesis voices client-side safely
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        
        // Sort: English voices first, then others
        const engVoices = voices.filter(v => v.lang.startsWith("en"));
        const otherVoices = voices.filter(v => !v.lang.startsWith("en"));
        const sorted = [...engVoices, ...otherVoices];
        
        setAvailableVoices(sorted);

        // Sync active selection
        if (ttsVoice) {
          setSelectedVoiceName(ttsVoice.name);
        } else if (sorted.length > 0) {
          const pref = sorted.find(v => v.name.includes("Google US English") || v.lang === "en-US") || sorted[0];
          setSelectedVoiceName(pref.name);
        }
      };

      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, [ttsVoice, isOpen]);

  // Sync inputs on open trigger
  useEffect(() => {
    if (isOpen) {
      setNameInput(userName);
      setRateInput(ttsRate);
      if (ttsVoice) {
        setSelectedVoiceName(ttsVoice.name);
      }
    }
  }, [isOpen, userName, ttsRate, ttsVoice]);

  const handleSave = () => {
    onSave(nameInput.trim() || "Learner", selectedVoiceName, rateInput);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {/* Set showCloseButton={false} because Radix already includes it or we handle closing gracefully */}
      <DialogContent 
        className="max-w-[500px] bg-bg-secondary border-panel-border text-text-primary p-0 rounded-2xl overflow-hidden glass-panel border shadow-2xl"
        showCloseButton={true}
      >
        
        {/* Dialog Header */}
        <div className="flex justify-between items-center p-5 px-6 border-b border-white/5">
          <DialogTitle className="text-lg font-bold flex items-center gap-2 font-display">
            <i className="fa-solid fa-sliders text-primary-color"></i> Configuración
          </DialogTitle>
          <DialogDescription className="sr-only">
            Configura tu perfil de usuario y las preferencias de voz del tutor Aura
          </DialogDescription>
        </div>

        {/* Dialog Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6">
          {/* Profile Config */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <i className="fa-regular fa-user text-primary-color"></i> Tu Perfil
            </h4>
            <div className="flex flex-col gap-2">
              <label htmlFor="input-user-name" className="text-xs font-semibold text-text-secondary">
                Tu Nombre
              </label>
              <input
                type="text"
                id="input-user-name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Escribe tu nombre..."
                className="bg-white/3 border border-white/6 rounded-xl p-3 px-4 text-text-primary text-sm outline-none transition-colors focus:bg-white/5 focus:border-primary-color"
              />
            </div>
          </div>

          {/* Voice Settings */}
          <div className="flex flex-col gap-4 border-t border-white/5 pt-5">
            <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <i className="fa-solid fa-volume-high text-primary-color"></i> Voz y Pronunciación
            </h4>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="select-tts-voice" className="text-xs font-semibold text-text-secondary">
                Voz del Tutor (Aura)
              </label>
              <select
                id="select-tts-voice"
                value={selectedVoiceName}
                onChange={(e) => setSelectedVoiceName(e.target.value)}
                className="bg-white/3 border border-white/6 text-text-primary p-3 px-4 rounded-xl text-sm outline-none cursor-pointer hover:bg-white/5 transition-colors"
              >
                {availableVoices.length > 0 ? (
                  availableVoices.map((voice) => (
                    <option key={voice.name} value={voice.name} className="bg-bg-secondary text-text-primary text-xs">
                      {voice.name} ({voice.lang}){voice.default ? " [Predeterminada]" : ""}
                    </option>
                  ))
                ) : (
                  <option value="" className="bg-bg-secondary text-text-primary">
                    Cargando voces del sistema...
                  </option>
                )}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="range-voice-rate" className="text-xs font-semibold text-text-secondary">
                Velocidad de Habla
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  id="range-voice-rate"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={rateInput}
                  onChange={(e) => setRateInput(parseFloat(e.target.value))}
                  className="grow accent-primary-color h-1.5 bg-white/10 rounded-full cursor-pointer outline-none"
                />
                <span className="text-sm font-semibold text-text-primary w-10 text-right">
                  {rateInput}x
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dialog Footer Actions */}
        <div className="p-4 px-6 border-t border-white/5 flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary-color text-white font-bold rounded-xl cursor-pointer hover:bg-primary-color-hover hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300"
          >
            Guardar Configuración
          </button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
