"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  User,
  Monitor,
  Calendar,
  Hash,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Eye,
  Edit3,
} from "lucide-react";
import PrintButton from "@/components/print-button";
//import { Logo } from "@/components/Logo";
import Image from "next/image"; // 1. Importe o Image do Next
import logoImg from "../../../public/assets/logo2_white.png"; // 2. Importe o arquivo da logo

interface DadosGarantia {
  numero_os: string;
  cliente_nome: string;
  cliente_documento: string;
  equipamento_modelo: string;
  data_entrega: string;
  prazo_dias: string;
  tecnico_responsavel: string;
  texto_termo: string;
}

const termoPadrao = `1. COBERTURA DA GARANTIA: Nildo Queiroz - Tecnologia e Design assegura a garantia legal de 90 (noventa) dias, em estrita conformidade com o Art. 26, inciso II, da Lei nº 8.078/1990 (Código de Defesa do Consumidor), aplicável aos serviços técnicos executados e às peças novas fornecidas e instaladas descritas na respectiva Ordem de Serviço.

2. INÍCIO DA VIGÊNCIA: O prazo de garantia passa a vigorar a partir da data de entrega do equipamento e assinatura do presente termo pelo cliente ou seu representante devidamente identificado.

3. HIPÓTESES DE EXCLUSÃO DA GARANTIA: A garantia perderá sua validade nas seguintes hipóteses:
   a) Rompimento, rasura ou violação dos lacres de segurança apostos no equipamento;
   b) Quedas, impactos físicos, amassados, umidade, oxidação, derramamento de líquidos ou exposição a agentes nocivos;
   c) Sobretensão na rede elétrica, descargas atmosféricas (raios), curto-circuito ou uso de fontes e carregadores incompatíveis;
   d) Intervenção técnica, desmontagem ou tentativa de reparo realizada por terceiros não autorizados por Nildo Queiroz;
   e) Contaminação por malwares/vírus, mau uso do sistema operacional ou alterações indevidas de firmware/BIOS pelo usuário.

4. DADOS E BACKUP: A garantia cobre estritamente o reparo de hardware e mão de obra dos serviços executados. A integridade de dados e arquivos pessoais/profissionais é de responsabilidade exclusiva do cliente.

5. RETIRADA E ABANDONO: Equipamentos concluídos não retirados em até 90 dias após aviso formal serão considerados abandonados, nos termos do Art. 644 do Código Civil Brasileiro.`;

const dadosPadraoGarantia: DadosGarantia = {
  numero_os: "1052",
  cliente_nome: "Maria Oliveira da Silva",
  cliente_documento: "034.892.115-09",
  equipamento_modelo: "Dell Inspiron 15 3000",
  data_entrega: "05/11/2026",
  prazo_dias: "90 dias",
  tecnico_responsavel: "Nildo Queiroz",
  texto_termo: termoPadrao,
};

/* ================================================================
   COMPONENTE A4 DA GARANTIA
   ================================================================ */
