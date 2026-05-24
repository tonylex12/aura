"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsDialog({ isOpen, onClose }: SettingsDialogProps) {
  const { user, isLoaded } = useUser();
  const [nameInput, setNameInput] = useState("");
  const [rateInput, setRateInput] = useState(0.9);
  const [selectedVoiceName, setSelectedVoiceName] = useState("");
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [saving, setSaving] = useState(false);

  // 1. Fetch system voices client-side
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        
        // Sort: English voices first, then others
        const engVoices = voices.filter(v => v.lang.startsWith("en"));
        const otherVoices = voices.filter(v => !v.lang.startsWith("en"));
        const sorted = [...engVoices, ...otherVoices];
        
        setAvailableVoices(sorted);
      };

      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  // 2. Load preferences on Dialog Open
  useEffect(() => {
    if (isOpen) {
      // Load user's Clerk first name
      if (user) {
        setNameInput(user.firstName || "");
      }

      // Load TTS preferences from localStorage
      const savedRate = localStorage.getItem("aura_tts_rate");
      const savedVoice = localStorage.getItem("aura_tts_voice");

      if (savedRate) {
        setRateInput(parseFloat(savedRate));
      } else {
        setRateInput(0.9);
      }

      if (savedVoice) {
        setSelectedVoiceName(savedVoice);
      } else if (availableVoices.length > 0) {
        const pref = availableVoices.find(v => v.name.includes("Google US English") || v.lang === "en-US") || availableVoices[0];
        setSelectedVoiceName(pref.name);
      }
    }
  }, [isOpen, user, availableVoices]);

  const handleSave = async () => {
    setSaving(true);
    try {
      // 1. Save name to Clerk
      if (user && nameInput.trim() !== "") {
        await user.update({
          firstName: nameInput.trim(),
        });
      }

      // 2. Save TTS configs to LocalStorage
      localStorage.setItem("aura_tts_rate", rateInput.toString());
      localStorage.setItem("aura_tts_voice", selectedVoiceName);

      toast.success("¡Configuración guardada exitosamente!");
      onClose();
    } catch (err: any) {
      console.error("Error al guardar la configuración:", err);
      toast.error("Ocurrió un error al actualizar tu perfil.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="max-w-[90%] md:max-w-[500px] bg-bg-secondary border-panel-border text-text-primary p-0 rounded-2xl overflow-hidden glass-panel border shadow-2xl"
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
        <div className="p-6 overflow-y-auto flex flex-col gap-6 max-h-[70vh]">
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
                placeholder={isLoaded && user ? "Escribe tu nombre..." : "Cargando usuario..."}
                disabled={!isLoaded || saving}
                className="bg-white/3 border border-white/6 rounded-xl p-3 px-4 text-text-primary text-sm outline-none transition-colors focus:bg-white/5 focus:border-primary-color disabled:opacity-50"
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
                disabled={saving}
                className="bg-bg-secondary border border-white/6 text-text-primary p-3 px-4 rounded-xl text-sm outline-none cursor-pointer hover:bg-white/5 transition-colors max-w-full"
              >
                {availableVoices.length > 0 ? (
                  availableVoices.map((voice) => (
                    <option key={voice.name} value={voice.name} className="bg-bg-secondary text-text-primary text-xs">
                      {voice.name} ({voice.lang})
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
                  disabled={saving}
                  className="grow accent-primary-color h-1.5 bg-white/10 rounded-full cursor-pointer outline-none disabled:opacity-50"
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
            disabled={saving || !isLoaded}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary-color text-white font-bold rounded-xl cursor-pointer hover:bg-primary-color-hover hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300 disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar Configuración"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
