"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Cpu,
  DollarSign,
  Plus,
  Trash2,
  CreditCard,
  Sparkles,
  RotateCcw,
  Eye,
  Edit3,
  Hash,
} from "lucide-react";
import PrintButton from "@/components/print-button";
import { QRCodeSVG } from "qrcode.react";
//import { Logo } from "@/components/Logo";
import Image from "next/image"; // 1. Importe o Image do Next
import logoImg from "../../../public/assets/logo2_white.png"; // 2. Importe o arquivo da logo


interface ItemOrcamento {
  id: string;
  tipo: "Serviço" | "Peça";
  descricao: string;
  quantidade: number;
  valor_unitario: number;
}

interface DadosOrcamento {
  numero_orcamento: string;
  numero_os: string;
  data_proposta: string;
  cliente_nome: string;
  cliente_documento: string;
  cliente_telefone: string;
  equipamento_modelo: string;
  validade_dias: number;
  prazo_conclusao: string;
  condicoes_pagamento: string;
  pix_chave_ou_link: string;
  desconto: number;
  itens: ItemOrcamento[];
}

const dadosPadraoOrcamento: DadosOrcamento = {
  numero_orcamento: "2026-089",
  numero_os: "1052",
  data_proposta: "05/11/2026",
  cliente_nome: "Maria Oliveira da Silva",
  cliente_documento: "034.892.115-09",
  cliente_telefone: "(71) 98765-4321",
  equipamento_modelo: "Dell Inspiron 15 3000",
  validade_dias: 10,
  prazo_conclusao: "2 a 3 dias úteis",
  condicoes_pagamento: "Pix (chave celular), Cartão de Crédito ou Débito",
  pix_chave_ou_link: "71992265250",
  desconto: 30,
  itens: [
    { id: "1", tipo: "Serviço", descricao: "Diagnóstico avançado e reparo de circuito de alimentação da placa-mãe", quantidade: 1, valor_unitario: 280 },
    { id: "2", tipo: "Peça", descricao: "Memória RAM 16GB DDR4 3200MHz Kingston Fury", quantidade: 1, valor_unitario: 210 },
    { id: "3", tipo: "Serviço", descricao: "Limpeza interna preventiva com troca de pasta térmica de alta performance (SnowDog)", quantidade: 1, valor_unitario: 120 },
  ],
};

const formatarMoeda = (val: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val || 0);

/* ================================================================
   COMPONENTE A4 DO ORÇAMENTO (usado no preview e na impressão)
   ================================================================ */
