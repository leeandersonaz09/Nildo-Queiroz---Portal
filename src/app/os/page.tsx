"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Monitor,
  ShieldCheck,
  AlertTriangle,
  ClipboardList,
  Package,
  Hash,
  Phone,
  MapPin,
  RotateCcw,
  Sparkles,
  Eye,
  Edit3,
} from "lucide-react";
import PrintButton from "@/components/print-button";
//import { Logo } from "@/components/Logo";
import Image from "next/image"; // 1. Importe o Image do Next
import logoImg from "../../../public/assets/logo2_white.png"; // 2. Importe o arquivo da logo


interface DadosOS {
  numero_os: string;
  data_entrada: string;
  cliente_nome: string;
  cliente_documento: string;
  cliente_telefone: string;
  cliente_bairro: string;
  tipo_equipamento: string;
  marca_modelo: string;
  numero_serie: string;
  senha_equipamento: string;
  acessorios_deixados: string;
  estado_fisico: string;
  defeito_relatado: string;
  prioridade: "baixa" | "normal" | "alta";
  status: string;
  tecnico_responsavel: string;
  atendente: string;
  link_fotos: string;
  empresa_nome: string;
  empresa_telefone: string;
  empresa_email: string;
  empresa_cnpj: string;
  empresa_endereco: string;
}

const dadosPadrao: DadosOS = {
  numero_os: "1052",
  data_entrada: "05/11/2026, 12:00",
  cliente_nome: "Maria Oliveira da Silva",
  cliente_documento: "034.892.115-09",
  cliente_telefone: "(71) 98765-4321",
  cliente_bairro: "Pituba, Salvador - BA",
  tipo_equipamento: "Notebook",
  marca_modelo: "Dell Inspiron 15 3000",
  numero_serie: "BR-5892019-J",
  senha_equipamento: "123456",
  acessorios_deixados: "Carregador original Dell e capa protetora preta",
  estado_fisico: "Marcas leves de uso na carcaça, tela íntegra sem trincados",
  defeito_relatado:
    "Aparelho liga, ventoinha gira em alta velocidade por alguns segundos, mas não dá vídeo na tela. Cliente relata que começou após queda de energia no escritório.",
  prioridade: "normal",
  status: "pendente",
  tecnico_responsavel: "Nildo Queiroz",
  atendente: "Nildo Queiroz",
  link_fotos: "",
  empresa_nome: "Nildo Queiroz - Tecnologia e Design",
  empresa_telefone: "(71) 99226-5250",
  empresa_email: "contato@nildoqueiroz.com.br",
  empresa_cnpj: "Salvador - BA",
  empresa_endereco: "Salvador - Bahia • Atendimento Especializado",
};

/* ================================================================
   COMPONENTE DE CONTEÚDO A4 — reutilizado na preview e impressão
   ================================================================ */
