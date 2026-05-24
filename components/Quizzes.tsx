import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuizQuestion {
  id: string;
  word: string;
  example: string;
  correctAnswer: string;
  options: string[];
}

interface QuizRecord {
  id: string;
  score: number;
  total: number;
  category: string;
  createdAt: string;
}

interface QuizzesProps {
  speakText: (text: string) => void;
  onUpdateStats?: () => void;
}

export default function Quizzes({ speakText, onUpdateStats }: QuizzesProps) {
  // Game states
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);

  // History states
  const [records, setRecords] = useState<QuizRecord[]>([]);
  const [bestRecord, setBestRecord] = useState<QuizRecord | null>(null);

  // Fetch score history records
  const fetchRecords = async () => {
    try {
      const res = await fetch("/api/quizzes?action=records");
      if (res.ok) {
        const data = await res.json();
        setRecords(data.records || []);
        setBestRecord(data.bestRecord || null);
      }
    } catch (err) {
      console.error("Error al cargar récords de quizzes:", err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Generate dynamic quiz
  const startQuiz = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/quizzes?action=generate&category=${activeCategory}`,
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al generar preguntas.");
      }
      const questions = await res.json();
      setQuizQuestions(questions);
      setIsPlaying(true);
      setCurrentIndex(0);
      setCorrectAnswersCount(0);
      setSelectedOption(null);
      setShowHint(false);
      toast.success("¡Cuestionario listo! Mucha suerte.");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Error al comunicarse con la base de datos.");
    } finally {
      setIsLoading(false);
    }
  };

  // Option selection handler
  const handleOptionClick = (option: string) => {
    if (selectedOption !== null) return; // Prevent double clicks

    const currentQuestion = quizQuestions[currentIndex];
    setSelectedOption(option);

    const isCorrect = option === currentQuestion.correctAnswer;
    let nextScore = correctAnswersCount;
    if (isCorrect) {
      nextScore = correctAnswersCount + 1;
      setCorrectAnswersCount(nextScore);
      toast.success("¡Correcto!", { duration: 1000 });
      // Play a small click / correct sound if wanted
    } else {
      toast.error(`Incorrecto. Era: "${currentQuestion.correctAnswer}"`, {
        duration: 1500,
      });
    }

    // Auto advance after short delay
    setTimeout(() => {
      if (currentIndex + 1 < quizQuestions.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
        setShowHint(false);
      } else {
        // Quiz completed
        finishQuiz(nextScore);
      }
    }, 1800);
  };

  // Save score to database
  const finishQuiz = async (finalScore: number) => {
    setIsPlaying(false);
    setIsLoading(true);

    const totalQuestions = quizQuestions.length;

    try {
      const res = await fetch("/api/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          score: finalScore,
          total: totalQuestions,
          category: activeCategory,
        }),
      });

      if (res.ok) {
        toast.success(
          `Cuestionario completado: ¡Aciertos ${finalScore}/${totalQuestions}! Guardado con éxito.`,
          {
            duration: 4000,
          },
        );
        fetchRecords();
        if (onUpdateStats) onUpdateStats();
      } else {
        throw new Error("No se pudo guardar el récord en la base de datos.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Error al guardar el récord.");
    } finally {
      setIsLoading(false);
    }
  };

  // Listen to current word pronunciation
  const handleSpeakWord = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    speakText(word);
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "idioms":
        return "Idioms / Expresiones";
      case "phrasal":
        return "Phrasal Verbs";
      case "business":
        return "Negocios y Desarrollo";
      case "travel":
        return "Viajes y Rutinas";
      case "core":
        return "Vocabulario Esencial";
      default:
        return "Cualquier Categoría";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Active Quiz Game Play Interface */}
      {isPlaying && quizQuestions.length > 0 ? (
        <div className="max-w-[700px] mx-auto space-y-6">
          {/* Progress Header */}
          <div className="flex justify-between items-center text-sm font-semibold text-text-secondary">
            <span className="bg-white/5 border border-white/6 px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5">
              <i className="fa-solid fa-graduation-cap text-accent-cyan shadow-sm"></i>
              {getCategoryLabel(activeCategory)}
            </span>
            <span className="text-text-muted">
              Pregunta{" "}
              <strong className="text-text-primary text-base font-bold">
                {currentIndex + 1}
              </strong>{" "}
              de {quizQuestions.length}
            </span>
          </div>

          {/* Dynamic Linear Progress Bar */}
          <div className="w-full h-2.5 bg-white/5 border border-white/4 rounded-full overflow-hidden relative shadow-inner">
            <div
              className="h-full bg-linear-to-r from-primary-color to-accent-cyan transition-all duration-300 shadow-[0_0_12px_rgba(99,102,241,0.5)]"
              style={{
                width: `${((currentIndex + 1) / quizQuestions.length) * 100}%`,
              }}
              role="progressbar"
              aria-valuenow={currentIndex + 1}
              aria-valuemin={1}
              aria-valuemax={quizQuestions.length}
            ></div>
          </div>

          {/* Question Card */}
          <div className="glass-panel p-8 text-center relative overflow-hidden flex flex-col gap-5 items-center">
            <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-primary-glow to-transparent rounded-bl-full pointer-events-none opacity-40"></div>

            <p className="text-sm font-bold uppercase tracking-widest text-text-muted">
              ¿Cuál es el significado de?
            </p>

            <div className="flex items-center gap-3">
              <h3 className="text-3xl lg:text-4xl font-black tracking-tight font-display bg-linear-to-r from-white to-text-secondary bg-clip-text text-transparent">
                {quizQuestions[currentIndex].word}
              </h3>
              <button
                onClick={(e) =>
                  handleSpeakWord(quizQuestions[currentIndex].word, e)
                }
                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-primary-color hover:text-white border border-white/10 rounded-full transition-colors cursor-pointer"
                title="Escuchar pronunciación"
              >
                <i className="fa-solid fa-volume-high text-sm"></i>
              </button>
            </div>

            {/* Micro Hint Trigger */}
            <div className="w-full max-w-[500px]">
              {showHint ? (
                <div className="bg-black/20 border border-white/5 rounded-xl p-4 text-[0.88rem] text-text-secondary italic text-left relative animate-fade-in">
                  <strong className="block text-[0.7rem] text-text-muted uppercase tracking-wider mb-1">
                    Ejemplo en Contexto:
                  </strong>
                  &quot;{quizQuestions[currentIndex].example}&quot;
                </div>
              ) : (
                <button
                  onClick={() => setShowHint(true)}
                  className="text-xs text-accent-cyan hover:underline cursor-pointer flex items-center gap-1.5 mx-auto font-semibold"
                >
                  <i className="fa-regular fa-lightbulb animate-pulse"></i>{" "}
                  Revelar pista de ejemplo
                </button>
              )}
            </div>
          </div>

          {/* Multiple Choice Option List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quizQuestions[currentIndex].options.map((option, idx) => {
              const currentQuestion = quizQuestions[currentIndex];
              const isSelected = selectedOption === option;
              const isCorrectAnswer = option === currentQuestion.correctAnswer;

              let optionClass =
                "bg-white/3 border-white/6 hover:bg-white/7 hover:border-white/12 text-text-secondary hover:text-text-primary";
              let statusIcon = null;

              if (selectedOption !== null) {
                if (isCorrectAnswer) {
                  optionClass =
                    "bg-success-color/25 border-success-color text-success-color shadow-[0_0_15px_rgba(16,185,129,0.2)] animate-pulse";
                  statusIcon = (
                    <i className="fa-solid fa-circle-check text-success-color text-base"></i>
                  );
                } else if (isSelected) {
                  optionClass =
                    "bg-danger-color/25 border-danger-color text-danger-color shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-shake";
                  statusIcon = (
                    <i className="fa-solid fa-circle-xmark text-danger-color text-base"></i>
                  );
                } else {
                  optionClass =
                    "bg-white/2 border-white/3 opacity-40 text-text-muted";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-5 rounded-2xl border text-[0.95rem] font-medium transition-all duration-300 cursor-pointer flex justify-between items-center ${optionClass}`}
                >
                  <span>{option}</span>
                  {statusIcon}
                </button>
              );
            })}
          </div>

          {/* Quick Exit option */}
          <div className="text-center mt-4">
            <button
              onClick={() => {
                setIsPlaying(false);
                toast.info("Prueba cancelada.");
              }}
              className="text-xs text-text-muted hover:text-danger-color cursor-pointer transition-colors"
            >
              <i className="fa-solid fa-circle-left"></i> Salir y cancelar
              cuestionario
            </button>
          </div>
        </div>
      ) : (
        /* Idle Dashboard View */
        <div className="space-y-8">
          {/* Top Records Banner Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 flex flex-col justify-between relative overflow-hidden md:col-span-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-cyan-glow to-transparent rounded-bl-full pointer-events-none opacity-50"></div>
              <div>
                <span className="text-[0.7rem] bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/25 font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
                  Cuestionarios Dinámicos
                </span>
                <h2 className="text-3xl font-extrabold text-text-primary tracking-tight font-display mb-2 leading-tight">
                  Prueba tu fluidez en inglés
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed max-w-[500px] mb-4">
                  Practica significados, idioms, verbos frasales y vocabulario
                  corporativo. Los cuestionarios se construyen en tiempo real
                  utilizando las palabras de tu base de datos local SQLite.
                </p>
              </div>

              {/* Category Selector and Play Trigger */}
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[0.75rem] font-bold text-text-muted uppercase tracking-wider">
                    Categoría:
                  </span>
                  <Select
                    value={activeCategory}
                    onValueChange={setActiveCategory}
                  >
                    <SelectTrigger className="w-[220px] bg-black/35 border border-white/10 text-text-primary rounded-xl px-4 py-2.5 h-[38px] text-sm font-semibold cursor-pointer outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-color transition-colors shadow-inner flex items-center justify-between">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent className="bg-bg-secondary border border-white/10 text-text-primary rounded-xl shadow-2xl">
                      <SelectItem
                        value="all"
                        className="hover:bg-white/5 cursor-pointer text-sm font-medium"
                      >
                        Todas las Categorías
                      </SelectItem>
                      <SelectItem
                        value="idioms"
                        className="hover:bg-white/5 cursor-pointer text-sm font-medium"
                      >
                        Idioms & Expresiones
                      </SelectItem>
                      <SelectItem
                        value="phrasal"
                        className="hover:bg-white/5 cursor-pointer text-sm font-medium"
                      >
                        Phrasal Verbs
                      </SelectItem>
                      <SelectItem
                        value="business"
                        className="hover:bg-white/5 cursor-pointer text-sm font-medium"
                      >
                        Business / Corporativo
                      </SelectItem>
                      <SelectItem
                        value="travel"
                        className="hover:bg-white/5 cursor-pointer text-sm font-medium"
                      >
                        Travel / Viajes
                      </SelectItem>
                      <SelectItem
                        value="core"
                        className="hover:bg-white/5 cursor-pointer text-sm font-medium"
                      >
                        Vocabulario Principal (1500+)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <button
                  onClick={startQuiz}
                  disabled={isLoading}
                  className="bg-primary-color hover:bg-primary-hover text-white text-sm font-bold px-6 py-2.5 rounded-xl cursor-pointer shadow-[0_4px_15px_rgba(99,102,241,0.3)] transition-all duration-300 hover:shadow-[0_4px_25px_rgba(99,102,241,0.5)] transform hover:-translate-y-0.5 mt-auto flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <i className="fa-solid fa-spinner animate-spin"></i>{" "}
                      Generando...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-play"></i> Comenzar Arena
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* High Score Widget */}
            <div className="glass-panel p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-linear-to-tr from-primary-glow to-transparent rounded-tr-full pointer-events-none opacity-40"></div>

              <div className="w-16 h-16 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan mb-4 shadow-[inset_0_0_10px_rgba(6,182,212,0.2)]">
                <i className="fa-solid fa-trophy text-2xl animate-bounce-slow"></i>
              </div>

              <span className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">
                Récord de Respuestas
              </span>

              {bestRecord ? (
                <div>
                  <h3 className="text-4xl font-black tracking-tight font-display bg-linear-to-r from-white to-accent-cyan bg-clip-text text-transparent">
                    {bestRecord.score}{" "}
                    <span className="text-lg text-text-secondary font-medium">
                      / {bestRecord.total}
                    </span>
                  </h3>
                  <p className="text-[0.75rem] text-text-secondary mt-1">
                    Categoría:{" "}
                    <span className="capitalize font-bold text-accent-cyan">
                      {bestRecord.category === "all"
                        ? "Todos"
                        : bestRecord.category}
                    </span>
                  </p>
                  <p className="text-[0.65rem] text-text-muted mt-0.5">
                    {new Date(bestRecord.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-extrabold text-text-secondary">
                    0 <span className="text-xs text-text-muted">/ 40</span>
                  </h3>
                  <p className="text-xs text-text-muted italic mt-1">
                    Aún sin registros. ¡Rómpelo ahora!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Historical Attempts Table/Grid List */}
          <div className="glass-panel p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <i className="fa-solid fa-clock-rotate-left text-primary-color"></i>
                Historial de Cuestionarios
              </h3>
              <span className="text-xs text-text-muted">
                Últimos {records.length} intentos
              </span>
            </div>

            {records.length > 0 ? (
              <div className="overflow-x-auto w-full">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-text-muted text-xs uppercase tracking-wider font-bold">
                      <th className="py-3 px-4">Fecha</th>
                      <th className="py-3 px-4">Categoría</th>
                      <th className="py-3 px-4">Resultado</th>
                      <th className="py-3 px-4">Desempeño</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/4">
                    {records.map((rec) => {
                      const percentage = Math.round(
                        (rec.score / rec.total) * 100,
                      );
                      let pillClass =
                        "bg-danger-color/10 text-danger-color border-danger-color/20";

                      if (percentage >= 80) {
                        pillClass =
                          "bg-success-color/10 text-success-color border-success-color/20";
                      } else if (percentage >= 50) {
                        pillClass =
                          "bg-amber-500/10 text-amber-400 border-amber-500/20";
                      }

                      return (
                        <tr
                          key={rec.id}
                          className="hover:bg-white/2 transition-colors"
                        >
                          <td className="py-3.5 px-4 font-medium text-text-primary">
                            {new Date(rec.createdAt).toLocaleDateString()}{" "}
                            {new Date(rec.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="py-3.5 px-4 capitalize font-semibold text-text-secondary">
                            {rec.category === "all" ? "Todas" : rec.category}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-text-primary text-base">
                              {rec.score}
                            </span>{" "}
                            /{" "}
                            <span className="text-xs text-text-muted">
                              {rec.total} aciertos
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-bold ${pillClass}`}
                            >
                              {percentage}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-text-secondary border border-dashed border-white/5 rounded-2xl bg-black/10">
                <i className="fa-regular fa-clipboard text-3xl text-text-muted mb-3 block"></i>
                <p className="text-sm font-semibold">
                  No se han registrado intentos anteriores.
                </p>
                <p className="text-xs text-text-muted mt-1">
                  ¡Selecciona una categoría arriba y completa tu primer
                  cuestionario!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