function FolhaOrcamento({
  dados,
  subtotal,
  totalGeral,
}: {
  dados: DadosOrcamento;
  subtotal: number;
  totalGeral: number;
}) {
  return (
    <div className="flex flex-col h-full bg-white text-gray-900">
      {/* CABEÇALHO */}
      <div className="flex justify-between items-center border-b-4 border-slate-900 pb-4 mb-6 evitar-quebra">
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
            Proposta Comercial de Manutenção & Peças
          </p>
          <p className="text-[9px] text-gray-400 mt-0.5">
            WhatsApp: (71) 99226-5250 • Salvador - BA
          </p>
        </div>
        <div className="text-right">
          <div className="bg-slate-900 text-white p-2.5 rounded-xl min-w-[130px] text-center">
            <p className="text-[9px] uppercase font-bold tracking-wider text-amber-400">
              Orçamento Nº
            </p>
            <p className="text-2xl font-black">{dados.numero_orcamento}</p>
          </div>
          {dados.numero_os && (
            <p className="text-[10px] mt-1.5 font-bold text-gray-500 uppercase">
              Referente à OS #{dados.numero_os}
            </p>
          )}
        </div>
      </div>

      {/* CLIENTE E EQUIPAMENTO */}
      <div className="grid grid-cols-2 gap-4 mb-6 evitar-quebra">
        <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
          <h3 className="text-[10px] font-black text-gray-400 uppercase mb-1 flex items-center gap-1.5">
            <User size={12} className="text-amber-600" /> Cliente
          </h3>
          <p className="text-sm font-bold text-gray-900">
            {dados.cliente_nome || "Cliente não informado"}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            Tel: {dados.cliente_telefone || "Não informado"}
          </p>
        </div>
        <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
          <h3 className="text-[10px] font-black text-gray-400 uppercase mb-1 flex items-center gap-1.5">
            <Cpu size={12} className="text-slate-800" /> Equipamento
          </h3>
          <p className="text-sm font-bold uppercase text-gray-900">
            {dados.equipamento_modelo || "Modelo não informado"}
          </p>
          <p className="text-xs text-gray-500 mt-0.5" suppressHydrationWarning>
            Data da Proposta: {dados.data_proposta}
          </p>
        </div>
      </div>

      {/* TABELA DE ITENS */}
      <div className="flex-1 mb-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200 text-[9px] uppercase text-gray-500 font-black">
              <th className="py-2.5 px-2">Tipo</th>
              <th className="py-2.5 px-2">Descrição dos Serviços / Peças</th>
              <th className="py-2.5 px-2 text-center">Qtd</th>
              <th className="py-2.5 px-2 text-right">Valor Unit.</th>
              <th className="py-2.5 px-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {dados.itens.map((it) => (
              <tr key={it.id} className="border-b border-gray-100">
                <td className="py-2.5 px-2 font-bold text-amber-700 text-[11px]">
                  {it.tipo}
                </td>
                <td className="py-2.5 px-2 text-gray-800 text-[11px]">
                  {it.descricao || "Item sem descrição"}
                </td>
                <td className="py-2.5 px-2 text-center font-medium text-[11px]">
                  {it.quantidade}
                </td>
                <td className="py-2.5 px-2 text-right font-medium text-[11px]">
                  {formatarMoeda(it.valor_unitario)}
                </td>
                <td className="py-2.5 px-2 text-right font-bold text-gray-900 text-[11px]">
                  {formatarMoeda(
                    (Number(it.quantidade) || 0) *
                      (Number(it.valor_unitario) || 0),
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TOTAIS */}
      <div className="flex justify-end mb-6 evitar-quebra">
        <div className="w-60 space-y-1.5 text-xs">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal:</span>
            <span className="font-medium">{formatarMoeda(subtotal)}</span>
          </div>
          {dados.desconto > 0 && (
            <div className="flex justify-between text-red-500">
              <span>Desconto:</span>
              <span className="font-medium">
                - {formatarMoeda(dados.desconto)}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 border-t-2 border-gray-200 text-sm">
            <span className="font-black uppercase text-gray-900">
              Total da Proposta:
            </span>
            <span className="text-lg font-black text-slate-900">
              {formatarMoeda(totalGeral)}
            </span>
          </div>
        </div>
      </div>

      {/* PRAZOS E CONDIÇÕES */}
      <div className="grid grid-cols-3 gap-3 border-t border-gray-200 pt-4 mb-6 evitar-quebra">
        <div className="p-2.5 bg-gray-50 rounded-lg">
          <span className="text-[9px] font-black text-gray-400 uppercase block">
            Validade
          </span>
          <span className="text-xs font-bold text-gray-800">
            {dados.validade_dias} dias
          </span>
        </div>
        <div className="p-2.5 bg-gray-50 rounded-lg">
          <span className="text-[9px] font-black text-gray-400 uppercase block">
            Prazo de Entrega
          </span>
          <span className="text-xs font-bold text-gray-800">
            {dados.prazo_conclusao}
          </span>
        </div>
        <div className="p-2.5 bg-gray-50 rounded-lg">
          <span className="text-[9px] font-black text-gray-400 uppercase block">
            Pagamento
          </span>
          <span className="text-xs font-bold text-gray-800">
            {dados.condicoes_pagamento}
          </span>
        </div>
      </div>

      {/* QR CODE PIX */}
      {dados.pix_chave_ou_link && (
        <div className="border border-emerald-300 rounded-xl p-3.5 flex items-center justify-between bg-emerald-50/30 mb-6 evitar-quebra">
          <div>
            <h4 className="text-xs font-black text-emerald-800 flex items-center gap-1.5 mb-1">
              <CreditCard size={14} /> Pagamento Facilitado (Pix)
            </h4>
            <p className="text-[10px] text-gray-600 max-w-[280px] leading-relaxed">
              Chave Pix Celular: <b>{dados.pix_chave_ou_link}</b>
            </p>
            <p className="text-[9px] text-gray-500 mt-1">
              Favorecido: Nildo Queiroz • Envie o comprovante via WhatsApp (71)
              99226-5250.
            </p>
          </div>
          <div className="bg-white p-2 rounded-lg border border-emerald-200 shadow-sm shrink-0">
            <QRCodeSVG value={dados.pix_chave_ou_link} size={70} />
          </div>
        </div>
      )}

      {/* RODAPÉ */}
      <div className="mt-auto pt-4 border-t border-gray-200 text-center">
        <div className="grid grid-cols-2 gap-16 mb-4">
          <div className="border-t border-black pt-1">
            <p className="text-[9px] font-black uppercase text-gray-900">
              Aprovação do Cliente
            </p>
            <p className="text-[8px] text-gray-400">
              De acordo com a proposta comercial
            </p>
          </div>
          <div className="border-t border-black pt-1">
            <p className="text-[9px] font-black uppercase text-gray-900">
              Nildo Queiroz
            </p>
            <p className="text-[8px] text-gray-400">
              Tecnologia & Design • Responsável Técnico
            </p>
          </div>
        </div>
        <p className="text-[7.5px] text-gray-400 uppercase tracking-widest">
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
export default function OrcamentoPage() {
  const [dados, setDados] = useState<DadosOrcamento>(dadosPadraoOrcamento);
  const [modoVisualizacao, setModoVisualizacao] = useState<"formulario" | "preview">("formulario");
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nildo_queiroz_orcamento_dados");
      if (saved) setDados(JSON.parse(saved));
    } catch (e) { console.error(e); }
  }, []);

  const salvarDados = (novosDados: DadosOrcamento) => {
    setDados(novosDados);
    try { localStorage.setItem("nildo_queiroz_orcamento_dados", JSON.stringify(novosDados)); } catch (e) {}
  };

  const atualizarCampo = (campo: keyof DadosOrcamento, valor: any) => {
    salvarDados({ ...dados, [campo]: valor });
  };

  const adicionarItem = () => {
    salvarDados({ ...dados, itens: [...dados.itens, { id: Date.now().toString(), tipo: "Serviço", descricao: "", quantidade: 1, valor_unitario: 0 }] });
  };

  const atualizarItem = (id: string, campo: keyof ItemOrcamento, valor: any) => {
    salvarDados({ ...dados, itens: dados.itens.map((it) => it.id === id ? { ...it, [campo]: valor } : it) });
  };

  const removerItem = (id: string) => {
    salvarDados({ ...dados, itens: dados.itens.filter((it) => it.id !== id) });
  };

  const limparOrcamento = () => {
    const limpo: DadosOrcamento = {
      numero_orcamento: `${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      numero_os: "", data_proposta: new Intl.DateTimeFormat("pt-BR").format(new Date()),
      cliente_nome: "", cliente_documento: "", cliente_telefone: "", equipamento_modelo: "",
      validade_dias: 10, prazo_conclusao: "2 a 3 dias úteis",
      condicoes_pagamento: "Pix (chave celular), Cartão de Crédito ou Débito",
      pix_chave_ou_link: "71992265250", desconto: 0,
      itens: [{ id: "1", tipo: "Serviço", descricao: "", quantidade: 1, valor_unitario: 0 }],
    };
    salvarDados(limpo);
  };

  const preencherExemplo = () => salvarDados(dadosPadraoOrcamento);

  const subtotal = dados.itens.reduce((acc, it) => acc + (Number(it.quantidade) || 0) * (Number(it.valor_unitario) || 0), 0);
  const totalGeral = Math.max(0, subtotal - (Number(dados.desconto) || 0));

  const nomeArquivoPDF = `Orcamento_${dados.numero_orcamento}_OS_${dados.numero_os || "SN"}_${(dados.cliente_nome || "Cliente").replace(/\s+/g, "_")}`;

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
              <span className="text-xs font-black uppercase tracking-wider text-amber-500">Proposta Comercial</span>
              <span className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold px-2 py-0.5 rounded-full">#{dados.numero_orcamento}</span>
            </div>
            <h1 className="text-2xl font-black text-foreground">Orçamento de Serviços e Peças</h1>
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
            className="px-3.5 py-2.5 rounded-2xl border border-border bg-background hover:bg-amber-500/10 hover:text-amber-500 text-foreground/80 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /><span className="hidden sm:inline">Exemplo</span>
          </button>

          <button type="button" onClick={limparOrcamento}
            className="px-3.5 py-2.5 rounded-2xl border border-border bg-background hover:bg-red-500/10 hover:text-red-500 text-foreground/80 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer">
            <RotateCcw className="w-3.5 h-3.5" /><span className="hidden sm:inline">Limpar</span>
          </button>

          <PrintButton contentRef={componentRef} documentTitle={nomeArquivoPDF} />
        </div>
      </div>

      {/* Grid de 2 Colunas */}
      <div className="no-print grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Formulário */}
        <div className={`space-y-6 xl:col-span-6 ${modoVisualizacao === "preview" ? "hidden xl:block" : ""}`}>
          {/* Dados Gerais */}
          <div className="bg-panel p-6 rounded-[28px] border border-border shadow-soft space-y-4">
            <h2 className="text-sm font-black flex items-center gap-2 text-amber-600 uppercase tracking-wider">
              <Hash className="w-4 h-4" /> 1. Dados da Proposta & OS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">Nº do Orçamento</label>
                <input type="text" value={dados.numero_orcamento} onChange={(e) => atualizarCampo("numero_orcamento", e.target.value)}
                  className="w-full p-3 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-amber-500 text-sm font-black" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">Referente à OS Nº</label>
                <input type="text" value={dados.numero_os} onChange={(e) => atualizarCampo("numero_os", e.target.value)} placeholder="Ex: 1052"
                  className="w-full p-3 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-amber-500 text-sm font-bold" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">Data de Emissão</label>
                <input type="text" value={dados.data_proposta} onChange={(e) => atualizarCampo("data_proposta", e.target.value)}
                  className="w-full p-3 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium" />
              </div>
            </div>
          </div>

          {/* Cliente e Equipamento */}
          <div className="bg-panel p-6 rounded-[28px] border border-border shadow-soft space-y-4">
            <h2 className="text-sm font-black flex items-center gap-2 text-blue-600 uppercase tracking-wider">
              <User className="w-4 h-4" /> 2. Cliente e Equipamento
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">Nome do Cliente / Razão Social</label>
                <input type="text" value={dados.cliente_nome} onChange={(e) => atualizarCampo("cliente_nome", e.target.value)} placeholder="Ex: Maria Oliveira da Silva"
                  className="w-full p-3 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">Telefone / WhatsApp</label>
                <input type="text" value={dados.cliente_telefone} onChange={(e) => atualizarCampo("cliente_telefone", e.target.value)} placeholder="(71) 90000-0000"
                  className="w-full p-3 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">Equipamento / Modelo</label>
                <input type="text" value={dados.equipamento_modelo} onChange={(e) => atualizarCampo("equipamento_modelo", e.target.value)} placeholder="Ex: Dell Inspiron 15"
                  className="w-full p-3 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium uppercase" />
              </div>
            </div>
          </div>

          {/* Itens Dinâmicos */}
          <div className="bg-panel p-6 rounded-[28px] border border-border shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black flex items-center gap-2 text-emerald-600 uppercase tracking-wider">
                <DollarSign className="w-4 h-4" /> 3. Peças & Serviços
              </h2>
              <button type="button" onClick={adicionarItem}
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer">
                <Plus className="w-4 h-4" /><span>Adicionar Item</span>
              </button>
            </div>

            <div className="space-y-3">
              {dados.itens.map((item) => {
                const totalItem = (Number(item.quantidade) || 0) * (Number(item.valor_unitario) || 0);
                return (
                  <div key={item.id} className="p-4 rounded-2xl bg-background border border-border/80 flex flex-col md:flex-row items-start md:items-center gap-3 transition-all">
                    <div className="w-full md:w-28 shrink-0">
                      <select value={item.tipo} onChange={(e) => atualizarItem(item.id, "tipo", e.target.value as any)}
                        className="w-full p-2.5 rounded-xl border border-border bg-panel text-xs font-bold outline-none">
                        <option value="Serviço">Serviço</option><option value="Peça">Peça</option>
                      </select>
                    </div>
                    <div className="flex-1 w-full">
                      <input type="text" value={item.descricao} onChange={(e) => atualizarItem(item.id, "descricao", e.target.value)}
                        placeholder="Descrição da peça ou serviço prestado..."
                        className="w-full p-2.5 rounded-xl border border-border bg-panel text-xs font-medium outline-none focus:ring-2 focus:ring-amber-500" />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
                      <div className="w-16">
                        <input type="number" min="1" value={item.quantidade} onChange={(e) => atualizarItem(item.id, "quantidade", parseInt(e.target.value) || 1)}
                          className="w-full p-2.5 rounded-xl border border-border bg-panel text-xs font-bold text-center outline-none" title="Quantidade" />
                      </div>
                      <div className="w-24">
                        <input type="number" step="0.01" value={item.valor_unitario} onChange={(e) => atualizarItem(item.id, "valor_unitario", parseFloat(e.target.value) || 0)}
                          className="w-full p-2.5 rounded-xl border border-border bg-panel text-xs font-bold text-right outline-none" title="Valor Unitário R$" />
                      </div>
                      <div className="w-24 text-right font-black text-xs text-amber-600">{formatarMoeda(totalItem)}</div>
                      <button type="button" onClick={() => removerItem(item.id)} disabled={dados.itens.length <= 1}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-30 cursor-pointer" title="Remover Item">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subtotais */}
            <div className="pt-4 border-t border-border flex flex-col items-end gap-2 text-sm">
              <div className="flex justify-between w-64 text-foreground/70">
                <span>Subtotal:</span><span className="font-bold">{formatarMoeda(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center w-64 text-red-500">
                <span>Desconto (R$):</span>
                <input type="number" step="0.01" value={dados.desconto} onChange={(e) => atualizarCampo("desconto", parseFloat(e.target.value) || 0)}
                  className="w-24 p-1.5 text-right font-bold rounded-lg border border-red-200 bg-background outline-none text-xs" />
              </div>
              <div className="flex justify-between items-center w-64 pt-2 border-t border-border text-base font-black">
                <span className="text-foreground">Total da Proposta:</span>
                <span className="text-amber-600 dark:text-amber-400 text-lg">{formatarMoeda(totalGeral)}</span>
              </div>
            </div>
          </div>

          {/* Condições e Pagamento */}
          <div className="bg-panel p-6 rounded-[28px] border border-border shadow-soft space-y-4">
            <h2 className="text-sm font-black flex items-center gap-2 text-amber-600 uppercase tracking-wider">
              <CreditCard className="w-4 h-4" /> 4. Condições e Pagamento
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">Validade da Proposta (Dias)</label>
                <input type="number" value={dados.validade_dias} onChange={(e) => atualizarCampo("validade_dias", parseInt(e.target.value) || 0)}
                  className="w-full p-3 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">Prazo de Entrega Estimado</label>
                <input type="text" value={dados.prazo_conclusao} onChange={(e) => atualizarCampo("prazo_conclusao", e.target.value)} placeholder="Ex: 2 a 3 dias úteis"
                  className="w-full p-3 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium" />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">Formas de Pagamento Aceitas</label>
                <input type="text" value={dados.condicoes_pagamento} onChange={(e) => atualizarCampo("condicoes_pagamento", e.target.value)}
                  className="w-full p-3 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium" />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] font-bold text-foreground/60 uppercase ml-1">Chave Pix ou Link de Pagamento (Gera QR Code)</label>
                <input type="text" value={dados.pix_chave_ou_link} onChange={(e) => atualizarCampo("pix_chave_ou_link", e.target.value)} placeholder="Ex: 71992265250"
                  className="w-full p-3 mt-1 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium text-emerald-600 font-mono" />
              </div>
            </div>
          </div>
        </div>

        {/* Pré-visualização A4 (ESCALADA) */}
        <div className={`xl:col-span-6 space-y-4 ${modoVisualizacao === "formulario" ? "hidden xl:block" : ""}`}>
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-black uppercase tracking-wider text-foreground/60">Proposta Comercial A4 (Visualização)</span>
            <span className="text-[11px] text-foreground/40 font-medium">Pronta para emitir</span>
          </div>
          <div className="border border-border/70 shadow-xl rounded-[2.5rem] bg-gray-100 dark:bg-gray-900 p-8 flex flex-col items-center overflow-hidden">
            <p className="text-center text-[10px] text-foreground/50 mb-6 uppercase font-black tracking-widest">
              Pré-visualização da Impressão
            </p>
            <div className="relative w-full flex justify-center" style={{ height: "620px" }}>
              <div className="bg-white shadow-2xl origin-top absolute top-0 text-black transition-all"
                style={{ transform: "scale(0.55)", width: "210mm", height: "297mm", padding: "15mm" }}>
                <FolhaOrcamento dados={dados} subtotal={subtotal} totalGeral={totalGeral} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ÁREA DE IMPRESSÃO (OCULTA) */}
      <div className="hidden print:block">
        <div ref={componentRef} className="print-area bg-white text-gray-900"
          style={{ width: "210mm", height: "297mm", maxHeight: "297mm", padding: "15mm", overflow: "hidden", boxSizing: "border-box", fontFamily: "Inter, sans-serif" }}>
          <FolhaOrcamento dados={dados} subtotal={subtotal} totalGeral={totalGeral} />
        </div>
      </div>
    </div>
  );
}
