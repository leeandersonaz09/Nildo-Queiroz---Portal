"use client";

import React from "react";

export function Logo({
  variant = "full",
  className = "",
  dark = false,
  size = "normal",
}: {
  variant?: "full" | "icon" | "print";
  className?: string;
  dark?: boolean;
  size?: "small" | "normal" | "large";
}) {
  const iconSizes = {
    small: "w-8 h-8",
    normal: "w-10 h-10",
    large: "w-14 h-14",
  };

  // Ícone estilizado do 'Q' moderno (Dourado/Amarelo + Azul Escuro)
  const IconQ = () => (
    <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Arco superior / circular amarelo/âmbar */}
        <path
          d="M 50 12 C 72 12 88 28 88 50 C 88 58 85 66 80 72"
          stroke="#F59E0B"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M 50 12 C 28 12 12 28 12 50 C 12 72 28 88 50 88 C 62 88 72 83 79 75"
          stroke="#F59E0B"
          strokeWidth="13"
          strokeLinecap="round"
        />
        {/* Traço do 'Q' estilizado inferior */}
        <path
          d="M 64 74 L 88 88"
          stroke="#1E293B"
          strokeWidth="13"
          strokeLinecap="round"
        />
        {/* Pequeno detalhe no corte do arco */}
        <circle cx="78" cy="22" r="3" fill="#0EA5E9" />
      </svg>
    </div>
  );

  if (variant === "icon") {
    return <IconQ />;
  }

  if (variant === "print") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-12 h-12 shrink-0">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M 50 12 C 72 12 88 28 88 50 C 88 58 85 66 80 72"
              stroke="#D97706"
              strokeWidth="13"
              strokeLinecap="round"
            />
            <path
              d="M 50 12 C 28 12 12 28 12 50 C 12 72 28 88 50 88 C 62 88 72 83 79 75"
              stroke="#D97706"
              strokeWidth="13"
              strokeLinecap="round"
            />
            <path
              d="M 64 74 L 88 88"
              stroke="#0F172A"
              strokeWidth="13"
              strokeLinecap="round"
            />
            <circle cx="78" cy="22" r="3" fill="#0284C7" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-900 leading-none">
            Nildo Queiroz
          </h2>
          <p className="text-[9px] uppercase font-bold tracking-[0.22em] text-slate-500 mt-1">
            Tecnologia e Design
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <IconQ />
      <div>
        <span className="text-lg font-black tracking-tight text-foreground block leading-tight">
          Nildo <span className="text-amber-500">Queiroz</span>
        </span>
        <span className="text-[9px] uppercase font-bold text-foreground/50 tracking-[0.18em] block">
          Tecnologia & Design
        </span>
      </div>
    </div>
  );
}