function FolhaOS({ dados }: { dados: DadosOS }) {
  return (
    <div className="flex flex-col h-full bg-white text-gray-900">
      {/* CABEÇALHO */}
      <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-4">
        <div>
          <Image
            src={logoImg}
            alt="Logo Nildo Queiroz"
            width={180} // Ajuste o tamanho conforme a necessidade do seu layout
            height={50}
            className="object-contain" // Mantém a proporção da imagem
            priority // Prioriza o carregamento da logo
          />
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] mt-2">
            Assistência Técnica Especializada em PCs e Notebooks
          </p>
          <div className="mt-1 text-[9px] text-gray-500 space-y-0.5">
            <p>
              {dados.empresa_endereco} | WhatsApp: {dados.empresa_telefone}
            </p>
            <p>
              Técnico Responsável: {dados.tecnico_responsavel} • Tecnólogo em
              Gestão de TI
            </p>
          </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <div className="border-2 border-slate-900 p-2.5 rounded-xl min-w-[140px] text-center bg-slate-50">
            <p className="text-[9px] uppercase font-black text-slate-800">
              Ordem de Serviço
            </p>
            <p className="text-3xl font-black text-slate-900">
              #{dados.numero_os}
            </p>
          </div>
          <p
            className="text-[9px] mt-1.5 font-bold text-gray-500 uppercase italic"
            suppressHydrationWarning
          >
            Entrada: {dados.data_entrada}
          </p>
        </div>
      </div>

      {/* GRID CLIENTE E EQUIPAMENTO */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="border border-gray-300 rounded-xl p-3.5 relative overflow-hidden bg-gray-50/50">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500"></div>
          <h3 className="text-[10px] font-black text-black uppercase mb-2 flex items-center gap-1.5">
            <User size={12} className="text-amber-600" /> Identificação do
            Cliente
          </h3>
          <div className="space-y-1 text-xs">
            <p className="font-bold text-gray-900">
              {dados.cliente_nome || "Nome não informado"}
            </p>
            <p className="text-gray-600 text-[11px]">
              Doc:{" "}
              <span className="font-medium text-black">
                {dados.cliente_documento || "Não informado"}
              </span>
            </p>
            <p className="text-gray-600 text-[11px]">
              Telefone:{" "}
              <span className="font-medium text-black">
                {dados.cliente_telefone || "Não informado"}
              </span>
            </p>
            <p className="text-gray-600 text-[11px]">
              Endereço:{" "}
              <span className="font-medium text-black">
                {dados.cliente_bairro || "Salvador - BA"}
              </span>
            </p>
          </div>
        </div>

        <div className="border border-gray-300 rounded-xl p-3.5 relative overflow-hidden bg-gray-50/50">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-900"></div>
          <h3 className="text-[10px] font-black text-black uppercase mb-2 flex items-center gap-1.5">
            <Monitor size={12} className="text-slate-800" /> Dados do
            Equipamento
          </h3>
          <div className="space-y-1 text-xs">
            <p className="font-bold uppercase text-gray-900">
              {dados.marca_modelo || "Modelo não informado"}
            </p>
            <p className="text-gray-600 text-[11px]">
              Tipo:{" "}
              <span className="font-medium text-black">
                {dados.tipo_equipamento}
              </span>
            </p>
            <p className="text-gray-600 text-[11px]">
              S/N:{" "}
              <span className="font-medium text-black">
                {dados.numero_serie || "Não identificado"}
              </span>
            </p>
            <div className="mt-1 p-1.5 bg-amber-50 border border-amber-200 rounded text-[10px] text-amber-800 font-mono">
              <b>Senha:</b> {dados.senha_equipamento || "NÃO INFORMADA"}
            </div>
          </div>
        </div>
      </div>

      {/* DEFEITO RELATADO */}
      <div className="bg-red-50/40 border border-red-200 rounded-xl p-3.5 mb-4">
        <h3 className="text-[10px] font-black text-red-700 uppercase mb-1.5 flex items-center gap-1.5">
          <AlertTriangle size={12} /> Defeito Relatado / Sintomas
        </h3>
        <p className="text-xs text-gray-800 leading-relaxed italic whitespace-pre-wrap">
          &quot;
          {dados.defeito_relatado || "Nenhum sintoma detalhado informado."}
          &quot;
        </p>
      </div>

      {/* ESTADO FÍSICO E ACESSÓRIOS */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="border border-gray-200 rounded-xl p-3 bg-white">
          <h4 className="text-[9px] font-black uppercase text-gray-500 mb-1 flex items-center gap-1">
            <ClipboardList size={11} /> Estado Físico
          </h4>
          <p className="text-[11px] text-gray-800">
            {dados.estado_fisico || "Sem avarias aparentes na entrada."}
          </p>
        </div>
        <div className="border border-gray-200 rounded-xl p-3 bg-white">
          <h4 className="text-[9px] font-black uppercase text-gray-500 mb-1 flex items-center gap-1">
            <Package size={11} /> Acessórios Deixados
          </h4>
          <p className="text-[11px] text-gray-800">
            {dados.acessorios_deixados || "Nenhum acessório acompanhando."}
          </p>
        </div>
      </div>

      {/* INFORMAÇÕES DE CONTROLE */}
      <div className="grid grid-cols-3 gap-3 border-t border-gray-200 pt-3 mb-4 text-center">
        <div className="p-2 bg-gray-50 rounded-lg">
          <p className="text-[8px] font-black uppercase text-gray-400">
            Prioridade
          </p>
          <p className="text-xs font-bold uppercase text-gray-800">
            {dados.prioridade}
          </p>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg">
          <p className="text-[8px] font-black uppercase text-gray-400">
            Técnico Responsável
          </p>
          <p className="text-xs font-bold text-gray-800">
            {dados.tecnico_responsavel}
          </p>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg">
          <p className="text-[8px] font-black uppercase text-gray-400">
            Atendente
          </p>
          <p className="text-xs font-bold text-gray-800">{dados.atendente}</p>
        </div>
      </div>

      {/* TERMOS E ASSINATURAS */}
      <div className="mt-auto pt-3 border-t-2 border-gray-200">
        <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-[8.5px] text-gray-600 leading-tight text-justify">
          <p className="font-bold uppercase text-gray-800 mb-1">
            Termos e Condições - Nildo Queiroz Tecnologia e Design:
          </p>
          1. Não nos responsabilizamos pela perda de dados ou arquivos contidos
          no equipamento, sendo recomendada a realização de backup prévio pelo
          cliente. 2. O orçamento formal tem validade de 5 dias úteis a partir
          da emissão. 3. Equipamentos não retirados em até 90 dias após aviso
          formal serão considerados abandonados (Art. 644 do Código Civil). 4. A
          garantia legal de 90 dias cobre exclusivamente os serviços executados
          e peças substituídas fornecidas pelo técnico.
        </div>

        <div className="grid grid-cols-2 gap-16 mt-8 mb-2">
          <div className="text-center">
            <div className="border-t border-black pt-1">
              <p className="text-[9px] font-black uppercase text-gray-900">
                Assinatura do Cliente
              </p>
              <p className="text-[8px] text-gray-500">{dados.cliente_nome}</p>
            </div>
          </div>
          <div className="text-center">
            <div className="border-t border-black pt-1">
              <p className="text-[9px] font-black uppercase text-gray-900">
                Nildo Queiroz
              </p>
              <p className="text-[8px] text-gray-500">Técnico Responsável</p>
            </div>
          </div>
        </div>

        <p className="text-[7.5px] text-center text-gray-400 uppercase tracking-widest mt-3">
          Nildo Queiroz • Tecnologia e Design • Salvador - Bahia • (71)
          99226-5250
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   PÁGINA PRINCIPAL
   ================================================================ */
export default function OSPage() {
  const [dados, setDados] = useState<DadosOS>(dadosPadrao);
  const [modoVisualizacao, setModoVisualizacao] = useState<
    "formulario" | "preview"
  >("formulario");
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nildo_queiroz_os_dados");
      if (saved) {
        setDados(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const atualizarCampo = (campo: keyof DadosOS, valor: string) => {
    setDados((prev) => {
      const novo = { ...prev, [campo]: valor };
      try {
        localStorage.setItem("nildo_queiroz_os_dados", JSON.stringify(novo));
      } catch (e) {
        console.error(e);
      }
      return novo;
    });
  };

  const limparFormulario = () => {
    const limpo: DadosOS = {
      numero_os: Math.floor(1000 + Math.random() * 9000).toString(),
      data_entrada: new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date()),
      cliente_nome: "",
      cliente_documento: "",
      cliente_telefone: "",
      cliente_bairro: "Salvador - BA",
      tipo_equipamento: "Notebook",
      marca_modelo: "",
      numero_serie: "",
      senha_equipamento: "",
      acessorios_deixados: "",
      estado_fisico: "",
      defeito_relatado: "",
      prioridade: "normal",
      status: "pendente",
      tecnico_responsavel: "Nildo Queiroz",
      atendente: "Nildo Queiroz",
      link_fotos: "",
      empresa_nome: "Nildo Queiroz - Tecnologia e Design",
      empresa_telefone: "(71) 99226-5250",
      empresa_email: "contato@nildoqueiroz.com.br",
      empresa_cnpj: "Salvador - BA",
      empresa_endereco: "Salvador - Bahia • Atendimento Especializado",
    };
    setDados(limpo);
    try {
      localStorage.setItem("nildo_queiroz_os_dados", JSON.stringify(limpo));
    } catch (e) {}
  };

  const preencherExemplo = () => {
    setDados(dadosPadrao);
    try {
      localStorage.setItem("nildo_queiroz_os_dados", JSON.stringify(dadosPadrao));
    } catch (e) {}
  };

  const nomeArquivoPDF = `OS_${dados.numero_os}_${(
    dados.cliente_nome || "Cliente"
  ).replace(/\s+/g, "_")}`;

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-500">
      {/* Barra Superior de Ações */}
      <div className="no-print flex flex-col md:flex-row md:items-center justify-between gap-4 bg-panel p-4 md:p-6 rounded-[28px] border border-border shadow-soft">
        <div className="flex items-center gap-4">
          <Link href="/">
            <button className="p-3 bg-background border border-border/80 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all active:scale-90 shadow-sm cursor-pointer">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-500">
                Atendimento Técnico
              </span>
              <span className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold px-2 py-0.5 rounded-full">
                OS #{dados.numero_os}
              </span>
            </div>
            <h1 className="text-2xl font-black text-foreground">
              Ordem de Serviço
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Alternador de visualização */}
          <div className="flex bg-background p-1 rounded-2xl border border-border">
            <button
              type="button"
              onClick={() => setModoVisualizacao("formulario")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                modoVisualizacao === "formulario"
                  ? "bg-primary text-white shadow-md"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>Formulário</span>
            </button>
            <button
              type="button"
              onClick={() => setModoVisualizacao("preview")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                modoVisualizacao === "preview"
                  ? "bg-primary text-white shadow-md"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Ver Folha A4</span>
            </button>
          </div>

          <button
            type="button"
            onClick={preencherExemplo}
            className="px-3.5 py-2.5 rounded-2xl border border-border bg-background hover:bg-primary/10 hover:text-primary text-foreground/80 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Preencher com dados de exemplo"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="hidden sm:inline">Exemplo</span>
          </button>

          <button
            type="button"
            onClick={limparFormulario}
            className="px-3.5 py-2.5 rounded-2xl border border-border bg-background hover:bg-red-500/10 hover:text-red-500 text-foreground/80 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Limpar todos os campos"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Limpar</span>
          </button>

          <PrintButton
            contentRef={componentRef}
            documentTitle={nomeArquivoPDF}
          />
        </div>
      </div>

      {/* Conteúdo: Duas Colunas (Editor e Preview) */}
      <div className="no-print grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Formulário (Lado Esquerdo) */}
        <div
          className={`space-y-6 xl:col-span-6 ${
            modoVisualizacao === "preview" ? "hidden xl:block" : ""
          }`}
        >
          {/* Identificação do Cliente */}
          <div className="bg-panel p-6 rounded-[28px] border border-border shadow-soft space-y-4">
            <h2 className="text-sm font-black flex items-center gap-2 text-blue-600 uppercase tracking-wider">
              <User className="w-4 h-4" /> 1. Identificação do Cliente
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">
                  Nome Completo / Razão Social *
                </label>
                <input
                  type="text"
                  value={dados.cliente_nome}
                  onChange={(e) =>
                    atualizarCampo("cliente_nome", e.target.value)
                  }
                  placeholder="Ex: Maria Oliveira"
                  className="w-full p-3 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">
                  CPF / CNPJ
                </label>
                <input
                  type="text"
                  value={dados.cliente_documento}
                  onChange={(e) =>
                    atualizarCampo("cliente_documento", e.target.value)
                  }
                  placeholder="000.000.000-00"
                  className="w-full p-3 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">
                  Telefone / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3.5 text-foreground/40" />
                  <input
                    type="text"
                    value={dados.cliente_telefone}
                    onChange={(e) =>
                      atualizarCampo("cliente_telefone", e.target.value)
                    }
                    placeholder="(71) 90000-0000"
                    className="w-full p-3 pl-10 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">
                  Endereço / Bairro / Cidade
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3.5 text-foreground/40" />
                  <input
                    type="text"
                    value={dados.cliente_bairro}
                    onChange={(e) =>
                      atualizarCampo("cliente_bairro", e.target.value)
                    }
                    placeholder="Bairro, Salvador - BA"
                    className="w-full p-3 pl-10 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dados do Equipamento */}
          <div className="bg-panel p-6 rounded-[28px] border border-border shadow-soft space-y-4">
            <h2 className="text-sm font-black flex items-center gap-2 text-purple-600 uppercase tracking-wider">
              <Monitor className="w-4 h-4" /> 2. Dados do Equipamento
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">
                  Tipo
                </label>
                <select
                  value={dados.tipo_equipamento}
                  onChange={(e) =>
                    atualizarCampo("tipo_equipamento", e.target.value)
                  }
                  className="w-full p-3 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                >
                  <option value="Notebook">Notebook</option>
                  <option value="Desktop / Gamer">Desktop / Gamer</option>
                  <option value="MacBook / iMac">MacBook / iMac</option>
                  <option value="Monitor">Monitor</option>
                  <option value="Servidor">Servidor</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">
                  Marca / Modelo *
                </label>
                <input
                  type="text"
                  value={dados.marca_modelo}
                  onChange={(e) =>
                    atualizarCampo("marca_modelo", e.target.value)
                  }
                  placeholder="Ex: Dell Inspiron 15"
                  className="w-full p-3 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">
                  Número de Série (S/N) / TAG
                </label>
                <div className="relative">
                  <Hash className="w-4 h-4 absolute left-3 top-3.5 text-foreground/40" />
                  <input
                    type="text"
                    value={dados.numero_serie}
                    onChange={(e) =>
                      atualizarCampo("numero_serie", e.target.value)
                    }
                    placeholder="S/N ou Service Tag"
                    className="w-full p-3 pl-10 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-red-500 uppercase ml-1">
                  Senha de Acesso (PIN/Windows)
                </label>
                <div className="relative">
                  <ShieldCheck className="w-4 h-4 absolute left-3 top-3.5 text-red-400" />
                  <input
                    type="text"
                    value={dados.senha_equipamento}
                    onChange={(e) =>
                      atualizarCampo("senha_equipamento", e.target.value)
                    }
                    placeholder="Senha de login"
                    className="w-full p-3 pl-10 mt-1 rounded-xl border border-red-200 dark:border-red-900/40 bg-background outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">
                  Acessórios Deixados
                </label>
                <div className="relative">
                  <Package className="w-4 h-4 absolute left-3 top-3.5 text-foreground/40" />
                  <input
                    type="text"
                    value={dados.acessorios_deixados}
                    onChange={(e) =>
                      atualizarCampo("acessorios_deixados", e.target.value)
                    }
                    placeholder="Ex: Carregador, mouse, capa protetora..."
                    className="w-full p-3 pl-10 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">
                  Estado Físico / Detalhes Visuais
                </label>
                <input
                  type="text"
                  value={dados.estado_fisico}
                  onChange={(e) =>
                    atualizarCampo("estado_fisico", e.target.value)
                  }
                  placeholder="Ex: Riscos na tampa, sem parafusos na base, etc."
                  className="w-full p-3 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                />
              </div>
            </div>
          </div>

          {/* Defeito */}
          <div className="bg-panel p-6 rounded-[28px] border border-border shadow-soft space-y-4">
            <h2 className="text-sm font-black flex items-center gap-2 text-red-600 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" /> 3. Defeito Relatado pelo Cliente
            </h2>
            <textarea
              rows={4}
              value={dados.defeito_relatado}
              onChange={(e) =>
                atualizarCampo("defeito_relatado", e.target.value)
              }
              placeholder="Descreva detalhadamente o problema relatado..."
              className="w-full p-4 rounded-2xl border border-border bg-background outline-none focus:ring-2 focus:ring-red-500 text-sm leading-relaxed"
            />
          </div>

          {/* Controle Interno */}
          <div className="bg-panel p-6 rounded-[28px] border border-border shadow-soft space-y-4">
            <h2 className="text-sm font-black flex items-center gap-2 text-emerald-600 uppercase tracking-wider">
              <ClipboardList className="w-4 h-4" /> 4. Controle Interno
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">
                  Nº da OS
                </label>
                <input
                  type="text"
                  value={dados.numero_os}
                  onChange={(e) =>
                    atualizarCampo("numero_os", e.target.value)
                  }
                  className="w-full p-3 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary text-sm font-black"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">
                  Data de Entrada
                </label>
                <input
                  type="text"
                  value={dados.data_entrada}
                  onChange={(e) =>
                    atualizarCampo("data_entrada", e.target.value)
                  }
                  className="w-full p-3 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">
                  Prioridade
                </label>
                <select
                  value={dados.prioridade}
                  onChange={(e) =>
                    atualizarCampo(
                      "prioridade",
                      e.target.value as DadosOS["prioridade"]
                    )
                  }
                  className="w-full p-3 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary text-sm font-bold"
                >
                  <option value="baixa">Baixa (5 dias)</option>
                  <option value="normal">Normal (3 dias)</option>
                  <option value="alta">Alta / Urgente (24h)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">
                  Técnico Responsável
                </label>
                <input
                  type="text"
                  value={dados.tecnico_responsavel}
                  onChange={(e) =>
                    atualizarCampo("tecnico_responsavel", e.target.value)
                  }
                  className="w-full p-3 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">
                  Status
                </label>
                <select
                  value={dados.status}
                  onChange={(e) => atualizarCampo("status", e.target.value)}
                  className="w-full p-3 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary text-sm font-bold"
                >
                  <option value="pendente">Pendente</option>
                  <option value="em_orcamento">Em Orçamento</option>
                  <option value="em_andamento">Em Andamento</option>
                  <option value="concluido">Concluído</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Pré-visualização da Folha A4 */}
        <div
          className={`xl:col-span-6 space-y-4 ${
            modoVisualizacao === "formulario" ? "hidden xl:block" : ""
          }`}
        >
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-black uppercase tracking-wider text-foreground/60">
              Folha Oficial A4 (Visualização)
            </span>
            <span className="text-[11px] text-foreground/40 font-medium">
              Pronta para imprimir
            </span>
          </div>

          <div className="border border-border/70 shadow-xl rounded-[2.5rem] bg-gray-100 dark:bg-gray-900 p-8 flex flex-col items-center overflow-hidden">
            <p className="text-center text-[10px] text-foreground/50 mb-6 uppercase font-black tracking-widest">
              Pré-visualização da Impressão
            </p>
            <div
              className="relative w-full flex justify-center"
              style={{ height: "620px" }}
            >
              <div
                className="bg-white shadow-2xl origin-top absolute top-0 text-black transition-all"
                style={{
                  transform: "scale(0.55)",
                  width: "210mm",
                  height: "297mm",
                  padding: "15mm",
                }}
              >
                <FolhaOS dados={dados} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ÁREA DE IMPRESSÃO (OCULTA) */}
      <div className="hidden print:block">
        <div
          ref={componentRef}
          className="print-area bg-white text-gray-900"
          style={{
            width: "210mm",
            height: "297mm",
            maxHeight: "297mm",
            padding: "15mm",
            overflow: "hidden",
            boxSizing: "border-box",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <FolhaOS dados={dados} />
        </div>
      </div>
    </div>
  );
}
