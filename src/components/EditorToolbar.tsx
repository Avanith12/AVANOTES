'use client';

import React from 'react';
import { Bold, Italic, List, Indent, Type, Minus, Plus } from 'lucide-react';

interface EditorToolbarProps {
    onBold: () => void;
    onItalic: () => void;
    onList: () => void;
    onIndent: () => void;
    fontSize: number;
    onFontSizeChange: (size: number) => void;
}

export default function EditorToolbar({
    onBold,
    onItalic,
    onList,
    onIndent,
    fontSize,
    onFontSizeChange,
}: EditorToolbarProps) {
    return (
        <div className="flex items-center gap-2 p-2 mb-2 border-b theme-border bg-white/50 dark:bg-black/20 rounded-t-lg flex-wrap">
            {/* Font Size Controls */}
            <div className="flex items-center gap-1 mr-4 border-r pr-4 theme-border">
                <Type size={16} className="text-gray-500 mr-2" />
                <button
                    onClick={() => onFontSizeChange(Math.max(12, fontSize - 2))}
                    className="p-1 hover:bg-black/10 rounded"
                    title="Decrease Font Size"
                >
                    <Minus size={14} />
                </button>
                <span className="text-sm font-bold w-6 text-center">{fontSize}</span>
                <button
                    onClick={() => onFontSizeChange(Math.min(32, fontSize + 2))}
                    className="p-1 hover:bg-black/10 rounded"
                    title="Increase Font Size"
                >
                    <Plus size={14} />
                </button>
            </div>

            {/* Formatting Controls */}
            <div className="flex items-center gap-1">
                <button
                    onClick={onBold}
                    className="p-1.5 hover:bg-black/10 rounded theme-text font-bold"
                    title="Bold (**text**)"
                >
                    <Bold size={18} />
                </button>
                <button
                    onClick={onItalic}
                    className="p-1.5 hover:bg-black/10 rounded theme-text italic"
                    title="Italic (_text_)"
                >
                    <Italic size={18} />
                </button>
                <button
                    onClick={onList}
                    className="p-1.5 hover:bg-black/10 rounded theme-text"
                    title="List Item"
                >
                    <List size={18} />
                </button>
                <button
                    onClick={onIndent}
                    className="p-1.5 hover:bg-black/10 rounded theme-text"
                    title="Indent"
                >
                    <Indent size={18} />
                </button>
            </div>
        </div>
    );
}
