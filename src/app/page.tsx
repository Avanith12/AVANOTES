'use client';

import React, { useState } from 'react';
import NoteInput from '@/components/NoteInput';
import SummaryOutput from '@/components/SummaryOutput';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import FontSwitcher from '@/components/FontSwitcher';
import ColorSwitcher from '@/components/ColorSwitcher';
import { summarizeNotes, SummaryResult } from '@/lib/summarizer';
import { exportToPDF } from '@/lib/pdfExporter';
import { Download, Sparkles } from 'lucide-react';

export default function Home() {
  const [summary, setSummary] = useState<SummaryResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSummarize = (text: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      const result = summarizeNotes(text);
      setSummary(result);
      setIsProcessing(false);
    }, 800);
  };

  const handleExportPDF = () => {
    exportToPDF('summary-export', 'briefly-summary.pdf');
  };

  return (
    <main className="min-h-screen theme-bg transition-colors duration-300 flex flex-col p-4 md:p-8">

      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <div className="p-2 theme-surface theme-border theme-shadow theme-radius">
            <Sparkles className="theme-text" size={24} />
          </div>
          <h1 className="text-4xl font-theme-heading theme-text uppercase tracking-wider">
            Avanotes
          </h1>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 xl:gap-4">
          <ThemeSwitcher />
          <FontSwitcher />
          <ColorSwitcher />
          {summary && (
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--accent-blue)] text-black font-bold theme-radius theme-border comic-button shadow-sm hover:brightness-110 transition-all font-theme-body"
            >
              <Download size={18} />
              PDF
            </button>
          )}
        </div>

      </header>

      {/* Main Content */}
      <div className="flex-grow w-full max-w-7xl mx-auto mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* Left Column: Input (Writing Focused) */}
          <section className="h-full">
            <NoteInput onSummarize={handleSummarize} isProcessing={isProcessing} />
          </section>

          {/* Right Column: Output */}
          <section className="h-full">
            <SummaryOutput summary={summary} />
          </section>

        </div>
      </div>

    </main>
  );
}
