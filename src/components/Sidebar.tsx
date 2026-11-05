"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  FileText,
  DollarSign,
  ShieldCheck,
  Home,
  CheckCircle2,
  Phone,
  Award,
  Sun,
  Moon,
} from "lucide-react";
import Image from "next/image"; // 1. Importe o Image do Next
import logoImg from "../../public/assets/logo2_white.png"; // 2. Importe o arquivo da logo

export function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted
    ? (theme === "dark" ||
       (theme === "system" && resolvedTheme === "dark") ||
       (typeof document !== "undefined" &&
        document.documentElement.classList.contains("dark")))
    : false;

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);
    if (typeof document !== "undefined") {
      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  const navItems = [
    {
      name: "Início",
      href: "/",
      icon: Home,
    },
    {
      name: "Ordem de Serviço (OS)",
      href: "/os",
      icon: FileText,
      badge: "Entrada",
    },
    {
      name: "Orçamento Comercial",
      href: "/orcamento",
      icon: DollarSign,
      badge: "Proposta",
    },
    {
      name: "Certificado de Garantia",
      href: "/garantia",
      icon: ShieldCheck,
      badge: "Termo",
    },
  ];

  return (
    <aside
      id="app-sidebar"
      className="
        fixed left-0 top-16 bottom-0 z-50
        w-64
        -translate-x-full
        bg-panel backdrop-blur-xl shadow-soft
        border-r border-border
        transition-all duration-300 ease-out
        flex flex-col

        lg:static lg:top-auto lg:bottom-auto
        lg:h-[calc(100vh-2rem)] lg:my-4 lg:ml-4 lg:rounded-[24px] lg:border 
        lg:w-64 lg:translate-x-0
      "
    >
      {/* Topo / Logo */}
      <div className="flex items-center justify-center px-6 h-20 shrink-0 border-b border-border/50">
        <Image
          src={logoImg}
          alt="Logo Nildo Queiroz"
          width={180} // Ajuste o tamanho conforme a necessidade do seu layout
          height={50}
          className="object-contain" // Mantém a proporção da imagem
          priority // Prioriza o carregamento da logo
        />
      </div>

      {/* Navegação */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-2">
          <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest px-2">
            Módulos Técnicos
          </p>
        </div>
        <ul className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 mx-3 font-medium rounded-[16px] transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/25 font-bold"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  <div className="flex items-center">
                    <Icon
                      className={`w-5 h-5 mr-3 ${
                        isActive ? "text-white" : "opacity-80"
                      }`}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-border text-foreground/60"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Rodapé do Menu com Contato Oficial */}
      <div className="p-4 shrink-0 border-t border-border/50">
        <div className="p-3.5 rounded-[18px] bg-primary/5 border border-primary/15 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 text-primary font-bold">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Nildo Queiroz</span>
          </div>
          <p className="text-[10px] text-foreground/60 font-medium">
            Tecnólogo em Gestão de TI • +15 anos de Experiência
          </p>
          <div className="flex items-center gap-1.5 pt-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
            <Phone className="w-3.5 h-3.5" />
            <span>(71) 99226-5250</span>
          </div>
        </div>

        {/* Alternador de Tema na Sidebar */}
        <button
          type="button"
          onClick={toggleTheme}
          className="w-full mt-3 flex items-center justify-between px-3.5 py-2.5 rounded-[16px] bg-background border border-border/80 hover:border-primary text-xs font-semibold text-foreground hover:bg-primary/10 transition-all cursor-pointer shadow-sm group"
          title="Alternar tema claro/escuro"
        >
          <div className="flex items-center gap-2">
            {mounted && isDark ? (
              <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 dark:text-amber-400 group-hover:-rotate-12 transition-transform" />
            )}
            <span className="text-[11px] font-bold">
              {mounted && isDark ? "Modo Escuro" : "Modo Claro"}
            </span>
          </div>
          <span className="text-[10px] uppercase font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
            Trocar
          </span>
        </button>
      </div>
    </aside>
  );
}
