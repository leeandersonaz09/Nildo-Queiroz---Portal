"use client";

import { useReactToPrint } from "react-to-print";
import { Printer } from "lucide-react";

export default function PrintButton({
  contentRef,
  documentTitle = "Documento_ResolveTI",
}: {
  contentRef: React.RefObject<HTMLDivElement | null>;
  documentTitle?: string;
}) {
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle,
  });

  return (
    <button
      type="button"
      onClick={() => handlePrint()}
      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg transition-all active:scale-95 print:hidden cursor-pointer"
    >
      <Printer className="w-5 h-5" />
      IMPRIMIR / GERAR PDF
    </button>
  );
}
