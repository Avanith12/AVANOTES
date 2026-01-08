import {
    Bold, Italic, List, Indent, Type, Minus, Plus, Mic, MicOff, Palette, Highlighter,
    Underline, Strikethrough, Outdent, AlignLeft, AlignCenter, AlignRight, AlignJustify, RotateCcw
} from 'lucide-react';

interface EditorToolbarProps {
    onBold: () => void;
    onItalic: () => void;
    onUnderline: () => void;
    onStrikethrough: () => void;
    onList: () => void;
    onIndent: () => void;
    onOutdent: () => void;
    onAlignLeft: () => void;
    onAlignCenter: () => void;
    onAlignRight: () => void;
    onAlignJustify: () => void;
    onClearFormatting: () => void;
    onSelectionFontSize: (delta: number) => void;
    onTextColor: (color: string) => void;
    onHighlightColor: (color: string) => void;
    onDictate: () => void;
    isDictating: boolean;
}

export default function EditorToolbar({
    onBold,
    onItalic,
    onUnderline,
    onStrikethrough,
    onList,
    onIndent,
    onOutdent,
    onAlignLeft,
    onAlignCenter,
    onAlignRight,
    onAlignJustify,
    onClearFormatting,
    onSelectionFontSize,
    onTextColor,
    onHighlightColor,
    onDictate,
    isDictating,
}: EditorToolbarProps) {
    const colors = ['#000000', '#FF0000', '#0000FF', '#008000', '#FFA500'];
    const highlights = ['#FFFF00', '#00FFFF', '#FF00FF', '#90EE90', 'transparent'];

    return (
        <div className="flex items-center gap-2 p-2 mb-2 border-b theme-border bg-white/50 dark:bg-black/20 rounded-t-lg flex-wrap">
            {/* Font Size Controls (Relative) */}
            <div className="flex items-center gap-1 mr-4 border-r pr-4 theme-border">
                <Type size={16} className="text-gray-500 mr-2" />
                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => onSelectionFontSize(-1)}
                    className="p-1 hover:bg-black/10 rounded"
                    title="Shrink Selection"
                >
                    <Minus size={14} />
                </button>
                <span className="text-xs font-bold w-4 text-center opacity-50">S/L</span>
                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => onSelectionFontSize(1)}
                    className="p-1 hover:bg-black/10 rounded"
                    title="Enlarge Selection"
                >
                    <Plus size={14} />
                </button>
            </div>

            {/* Formatting Controls */}
            <div className="flex items-center gap-1">
                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={onBold}
                    className="p-1.5 hover:bg-black/10 rounded theme-text font-bold"
                    title="Bold (**text**)"
                >
                    <Bold size={18} />
                </button>
                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={onItalic}
                    className="p-1.5 hover:bg-black/10 rounded theme-text italic"
                    title="Italic (_text_)"
                >
                    <Italic size={18} />
                </button>
                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={onUnderline}
                    className="p-1.5 hover:bg-black/10 rounded theme-text"
                    title="Underline"
                >
                    <Underline size={18} />
                </button>
                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={onStrikethrough}
                    className="p-1.5 hover:bg-black/10 rounded theme-text"
                    title="Strikethrough"
                >
                    <Strikethrough size={18} />
                </button>
            </div>

            {/* List & Indent */}
            <div className="flex items-center gap-1 border-x px-2 theme-border">
                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={onList}
                    className="p-1.5 hover:bg-black/10 rounded theme-text"
                    title="List Item"
                >
                    <List size={18} />
                </button>
                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={onOutdent}
                    className="p-1.5 hover:bg-black/10 rounded theme-text"
                    title="Decrease Indent"
                >
                    <Outdent size={18} />
                </button>
                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={onIndent}
                    className="p-1.5 hover:bg-black/10 rounded theme-text"
                    title="Increase Indent"
                >
                    <Indent size={18} />
                </button>
            </div>

            {/* Alignment */}
            <div className="flex items-center gap-1 border-r pr-2 theme-border">
                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={onAlignLeft}
                    className="p-1.5 hover:bg-black/10 rounded theme-text"
                    title="Align Left"
                >
                    <AlignLeft size={18} />
                </button>
                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={onAlignCenter}
                    className="p-1.5 hover:bg-black/10 rounded theme-text"
                    title="Align Center"
                >
                    <AlignCenter size={18} />
                </button>
                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={onAlignRight}
                    className="p-1.5 hover:bg-black/10 rounded theme-text"
                    title="Align Right"
                >
                    <AlignRight size={18} />
                </button>
                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={onAlignJustify}
                    className="p-1.5 hover:bg-black/10 rounded theme-text"
                    title="Justify"
                >
                    <AlignJustify size={18} />
                </button>
            </div>

            {/* Clear Formatting */}
            <div className="flex items-center gap-1 border-r pr-2 theme-border">
                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={onClearFormatting}
                    className="p-1.5 hover:bg-black/10 rounded theme-text text-red-500"
                    title="Clear Formatting"
                >
                    <RotateCcw size={18} />
                </button>
            </div>

            {/* Colors & Highlights */}
            <div className="flex items-center gap-2 border-x px-4 theme-border">
                {/* Text Color */}
                <div className="flex items-center gap-1">
                    <Palette size={16} className="text-gray-500" />
                    <div className="flex gap-0.5">
                        {colors.map(c => (
                            <button
                                key={c}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => onTextColor(c)}
                                className="w-4 h-4 rounded-full border border-black/10"
                                style={{ backgroundColor: c }}
                                title={`Text: ${c}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Highlight Color */}
                <div className="flex items-center gap-1 ml-2">
                    <Highlighter size={16} className="text-gray-500" />
                    <div className="flex gap-0.5">
                        {highlights.map(c => (
                            <button
                                key={c}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => onHighlightColor(c)}
                                className="w-4 h-4 rounded border border-black/10"
                                style={{ backgroundColor: c === 'transparent' ? 'white' : c }}
                                title={`Highlight: ${c}`}
                            >
                                {c === 'transparent' && <span className="text-[10px] text-red-500 flex items-center justify-center">×</span>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Voice Dictation */}
            <div className="flex items-center gap-1 border-l pl-4 theme-border ml-2">
                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={onDictate}
                    className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-lg theme-border transition-all comic-button
                        ${isDictating
                            ? 'bg-red-500 text-white animate-pulse border-red-700'
                            : 'bg-white hover:bg-red-50 text-black'}
                    `}
                    title={isDictating ? "Stop Dictation" : "Start Voice Dictation"}
                >
                    {isDictating ? <MicOff size={18} /> : <Mic size={18} />}
                    <span className="text-xs font-bold uppercase">{isDictating ? 'Listening...' : 'Dictate'}</span>
                </button>
            </div>
        </div>
    );
}
