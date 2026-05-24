import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#070913] overflow-hidden px-4 py-8">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-primary-color filter blur-[100px] opacity-25 animate-pulse-orb pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-accent-cyan filter blur-[100px] opacity-20 animate-pulse-orb pointer-events-none"></div>

      {/* Subtle Dot Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      ></div>

      {/* Centered Glassmorphic Card Container */}
      <div className="w-[92%] sm:w-full max-w-[420px] glass-panel p-6 sm:p-10 flex flex-col gap-6 relative overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-500 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Soft Inner Glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-accent-cyan/10 to-primary-color/0 rounded-full filter blur-[20px] pointer-events-none"></div>
        
        {/* App Branding */}
        <div className="flex flex-col items-center gap-2 select-none">
          <div className="flex items-center gap-2.5">
            <span className="w-3.5 h-3.5 bg-accent-cyan rounded-full shadow-[0_0_15px_rgba(6,182,212,0.6)] animate-pulse"></span>
            <h1 className="text-3xl font-extrabold font-display bg-gradient-to-r from-white to-text-secondary bg-clip-text text-transparent tracking-tight">
              Aura
            </h1>
          </div>
          <p className="text-xs text-text-muted font-semibold tracking-wide text-center">
            Tu compañero inteligente de conversación en inglés
          </p>
        </div>

        {/* Auth Page Content */}
        <div className="w-full flex-grow flex flex-col gap-5">
          {children}
        </div>
      </div>
    </div>
  );
}
