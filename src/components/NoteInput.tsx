import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Eraser, Download, FileText, Upload } from 'lucide-react';
import EditorToolbar from './EditorToolbar';
import { exportToPDF } from '@/lib/pdfExporter';

interface NoteInputProps {
    onSummarize: (text: string) => void;
    isProcessing: boolean;
}

export default function NoteInput({ onSummarize, isProcessing }: NoteInputProps) {
    const [fontSize, setFontSize] = useState(18);
    const editorRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Focus editor on mount
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.focus();
        }
    }, []);

    const handleSummarize = () => {
        if (!editorRef.current) return;
        const text = editorRef.current.innerText;
        if (!text.trim()) return;
        onSummarize(text);
    };

    const handleClear = () => {
        if (editorRef.current) {
            editorRef.current.innerHTML = '';
        }
    };

    const handleSaveTxt = () => {
        if (!editorRef.current) return;
        const text = editorRef.current.innerText;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'avanotes-raw.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleSavePdf = () => {
        exportToPDF('input-card-content', 'avanotes-raw.pdf');
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            if (editorRef.current && event.target?.result) {
                editorRef.current.innerText = event.target.result as string;
            }
        };
        reader.readAsText(file);
        // Reset value to allow re-uploading same file
        e.target.value = '';
    };

    // WYSIWYG Handlers
    const execCmd = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
        if (editorRef.current) editorRef.current.focus();
    };

    const handleBold = () => execCmd('bold');
    const handleItalic = () => execCmd('italic');
    const handleList = () => execCmd('insertUnorderedList');
    const handleIndent = () => execCmd('indent');

    return (
        <div id="input-card-content" className="flex flex-col h-full min-h-[600px] theme-surface theme-border theme-shadow p-6 theme-radius relative transition-all duration-300">

            <div className="flex justify-between items-center mb-4 mt-2">
                <h2 className="text-3xl font-theme-heading theme-text uppercase tracking-wide">
                    Input Notes
                </h2>
                <div className="flex gap-2">
                    <input
                        type="file"
                        accept=".txt,.md"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <button
                        onClick={handleUploadClick}
                        className="text-sm font-bold theme-border bg-white hover:bg-purple-50 text-black px-2 py-1 flex items-center gap-1 comic-button theme-radius"
                        title="Upload Text File"
                    >
                        <Upload size={14} strokeWidth={3} /> Upload
                    </button>
                    <button
                        onClick={handleSaveTxt}
                        className="text-sm font-bold theme-border bg-white hover:bg-blue-50 text-black px-2 py-1 flex items-center gap-1 comic-button theme-radius"
                        title="Save as TXT"
                    >
                        <FileText size={14} strokeWidth={3} /> TXT
                    </button>
                    <button
                        onClick={handleSavePdf}
                        className="text-sm font-bold theme-border bg-white hover:bg-yellow-50 text-black px-2 py-1 flex items-center gap-1 comic-button theme-radius"
                        title="Save as PDF"
                    >
                        <Download size={14} strokeWidth={3} /> PDF
                    </button>
                    <button
                        onClick={handleClear}
                        className="text-sm font-bold theme-border bg-white hover:bg-red-50 text-black px-2 py-1 flex items-center gap-1 comic-button theme-radius"
                        aria-label="Clear notes"
                    >
                        <Eraser size={14} strokeWidth={3} /> Clear
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <EditorToolbar
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
                onBold={handleBold}
                onItalic={handleItalic}
                onList={handleList}
                onIndent={handleIndent}
            />

            <div className="relative flex-grow theme-border theme-surface theme-radius overflow-hidden">
                <div
                    ref={editorRef}
                    contentEditable
                    className="w-full h-full min-h-[400px] p-4 theme-text font-theme-body outline-none overflow-y-auto"
                    style={{ fontSize: `${fontSize}px` }}
                    suppressContentEditableWarning={true}
                >
                    <div className="opacity-50 pointer-events-none absolute" style={{ display: 'none' }}>
                        Type your notes here...
                    </div>
                </div>
            </div>

            <button
                onClick={handleSummarize}
                disabled={isProcessing}
                className="w-full mt-4 py-3 px-6 bg-[var(--accent-blue)] hover:brightness-110 text-black font-theme-heading text-2xl theme-border theme-shadow comic-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-wider theme-radius transition-all"
            >
                <Sparkles size={24} strokeWidth={3} />
                {isProcessing ? 'Processing...' : 'Summarize'}
            </button>
        </div>
    );
}
