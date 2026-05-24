"use client";

import React from "react";
import Link from "next/link";

interface DashboardProps {
  stats: {
    messagesSent: number;
    pronunciationAccuracy: number;
    masteredFlashcardsCount: number;
  };
}

export default function Dashboard({ stats }: DashboardProps) {
  const recommendedActivities = [
    {
      id: "casual",
      title: "Casual Conversation",
      desc: "Friendly chit-chat about hobbies, dreams, and life.",
      level: "Fácil",
      levelClass: "bg-success-color/10 text-success-color",
    },
    {
      id: "restaurant",
      title: "At the Restaurant",
      desc: "Order delicious dishes and request your check.",
      level: "Intermedio",
      levelClass: "bg-warning-color/10 text-warning-color",
    },
    {
      id: "interview",
      title: "Job Interview",
      desc: "Answer professional questions about your career goals.",
      level: "Avanzado",
      levelClass: "bg-danger-color/10 text-danger-color",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Hero Panel */}
      <div className="flex flex-col md:flex-row justify-between p-6 lg:p-10 relative overflow-hidden glass-panel">
        <div className="max-w-full md:max-w-[60%] flex flex-col justify-center z-10 space-y-4">
          <h3 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-white to-text-secondary bg-clip-text text-transparent leading-tight font-display">
            Ready to speak English confidently?
          </h3>
          <p className="text-text-secondary text-base lg:text-lg leading-relaxed">
            Practice conversations with Aura, refine your pronunciation in the sandbox, or memorize core phrasal verbs.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link 
              href="/dashboard/chat"
              className="flex items-center gap-2 px-6 py-3 bg-primary-color text-white font-bold rounded-xl cursor-pointer hover:bg-primary-color-hover hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <i className="fa-solid fa-play"></i> Start Conversing
            </Link>
            <Link 
              href="/dashboard/pronunciation"
              className="flex items-center gap-2 px-6 py-3 bg-white/5 text-text-primary border border-white/8 font-bold rounded-xl cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Try Pronunciation Sandbox
            </Link>
            <Link 
              href="/dashboard/quizzes"
              className="flex items-center gap-2 px-6 py-3 bg-white/5 text-accent-cyan border border-accent-cyan/15 font-bold rounded-xl cursor-pointer hover:bg-accent-cyan/10 hover:border-accent-cyan/25 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <i className="fa-solid fa-graduation-cap"></i> Practice Quizzes
            </Link>
          </div>
        </div>
        <div className="w-[180px] lg:w-[250px] relative flex items-center justify-center z-1 mx-auto mt-6 md:mt-0">
          <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full bg-gradient-to-tr from-accent-cyan to-primary-color filter blur-[12px] opacity-65 animate-pulse-orb"></div>
        </div>
      </div>

      {/* Analytics Statistics Panel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Messages Card */}
        <div className="flex items-center gap-5 p-6 glass-panel">
          <div className="w-[54px] h-[54px] rounded-xl flex items-center justify-center text-xl bg-primary-color-glow text-primary-color border border-primary-color/20">
            <i className="fa-solid fa-message"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.85rem] text-text-muted font-bold uppercase tracking-wider">Mensajes Enviados</span>
            <span className="text-2xl font-bold text-text-primary">{stats.messagesSent}</span>
          </div>
        </div>

        {/* Pronunciation Card */}
        <div className="flex items-center gap-5 p-6 glass-panel">
          <div className="w-[54px] h-[54px] rounded-xl flex items-center justify-center text-xl bg-success-color/10 text-success-color border border-success-color/20">
            <i className="fa-solid fa-bullseye"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.85rem] text-text-muted font-bold uppercase tracking-wider">Precisión Promedio</span>
            <span className="text-2xl font-bold text-text-primary">{stats.pronunciationAccuracy}%</span>
          </div>
        </div>

        {/* Vocabulary Card */}
        <div className="flex items-center gap-5 p-6 glass-panel">
          <div className="w-[54px] h-[54px] rounded-xl flex items-center justify-center text-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <i className="fa-solid fa-layer-group"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.85rem] text-text-muted font-bold uppercase tracking-wider">Tarjetas Dominadas</span>
            <span className="text-2xl font-bold text-text-primary">{stats.masteredFlashcardsCount}</span>
          </div>
        </div>
      </div>

      {/* Dashboard Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-5">
        {/* Recommended activities */}
        <div className="p-6 glass-panel flex flex-col space-y-4">
          <h4 className="text-lg font-bold text-text-primary border-b border-white/5 pb-2.5 font-display">
            Simulaciones Recomendadas
          </h4>
          <div className="flex flex-col gap-3">
            {recommendedActivities.map((act) => (
              <Link
                key={act.id}
                href={`/dashboard/chat?scenario=${act.id}`}
                className="flex justify-between items-center p-4 bg-white/2 border border-white/4 rounded-xl cursor-pointer hover:bg-white/5 hover:border-white/8 hover:scale-[1.01] transition-all duration-300"
              >
                <div className="flex flex-col space-y-1">
                  <h5 className="font-semibold text-text-primary text-[0.95rem]">{act.title}</h5>
                  <p className="text-xs text-text-secondary">{act.desc}</p>
                </div>
                <span className={`text-[0.75rem] font-bold px-2.5 py-1 rounded-full uppercase ${act.levelClass}`}>
                  {act.level}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Tip of the day */}
        <div className="p-6 glass-panel flex flex-col space-y-4">
          <h4 className="text-lg font-bold text-text-primary border-b border-white/5 pb-2.5 font-display">
            Tip del Día
          </h4>
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-3 text-warning-color">
              <i className="fa-regular fa-lightbulb text-xl"></i>
              <h5 className="font-semibold text-text-primary text-[0.95rem]">Uso de Phrasal Verbs</h5>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              En lugar de decir <em>&quot;continue doing something&quot;</em>, los hablantes nativos suelen utilizar <strong>&quot;keep on&quot;</strong>. Por ejemplo: <em>&quot;You should keep on practicing!&quot;</em>
            </p>
            <div className="pt-2">
              <Link 
                href="/dashboard/vocabulary"
                className="text-accent-cyan hover:text-cyan-400 text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors"
              >
                Estudiar Phrasal Verbs <i className="fa-solid fa-arrow-right transition-transform hover:translate-x-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
