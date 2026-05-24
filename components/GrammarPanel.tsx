import React, { useState, useEffect } from "react";
import { toast } from "sonner";

interface GrammarExample {
  en: string;
  es: string;
  explain: string;
}

interface GrammarLesson {
  id: string;
  title: string;
  category: string;
  summary: string;
  formula: string | null;
  content: string;
  examplesJson: string;
  order: number;
  completed: boolean;
}

interface GrammarPanelProps {
  speakText: (text: string) => void;
}

const CATEGORY_NAMES: { [key: string]: string } = {
  tenses: "Tiempos Verbales",
  quantifiers: "Cuantificadores",
  rules: "Reglas Esenciales",
  conditionals: "Condicionales y Pasiva",
};

export default function GrammarPanel({ speakText }: GrammarPanelProps) {
  const [lessons, setLessons] = useState<GrammarLesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/grammar");
      if (!res.ok) throw new Error("No se pudo cargar la teoría gramatical");
      const data: GrammarLesson[] = await res.json();
      setLessons(data);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Error al conectar con la base de datos.");
    } finally {
      setLoading(false);
    }
  };

  const toggleCompleted = async (lesson: GrammarLesson) => {
    const nextStatus = !lesson.completed;
    
    // Optimistic Update
    setLessons((prev) =>
      prev.map((l) => (l.id === lesson.id ? { ...l, completed: nextStatus } : l))
    );

    try {
      const res = await fetch("/api/grammar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lesson.id, completed: nextStatus }),
      });

      if (!res.ok) throw new Error("Error en el servidor");
      
      const updated = await res.json();
      toast.success(
        nextStatus 
          ? `¡Lección "${lesson.title.replace(/^\d+\.\s*/, "")}" completada!` 
          : "Lección marcada como pendiente"
      );
    } catch (err: any) {
      console.error(err);
      toast.error("No se pudo sincronizar el progreso de lectura.");
      // Rollback on error
      setLessons((prev) =>
        prev.map((l) => (l.id === lesson.id ? { ...l, completed: !nextStatus } : l))
      );
    }
  };

  const currentLesson = lessons[currentIdx];

  // Parse examples securely
  let parsedExamples: GrammarExample[] = [];
  if (currentLesson && currentLesson.examplesJson) {
    try {
      parsedExamples = JSON.parse(currentLesson.examplesJson);
    } catch (e) {
      console.error("Error al parsear ejemplos:", e);
    }
  }

  // Filter lessons based on search query
  const filteredLessons = lessons.filter((l) => {
    const term = searchQuery.toLowerCase();
    return (
      l.title.toLowerCase().includes(term) ||
      l.summary.toLowerCase().includes(term) ||
      CATEGORY_NAMES[l.category]?.toLowerCase().includes(term)
    );
  });

  const totalLessons = lessons.length;
  const completedLessons = lessons.filter((l) => l.completed).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Handle pagination
  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < totalLessons - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const selectLessonById = (id: string) => {
    const idx = lessons.findIndex((l) => l.id === id);
    if (idx !== -1) {
      setCurrentIdx(idx);
    }
  };

  // Group lessons by category for the sidebar index
  const groupedLessons = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.category]) {
      acc[lesson.category] = [];
    }
    acc[lesson.category].push(lesson);
    return acc;
  }, {} as { [key: string]: GrammarLesson[] });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[350px] space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-t-accent-cyan border-white/10 animate-spin"></div>
        <p className="text-text-muted text-sm font-semibold tracking-wide animate-pulse">
          Cargando libro de gramática...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[75vh]">
      {/* LEFT COLUMN: Sidebar Index Table of Contents */}
      <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-4">
        {/* Progress Tracker Card */}
        <div className="glass-panel p-4 flex flex-col gap-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent-cyan/5 rounded-full filter blur-[15px] -z-10"></div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-muted font-bold uppercase tracking-wider">Tu Progreso General</span>
            <span className="text-sm font-bold text-accent-cyan">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-primary-color to-accent-cyan transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-secondary mt-1">
            <i className="fa-solid fa-book-open text-primary-color"></i>
            <span>{completedLessons} de {totalLessons} lecciones leídas</span>
          </div>
        </div>

        {/* Index List Container */}
        <div className="glass-panel p-4 flex flex-col flex-1 gap-3 max-h-[60vh] lg:max-h-[65vh] overflow-y-auto custom-scrollbar">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-xs"></i>
            <input
              type="text"
              placeholder="Buscar tema gramatical..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/30 transition-all placeholder:text-text-muted"
            />
          </div>

          <div className="space-y-4 pt-2">
            {Object.entries(CATEGORY_NAMES).map(([catKey, catName]) => {
              const catLessons = groupedLessons[catKey] || [];
              const filteredCatLessons = catLessons.filter((l) =>
                filteredLessons.some((fl) => fl.id === l.id)
              );

              if (filteredCatLessons.length === 0) return null;

              return (
                <div key={catKey} className="space-y-1.5">
                  <h4 className="text-[0.7rem] text-text-muted font-black tracking-widest uppercase pl-1">
                    {catName}
                  </h4>
                  <div className="space-y-1">
                    {filteredCatLessons.map((l) => {
                      const isActive = currentLesson?.id === l.id;
                      const cleanTitle = l.title.replace(/^\d+\.\s*/, "");
                      return (
                        <button
                          key={l.id}
                          onClick={() => selectLessonById(l.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between gap-2.5 transition-all text-xs font-semibold cursor-pointer border ${
                            isActive
                              ? "bg-primary-color-glow text-accent-cyan border-accent-cyan/30 shadow-[0_0_12px_rgba(6,182,212,0.1)]"
                              : "bg-white/[0.01] hover:bg-white/5 text-text-secondary border-transparent"
                          }`}
                        >
                          <span className="truncate flex-1">{cleanTitle}</span>
                          {l.completed ? (
                            <i className="fa-solid fa-circle-check text-success-color text-[0.8rem] shrink-0"></i>
                          ) : (
                            <i className="fa-regular fa-circle text-white/20 text-[0.8rem] shrink-0"></i>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {filteredLessons.length === 0 && (
              <p className="text-xs text-text-muted text-center py-6">
                No se encontraron lecciones.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: The Digital Book Page View */}
      <div className="flex-1 flex flex-col gap-5">
        {currentLesson ? (
          <>
            {/* The Main Lesson Card */}
            <div className="glass-panel p-6 lg:p-8 flex-1 flex flex-col gap-6 relative overflow-hidden">
              {/* Soft visual gradient overlay inside the book card */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-primary-color/5 to-accent-cyan/0 rounded-full filter blur-[40px] -z-10 pointer-events-none"></div>

              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold tracking-wider uppercase bg-primary-color/10 text-primary-color border border-primary-color/20">
                      {CATEGORY_NAMES[currentLesson.category]}
                    </span>
                    <span className="text-xs text-text-muted">Lección {currentLesson.order} de {totalLessons}</span>
                  </div>
                  <h2 className="text-2xl font-black text-text-primary tracking-tight">
                    {currentLesson.title.replace(/^\d+\.\s*/, "")}
                  </h2>
                </div>

                {/* Mark as Completed Toggle Button */}
                <button
                  onClick={() => toggleCompleted(currentLesson)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer select-none shrink-0 ${
                    currentLesson.completed
                      ? "bg-success-color/10 border-success-color/30 text-success-color shadow-[0_0_12px_rgba(34,197,94,0.1)] hover:bg-success-color/20"
                      : "bg-white/5 border-white/10 text-text-secondary hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  {currentLesson.completed ? (
                    <>
                      <i className="fa-solid fa-check"></i>
                      <span>Completada</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-regular fa-square"></i>
                      <span>Marcar como leída</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick Summary */}
              <div className="p-4 bg-white/[0.02] border-l-4 border-accent-cyan rounded-r-xl">
                <p className="text-sm font-medium text-text-secondary leading-relaxed">
                  {currentLesson.summary}
                </p>
              </div>

              {/* Form / Formula Panel */}
              {currentLesson.formula && (
                <div className="space-y-2">
                  <h4 className="text-[0.7rem] text-text-muted font-black tracking-widest uppercase pl-1">
                    Estructura de Referencia
                  </h4>
                  <div className="p-4 bg-slate-950/40 border border-white/5 rounded-xl flex items-center justify-between gap-4 font-mono text-sm overflow-x-auto custom-scrollbar">
                    <span className="text-accent-cyan font-semibold whitespace-nowrap">
                      {currentLesson.formula}
                    </span>
                    <i className="fa-solid fa-code text-white/15 text-xs shrink-0 select-none"></i>
                  </div>
                </div>
              )}

              {/* Rich Narrative Explanation Content */}
              <div className="space-y-3">
                <h4 className="text-[0.7rem] text-text-muted font-black tracking-widest uppercase pl-1">
                  Explicación Detallada
                </h4>
                <div className="text-sm text-text-secondary leading-relaxed space-y-4 whitespace-pre-wrap font-medium">
                  {currentLesson.content}
                </div>
              </div>

              {/* Examples with Audio Narration */}
              {parsedExamples.length > 0 && (
                <div className="space-y-3 mt-2">
                  <h4 className="text-[0.7rem] text-text-muted font-black tracking-widest uppercase pl-1">
                    Ejemplos Prácticos & Narración
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {parsedExamples.map((ex, i) => (
                      <div
                        key={i}
                        className="group flex flex-col md:flex-row md:items-start justify-between gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all duration-300"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-text-primary group-hover:text-accent-cyan transition-colors">
                              {ex.en}
                            </span>
                            <button
                              onClick={() => speakText(ex.en)}
                              title="Escuchar audio"
                              className="w-7 h-7 rounded-full bg-white/5 border border-white/8 hover:bg-primary-color hover:border-primary-color text-text-secondary hover:text-white flex items-center justify-center cursor-pointer transition-all hover:scale-105 shrink-0"
                            >
                              <i className="fa-solid fa-volume-high text-[0.75rem]"></i>
                            </button>
                          </div>
                          <p className="text-xs text-text-muted font-semibold italic">
                            {ex.es}
                          </p>
                          <p className="text-[0.7rem] text-primary-color/75 font-semibold bg-primary-color-glow border border-primary-color/10 px-2.5 py-1 rounded-md inline-block mt-1">
                            💡 {ex.explain}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between p-3 glass-panel shrink-0 select-none">
              <button
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  currentIdx === 0
                    ? "opacity-30 border-white/5 text-text-muted pointer-events-none"
                    : "bg-white/5 border-white/10 text-text-secondary hover:bg-white/10 hover:text-text-primary"
                }`}
              >
                <i className="fa-solid fa-chevron-left"></i>
                <span>Anterior</span>
              </button>

              <div className="text-xs text-text-muted font-bold tracking-wide">
                Página {currentIdx + 1} de {totalLessons}
              </div>

              <button
                onClick={handleNext}
                disabled={currentIdx === totalLessons - 1}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  currentIdx === totalLessons - 1
                    ? "opacity-30 border-white/5 text-text-muted pointer-events-none"
                    : "bg-white/5 border-white/10 text-text-secondary hover:bg-white/10 hover:text-text-primary"
                }`}
              >
                <span>Siguiente</span>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </>
        ) : (
          <div className="glass-panel p-8 flex-1 flex flex-col items-center justify-center min-h-[350px]">
            <p className="text-sm text-text-muted font-semibold">
              No hay ninguna lección activa.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
