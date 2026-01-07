'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Palette, Terminal } from 'lucide-react';

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex gap-2">
            <button
                onClick={() => setTheme('comic')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 font-bold transition-all ${theme === 'comic'
                    ? 'bg-yellow-400 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                    }`}
                title="Comic Mode"
            >
                <Palette size={18} />
                <span className="hidden xl:inline">Comic</span>
            </button>
            <button
                onClick={() => setTheme('coding')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 font-mono transition-all ${theme === 'coding'
                    ? 'bg-green-500 text-black border-2 border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.5)]'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                title="Hacker Mode"
            >
                <Terminal size={18} />
                <span className="hidden xl:inline">Hacker</span>
            </button>
            <button
                onClick={() => setTheme('professional')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 font-sans transition-all ${theme === 'professional'
                    ? 'bg-white text-slate-900 border border-slate-200 shadow-sm'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                title="Professional Mode"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                <span className="hidden xl:inline">Pro</span>
            </button>
            <button
                onClick={() => setTheme('retro')}
                className={`px-4 py-2 rounded-none flex items-center gap-2 font-mono transition-all ${theme === 'retro'
                    ? 'bg-[#2e003e] text-[#00ffff] border-2 border-[#ff00ff] shadow-[4px_4px_0px_0px_#00ffff]'
                    : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
                    }`}
                title="Retro Mode"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                <span className="hidden xl:inline">Retro</span>
            </button>
        </div>
    );
}
