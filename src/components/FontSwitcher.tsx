'use client';

import React from 'react';
import { useTheme, Font } from '@/context/ThemeContext';
import { Type } from 'lucide-react';

export default function FontSwitcher() {
    const { font, setFont } = useTheme();

    return (
        <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-lg theme-border border">
            <Type size={16} className="text-gray-500 dark:text-gray-400 ml-1" />
            <select
                value={font}
                onChange={(e) => setFont(e.target.value as Font)}
                className="bg-transparent text-sm font-bold theme-text focus:outline-none cursor-pointer"
            >
                <option value="comic">Comic Style</option>
                <option value="coding">Code Style</option>
                <option value="inter">Clean (Inter)</option>
                <option value="serif">Classic (Serif)</option>
            </select>
        </div>
    );
}
