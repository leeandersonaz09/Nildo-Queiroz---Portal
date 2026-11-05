"use client";

import Link from "next/link";
import {
  FileText,
  DollarSign,
  ShieldCheck,
  ArrowRight,
  Printer,
  Sparkles,
  CheckCircle2,
  Phone,
  Wrench,
  Award,
  Layers,
  Cpu,
  HardDrive,
  Wifi,
  LifeBuoy,
} from "lucide-react";

export default function HomePage() {
  const servicosEspecializados = [
    { nome: "Formatação & Instalação", icone: Layers },
    { nome: "Montagem & Upgrade", icone: Cpu },
    { nome: "Manutenção Preventiva", icone: Wrench },
    { nome: "Restauração de Arquivos", icone: HardDrive },
    { nome: "Redes Cabeadas & Wi-Fi", icone: Wifi },
    { nome: "Consultoria em TI", icone: LifeBuoy },
  ];

  const ferramentas = [
    {
      titulo: "Ordem de Serviço (OS)",
      subtitulo: "Abertura de Chamado Técnico",
      descricao:
        "Cadastre o cliente, dados do equipamento (marca, serial, senha), acessórios, estado físico e defeito relatado. Gere a ficha de entrada oficial para impressão imediata em folha A4.",
      link: "/os",
      cor: "from-blue-600 to-cyan-600",
      bordaCor: "border-blue-500/20 hover:border-blue-500/40",
      badgeCor: "bg-blue-500/10 text-blue-500 dark:text-blue-400",
      icone: FileText,
      recursos: [
        "Identificação completa do cliente (Nome, Doc, Fone, Bairro)",
        "Checklist de estado físico e acessórios deixados",
        "Registro de senha de equipamento e número de série/TAG",
        "Ficha oficial com termos de responsabilidade técnica",
      ],
    },
    {
      titulo: "Orçamento Comercial",
      subtitulo: "Proposta de Serviços & Peças",
      descricao:
        "Adicione peças e serviços com cálculo automático de subtotais, descontos, prazos de conclusão, formas de pagamento facilitadas e geração de QR Code Pix integrado.",
      link: "/orcamento",
      cor: "from-indigo-600 to-purple-600",
      bordaCor: "border-indigo-500/20 hover:border-indigo-500/40",
      badgeCor: "bg-indigo-500/10 text-indigo-500 dark:text-indigo-400",
      icone: DollarSign,
      recursos: [
        "Itens ilimitados com cálculo financeiro em tempo real",
        "Descontos e condições de pagamento personalizáveis",
        "QR Code Pix dinâmico para recebimento imediato",
        "Layout corporativo de proposta comercial para impressão",
      ],
    },
    {
      titulo: "Certificado de Garantia",
      subtitulo: "Termo Oficial de Entrega",
      descricao:
        "Emita o certificado de garantia no momento da entrega do equipamento. Cláusulas contratuais em conformidade com o Código de Defesa do Consumidor (Art. 26).",
      link: "/garantia",
      cor: "from-emerald-600 to-teal-600",
      bordaCor: "border-emerald-500/20 hover:border-emerald-500/40",
      badgeCor: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400",
      icone: ShieldCheck,
      recursos: [
        "Vinculação direta de dados de cliente e equipamento",
        "Cláusulas claras de cobertura e proteção técnica",
        "Conformidade legal (CDC Art. 26 - 90 dias de garantia)",
        "Campos de assinatura do técnico e do cliente",
      ],
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Banner Principal com Apresentação Personalizada do Nildo Queiroz */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-8 md:p-12 shadow-2xl border border-blue-500/20">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Nildo Queiroz • Tecnologia e Design
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Central de Atendimento Técnico
            </h1>

            <p className="text-base md:text-lg text-slate-200 leading-relaxed font-normal">
              Assistência técnica especializada em <b>PCs e Notebooks</b>. Mais de{" "}
              <b className="text-amber-400">15 anos de experiência</b> oferecendo
              soluções confiáveis, montagem e upgrade, restauração de arquivos e
              suporte em TI com total segurança para você e sua empresa.
            </p>

            {/* Badges de Serviços */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              {servicosEspecializados.map((serv, i) => {
                const Icon = serv.icone;
                return (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10 text-slate-200 font-medium transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-amber-400" />
                    <span>{serv.nome}</span>
                  </span>
                );
              })}
            </div>

            {/* Contato Rápido */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
              <a
                href="https://wa.me/5571992265250"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl transition-all shadow-md active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp: (71) 99226-5250</span>
              </a>
              <span className="text-amber-400 font-bold">
                Salvador - Bahia • Tecnólogo em Gestão de TI
              </span>
            </div>
          </div>

          {/* Imagem do Flyer / Apresentação do Nildo */}
          <div className="relative shrink-0 w-64 h-64 md:w-72 md:h-72 rounded-[28px] overflow-hidden border-2 border-amber-500/30 shadow-2xl bg-slate-800 hidden sm:block">
            <img
              src="/assets/nildo-banner.jpg"
              alt="Assistência Técnica Nildo Queiroz"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
              <p className="text-[11px] text-white font-bold leading-tight">
                Mais de 15 anos de experiência, mais segurança para você!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid das 3 Ferramentas */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-foreground">
              Módulos de Atendimento
            </h2>
            <p className="text-sm text-foreground/60 mt-0.5">
              Selecione o documento que deseja emitir no momento
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ferramentas.map((f) => {
            const Icon = f.icone;

            return (
              <div
                key={f.link}
                className={`flex flex-col justify-between bg-panel rounded-[28px] p-6 border ${f.bordaCor} shadow-soft hover:shadow-xl transition-all duration-300 group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.cor} text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${f.badgeCor}`}
                    >
                      {f.subtitulo}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {f.titulo}
                  </h3>
                  <p className="text-xs text-foreground/70 mt-2.5 leading-relaxed">
                    {f.descricao}
                  </p>

                  <div className="mt-5 pt-4 border-t border-border/50 space-y-2">
                    <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">
                      Recursos inclusos:
                    </p>
                    <ul className="space-y-1.5 text-xs text-foreground/80">
                      {f.recursos.map((rec, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href={f.link}
                    className={`w-full py-3.5 px-5 rounded-[18px] bg-gradient-to-r ${f.cor} text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:opacity-95 active:scale-95 transition-all cursor-pointer`}
                  >
                    <span>Abrir Módulo</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compromisso com Qualidade Técnica */}
      <div className="p-6 md:p-8 rounded-[28px] bg-panel border border-border shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Wrench className="w-5 h-5 text-amber-500" />
              Nildo Queiroz • Gestão & Assistência Técnica Especializada
            </h3>
            <p className="text-xs text-foreground/60 mt-1">
              Atendimento com transparência, diagnóstico detalhado e documentos claros para seus clientes.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-foreground/70">
            <Printer className="w-4 h-4 text-primary" />
            <span>Impressão A4 calibrada para cada documento</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-foreground/80">
          <div className="p-4 rounded-2xl bg-background border border-border/50">
            <span className="text-2xl font-black text-blue-500 mb-2 block">1</span>
            <h4 className="font-bold text-foreground mb-1">Entrada e Diagnóstico</h4>
            <p className="text-xs text-foreground/60 leading-relaxed">
              Registre o estado do equipamento, acessórios deixados e sintomas relatados com total transparência.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-background border border-border/50">
            <span className="text-2xl font-black text-indigo-500 mb-2 block">2</span>
            <h4 className="font-bold text-foreground mb-1">Proposta Comercial Transparente</h4>
            <p className="text-xs text-foreground/60 leading-relaxed">
              Discrimine peças e serviços, prazos de entrega e ofereça pagamento facilitado via Pix e Cartão.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-background border border-border/50">
            <span className="text-2xl font-black text-emerald-500 mb-2 block">3</span>
            <h4 className="font-bold text-foreground mb-1">Garantia e Entrega Segura</h4>
            <p className="text-xs text-foreground/60 leading-relaxed">
              Emita o certificado de garantia respaldado pelo Código de Defesa do Consumidor, com assinaturas formais.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