function FolhaGarantia({ dados }: { dados: DadosGarantia }) {
  return (
    <div className="flex flex-col h-full bg-white text-black">
      {/* CABEÇALHO */}
      <div className="flex justify-between items-center border-b-2 border-slate-900 pb-4 mb-4">
        <div>
          <Image
            src={logoImg}
            alt="Logo Nildo Queiroz"
            width={180} // Ajuste o tamanho conforme a necessidade do seu layout
            height={50}
            className="object-contain" // Mantém a proporção da imagem
            priority // Prioriza o carregamento da logo
          />
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">
           Garantia de serviços prestados e peças fornecidas • Salvador/BA
          </p>
          <p className="text-[9px] text-gray-500 font-bold tracking-widest mt-2">
            Assistência Técnica em PCs & Notebooks • Salvador/BA
          </p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
            CERTIFICADO DE GARANTIA
          </h2>
          <p className="text-[9px] text-amber-600 uppercase font-black tracking-widest mt-1">
            Garantia Legal • CDC Art. 26
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* DADOS DO SERVIÇO */}
        <div className="mb-4 p-4 border border-gray-300 rounded-xl bg-gray-50/50 shrink-0">
          <p className="text-[9px] font-black text-slate-800 uppercase mb-3 tracking-widest">
            Dados do Serviço e Entrega
          </p>
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs text-gray-800">
            <p>
              <b className="font-black">Cliente:</b>{" "}
              {dados.cliente_nome ? (
                <span className="ml-1 font-medium">{dados.cliente_nome}</span>
              ) : (
                <span className="inline-block border-b border-gray-400 w-56 ml-1"></span>
              )}
            </p>
            <p>
              <b className="font-black">OS Nº:</b>{" "}
              {dados.numero_os ? (
                <span className="ml-1 font-medium">#{dados.numero_os}</span>
              ) : (
                <span className="inline-block border-b border-gray-400 w-24 ml-1"></span>
              )}
            </p>
            <p>
              <b className="font-black">Equipamento:</b>{" "}
              {dados.equipamento_modelo ? (
                <span className="ml-1 font-medium">
                  {dados.equipamento_modelo}
                </span>
              ) : (
                <span className="inline-block border-b border-gray-400 w-48 ml-1"></span>
              )}
            </p>
            <p>
              <b className="font-black">Data de Entrega:</b>{" "}
              <span className="ml-1 font-medium" suppressHydrationWarning>
                {dados.data_entrega}
              </span>
            </p>
          </div>
        </div>

        {/* CLÁUSULAS */}
        <div className="flex-1 mt-2">
          <h4 className="text-xs font-black mb-2 uppercase border-b-2 border-gray-100 pb-1 text-gray-800">
            Cláusulas e Condições Gerais da Garantia
          </h4>
          <div className="text-[10.5px] leading-snug text-justify whitespace-pre-wrap text-gray-800 font-medium">
            {dados.texto_termo || "Nenhum termo configurado."}
          </div>
        </div>
      </div>

      {/* RODAPÉ E ASSINATURAS */}
      <div className="mt-4 pt-6 shrink-0">
        <div className="grid grid-cols-2 gap-20 px-8">
          <div className="text-center border-t-2 border-gray-800 pt-2">
            <p className="text-[9px] font-black uppercase text-gray-800">
              Assinatura do Técnico Responsável
            </p>
            <p className="text-[8px] font-bold text-gray-500 mt-0.5 uppercase">
              {dados.tecnico_responsavel} • Tecnólogo em Gestão de TI
            </p>
          </div>
          <div className="text-center border-t-2 border-gray-800 pt-2">
            <p className="text-[9px] font-black uppercase text-gray-800">
              Assinatura do Cliente
            </p>
            <p className="text-[8px] font-bold text-gray-400 mt-0.5 uppercase">
              Ciente e de Acordo
            </p>
          </div>
        </div>
        <div className="mt-8 text-center border-t border-gray-100 pt-3">
          <p className="text-[7.5px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            Nildo Queiroz • Tecnologia e Design • Salvador/BA • WhatsApp (71)
            99226-5250
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   PÁGINA PRINCIPAL
   ================================================================ */
export default function GarantiaPage() {
  const [dados, setDados] = useState<DadosGarantia>(dadosPadraoGarantia);
  const [modoVisualizacao, setModoVisualizacao] = useState<"formulario" | "preview">("formulario");
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nildo_queiroz_garantia_dados");
      if (saved) setDados(JSON.parse(saved));
    } catch (e) { console.error(e); }
  }, []);

  const salvarDados = (novosDados: DadosGarantia) => {
    setDados(novosDados);
    try { localStorage.setItem("nildo_queiroz_garantia_dados", JSON.stringify(novosDados)); } catch (e) {}
  };

  const atualizarCampo = (campo: keyof DadosGarantia, valor: string) => {
    salvarDados({ ...dados, [campo]: valor });
  };

  const restaurarTermoPadrao = () => atualizarCampo("texto_termo", termoPadrao);

  const limparGarantia = () => {
    salvarDados({
      numero_os: "", cliente_nome: "", cliente_documento: "",
      equipamento_modelo: "",
      data_entrega: new Intl.DateTimeFormat("pt-BR").format(new Date()),
      prazo_dias: "90 dias", tecnico_responsavel: "Nildo Queiroz",
      texto_termo: termoPadrao,
    });
  };

  const preencherExemplo = () => salvarDados(dadosPadraoGarantia);

  const nomeArquivoPDF = `Garantia_OS_${dados.numero_os || "SN"}_${(dados.cliente_nome || "Cliente").replace(/\s+/g, "_")}`;

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-500">
      {/* Barra Superior */}
      <div className="no-print flex flex-col md:flex-row md:items-center justify-between gap-4 bg-panel p-4 md:p-6 rounded-[28px] border border-border shadow-soft">
        <div className="flex items-center gap-4">
          <Link href="/">
            <button className="p-3 bg-background border border-border/80 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all active:scale-90 shadow-sm cursor-pointer">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600">Certificação Oficial</span>
              <span className="text-xs bg-emerald-500/10 text-emerald-600 font-bold px-2 py-0.5 rounded-full">Termo de Garantia</span>
            </div>
            <h1 className="text-2xl font-black text-foreground">Certificado de Garantia</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex bg-background p-1 rounded-2xl border border-border">
            <button type="button" onClick={() => setModoVisualizacao("formulario")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${modoVisualizacao === "formulario" ? "bg-primary text-white shadow-md" : "text-foreground/70 hover:text-foreground"}`}>
              <Edit3 className="w-4 h-4" /><span>Formulário</span>
            </button>
            <button type="button" onClick={() => setModoVisualizacao("preview")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${modoVisualizacao === "preview" ? "bg-primary text-white shadow-md" : "text-foreground/70 hover:text-foreground"}`}>
              <Eye className="w-4 h-4" /><span>Ver Folha A4</span>
            </button>
          </div>

          <button type="button" onClick={preencherExemplo}
            className="px-3.5 py-2.5 rounded-2xl border border-border bg-background hover:bg-emerald-500/10 hover:text-emerald-500 text-foreground/80 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" /><span className="hidden sm:inline">Exemplo</span>
          </button>

          <button type="button" onClick={limparGarantia}
            className="px-3.5 py-2.5 rounded-2xl border border-border bg-background hover:bg-red-500/10 hover:text-red-500 text-foreground/80 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer">
            <RotateCcw className="w-3.5 h-3.5" /><span className="hidden sm:inline">Limpar</span>
          </button>

          <PrintButton contentRef={componentRef} documentTitle={nomeArquivoPDF} />
        </div>
      </div>

      {/* Grid Duas Colunas */}
      <div className="no-print grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Formulário */}
        <div className={`space-y-6 xl:col-span-6 ${modoVisualizacao === "preview" ? "hidden xl:block" : ""}`}>
          {/* Dados do Serviço e Entrega */}
          <div className="bg-panel p-6 rounded-[28px] border border-border shadow-soft space-y-4">
            <h2 className="text-sm font-black flex items-center gap-2 text-emerald-600 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> 1. Dados do Serviço e Entrega
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">Nº da Ordem de Serviço (OS)</label>
                <div className="relative">
                  <Hash className="w-4 h-4 absolute left-3 top-3.5 text-foreground/40" />
                  <input type="text" value={dados.numero_os} onChange={(e) => atualizarCampo("numero_os", e.target.value)} placeholder="Ex: 1052"
                    className="w-full p-3 pl-10 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-black" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">Data de Entrega</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-3.5 text-foreground/40" />
                  <input type="text" value={dados.data_entrega} onChange={(e) => atualizarCampo("data_entrega", e.target.value)}
                    className="w-full p-3 pl-10 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">Nome do Cliente / Razão Social</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3.5 text-foreground/40" />
                  <input type="text" value={dados.cliente_nome} onChange={(e) => atualizarCampo("cliente_nome", e.target.value)} placeholder="Ex: Maria Oliveira da Silva"
                    className="w-full p-3 pl-10 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">Equipamento / Marca / Modelo</label>
                <div className="relative">
                  <Monitor className="w-4 h-4 absolute left-3 top-3.5 text-foreground/40" />
                  <input type="text" value={dados.equipamento_modelo} onChange={(e) => atualizarCampo("equipamento_modelo", e.target.value)} placeholder="Ex: Dell Inspiron 15"
                    className="w-full p-3 pl-10 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">Técnico Responsável</label>
                <input type="text" value={dados.tecnico_responsavel} onChange={(e) => atualizarCampo("tecnico_responsavel", e.target.value)}
                  className="w-full p-3 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium" />
              </div>
            </div>
          </div>

          {/* Editor de Cláusulas */}
          <div className="bg-panel p-6 rounded-[28px] border border-border shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black flex items-center gap-2 text-blue-600 uppercase tracking-wider">
                <Edit3 className="w-4 h-4" /> 2. Cláusulas e Condições da Garantia
              </h2>
              <button type="button" onClick={restaurarTermoPadrao} className="text-xs text-primary hover:underline font-bold cursor-pointer">
                Restaurar Texto Padrão
              </button>
            </div>
            <textarea rows={12} value={dados.texto_termo} onChange={(e) => atualizarCampo("texto_termo", e.target.value)}
              className="w-full p-4 rounded-2xl border border-border bg-background outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-mono leading-relaxed" />
            <div className="p-4 bg-emerald-500/10 rounded-2xl flex gap-3 items-start border border-emerald-500/20">
              <AlertCircle className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" size={18} />
              <p className="text-xs text-emerald-900 dark:text-emerald-300 leading-relaxed">
                <b>Dica Legal (CDC Art. 26):</b> O direito de reclamar pelos vícios aparentes ou de fácil constatação caduca em 90 dias tratando-se de fornecimento de serviços e de produtos duráveis.
              </p>
            </div>
          </div>
        </div>

        {/* Pré-visualização A4 (ESCALADA) */}
        <div className={`xl:col-span-6 space-y-4 ${modoVisualizacao === "formulario" ? "hidden xl:block" : ""}`}>
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-black uppercase tracking-wider text-foreground/60">Certificado A4 (Visualização)</span>
            <span className="text-[11px] text-foreground/40 font-medium">Formato folha única</span>
          </div>
          <div className="border border-border/70 shadow-xl rounded-[2.5rem] bg-gray-100 dark:bg-gray-900 p-8 flex flex-col items-center overflow-hidden">
            <p className="text-center text-[10px] text-foreground/50 mb-6 uppercase font-black tracking-widest">
              Pré-visualização da Impressão
            </p>
            <div className="relative w-full flex justify-center" style={{ height: "620px" }}>
              <div className="bg-white shadow-2xl origin-top absolute top-0 text-black transition-all"
                style={{ transform: "scale(0.55)", width: "210mm", height: "297mm", padding: "15mm" }}>
                <FolhaGarantia dados={dados} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ÁREA DE IMPRESSÃO (OCULTA) */}
      <div className="hidden print:block">
        <div ref={componentRef} className="print-area bg-white text-black font-sans"
          style={{ width: "210mm", height: "297mm", maxHeight: "297mm", padding: "15mm", overflow: "hidden", boxSizing: "border-box", fontFamily: "Inter, sans-serif" }}>
          <FolhaGarantia dados={dados} />
        </div>
      </div>
    </div>
  );
}
