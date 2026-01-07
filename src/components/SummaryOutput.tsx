import React from 'react';
import { Copy, Check, FileText } from 'lucide-react';
import { SummaryResult } from '@/lib/summarizer';

interface SummaryOutputProps {
    summary: SummaryResult | null;
}

export default function SummaryOutput({ summary }: SummaryOutputProps) {
    const [copied, setCopied] = React.useState(false);

    if (!summary) {
        return (
            <div id="summary-export" className="flex flex-col h-full theme-surface theme-border theme-shadow items-center justify-center theme-text p-8 text-center relative theme-radius transition-all duration-300">
                <FileText size={48} className="mb-4 opacity-20 theme-text" strokeWidth={3} />
                <p className="font-theme-heading text-2xl theme-text opacity-40 uppercase">Waiting for notes...</p>
            </div>
        );
    }

    const handleCopy = () => {
        const text = generateMarkdown(summary);
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleSaveTxt = () => {
        const text = generateMarkdown(summary);
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'avanotes-summary.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const generateMarkdown = (s: SummaryResult) => {
        let md = '# Meeting Summary\n\n';

        if (s.actionItems.length) {
            md += '## 🚀 Action Items\n' + s.actionItems.map(i => `- ${i}`).join('\n') + '\n\n';
        }
        if (s.decisions.length) {
            md += '## 🤝 Decisions\n' + s.decisions.map(i => `- ${i}`).join('\n') + '\n\n';
        }
        if (s.nextSteps.length) {
            md += '## 👣 Next Steps\n' + s.nextSteps.map(i => `- ${i}`).join('\n') + '\n\n';
        }
        if (s.keyPoints.length) {
            md += '## 📝 Key Notes\n' + s.keyPoints.map(i => `- ${i}`).join('\n') + '\n\n';
        }
        return md;
    };

    return (
        <div id="summary-export" className="flex flex-col h-full p-6 theme-surface theme-border theme-shadow relative theme-radius transition-all duration-300">

            <div className="flex justify-between items-center mb-4 mt-2">
                <h2 className="text-3xl font-theme-heading theme-text uppercase tracking-wide">
                    Summary
                </h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleSaveTxt}
                        className="text-sm font-bold theme-border bg-white hover:bg-blue-50 text-black px-2 py-1 flex items-center gap-1.5 comic-button transition-colors theme-radius"
                        title="Save as Text File"
                    >
                        <FileText size={14} strokeWidth={3} /> TXT
                    </button>
                    <button
                        onClick={handleCopy}
                        className="text-sm font-bold theme-border bg-white hover:bg-green-50 text-black px-2 py-1 flex items-center gap-1.5 comic-button transition-colors theme-radius data-[copied=true]:bg-green-200"
                        data-copied={copied}
                    >
                        {copied ? <Check size={14} strokeWidth={3} className="text-black" /> : <Copy size={14} strokeWidth={3} />}
                        {copied ? 'COPIED!' : 'COPY MD'}
                    </button>
                </div>
            </div>

            <div className="w-full pr-2 pb-4">
                {summary.actionItems.length > 0 && (
                    <div className="mb-6 theme-border p-4 bg-red-100 dark:bg-red-900/20 shadow-sm theme-radius">
                        <h3 className="font-theme-heading text-2xl theme-text flex items-center gap-2 mb-2 uppercase border-b-2 border-black/10 dark:border-white/10 pb-1">
                            🚀 Action Items
                        </h3>
                        <ul className="space-y-2">
                            {summary.actionItems.map((item, i) => (
                                <li key={i} className="font-theme-body text-lg theme-text bg-white/50 dark:bg-black/50 p-2 theme-radius">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {summary.decisions.length > 0 && (
                    <div className="mb-6 theme-border p-4 bg-green-100 dark:bg-green-900/20 shadow-sm theme-radius">
                        <h3 className="font-theme-heading text-2xl theme-text flex items-center gap-2 mb-2 uppercase border-b-2 border-black/10 dark:border-white/10 pb-1">
                            🤝 Decisions
                        </h3>
                        <ul className="space-y-2">
                            {summary.decisions.map((item, i) => (
                                <li key={i} className="font-theme-body text-lg theme-text bg-white/50 dark:bg-black/50 p-2 theme-radius">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {summary.nextSteps.length > 0 && (
                    <div className="mb-6 theme-border p-4 bg-purple-100 dark:bg-purple-900/20 shadow-sm theme-radius">
                        <h3 className="font-theme-heading text-2xl theme-text flex items-center gap-2 mb-2 uppercase border-b-2 border-black/10 dark:border-white/10 pb-1">
                            👣 Next Steps
                        </h3>
                        <ul className="space-y-2">
                            {summary.nextSteps.map((item, i) => (
                                <li key={i} className="font-theme-body text-lg theme-text bg-white/50 dark:bg-black/50 p-2 theme-radius">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {summary.keyPoints.length > 0 && (
                    <div className="mb-6 theme-border p-4 bg-white/50 dark:bg-white/5 shadow-sm theme-radius">
                        <h3 className="font-theme-heading text-2xl theme-text flex items-center gap-2 mb-2 uppercase border-b-2 border-black/10 dark:border-white/10 pb-1">
                            📝 Key Notes
                        </h3>
                        <ul className="space-y-2 pl-4 list-disc marker:text-black dark:marker:text-white">
                            {summary.keyPoints.map((item, i) => (
                                <li key={i} className="font-theme-body text-lg theme-text">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {summary.actionItems.length === 0 && summary.decisions.length === 0 && summary.nextSteps.length === 0 && summary.keyPoints.length === 0 && (
                    <p className="theme-text font-theme-body italic text-center p-4">No specific actions found. Is this thing on?</p>
                )}
            </div>
        </div>
    );
}
