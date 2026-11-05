"use client";

import { Menu, Moon, Sun, X, ShieldCheck, Phone } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Topbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();

  const [menuAberto, setMenuAberto] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const abrirMenu = () => {
    const sidebar = document.getElementById("app-sidebar");
    if (!sidebar) return;

    sidebar.classList.remove("-translate-x-full");
    sidebar.classList.add("translate-x-0");
    setMenuAberto(true);
  };

  const fecharMenu = () => {
    const sidebar = document.getElementById("app-sidebar");
    if (!sidebar) return;

    sidebar.classList.remove("translate-x-0");
    sidebar.classList.add("-translate-x-full");
    setMenuAberto(false);
  };

  const toggleMenu = () => {
    if (menuAberto) {
      fecharMenu();
    } else {
      abrirMenu();
    }
  };

  useEffect(() => {
    fecharMenu();
  }, [pathname]);

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

  const getPageTitle = () => {
    if (pathname === "/os") return "Ordem de Serviço";
    if (pathname === "/orcamento") return "Orçamento Comercial";
    if (pathname === "/garantia") return "Certificado de Garantia";
    return "Central de Atendimento Técnico";
  };

  return (
    <>
      {menuAberto && (
        <div
          className="fixed inset-0 top-16 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={fecharMenu}
        />
      )}

      {/* Topbar com design flutuante no desktop */}
      <header className="h-[72px] lg:h-auto lg:my-4 lg:pr-4 flex items-center justify-between px-4 lg:px-0 relative z-[60] w-full max-w-[100vw]">
        <div className="w-full h-full lg:h-16 bg-panel lg:rounded-[24px] border-b lg:border border-border/50 lg:shadow-soft flex items-center justify-between px-4 xl:px-6 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleMenu}
              className="lg:hidden p-2 text-foreground/80 hover:bg-primary/10 hover:text-primary rounded-[14px] transition-all duration-300 cursor-pointer"
              aria-label="Abrir menu"
            >
              {menuAberto ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-bold text-foreground">
                {getPageTitle()}
              </span>
              <span className="hidden md:inline-block text-xs text-foreground/40 font-medium">
                • Gestão Técnica de TI
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/5571992265250"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(71) 99226-5250</span>
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-background border-2 border-border/80 hover:border-primary text-foreground shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer group"
              title={isDark ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
              aria-label="Alternar tema claro/escuro"
            >
              {mounted && isDark ? (
                <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600 dark:text-amber-400 group-hover:-rotate-12 transition-transform" />
              )}
            </button>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Nildo Queiroz</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
