'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Palette, X } from 'lucide-react';

export default function ColorSwitcher() {
    const { setCustomColor, customColor } = useTheme();

    const colors = [
        { name: 'Black', value: '#000000' },
        { name: 'White', value: '#ffffff' },
        { name: 'Navy', value: '#1e3a8a' }, // Tailwind blue-900
        { name: 'Green', value: '#22c55e' }, // Tailwind green-500
        { name: 'Red', value: '#ef4444' }, // Tailwind red-500
    ];

    return (
        <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-lg theme-border border">
            <Palette size={16} className="text-gray-500 dark:text-gray-400 ml-1" />
            <div className="flex items-center gap-1">
                {/* Reset Button */}
                <button
                    onClick={() => setCustomColor(null)}
                    className={`w-5 h-5 rounded-full flex items-center justify-center border border-gray-400 transition-transform hover:scale-110 ${!customColor ? 'ring-2 ring-blue-500' : ''}`}
                    title="Default Theme Color"
                >
                    <X size={12} className="text-gray-500" />
                </button>

                {colors.map((c) => (
                    <button
                        key={c.name}
                        onClick={() => setCustomColor(c.value)}
                        className={`w-5 h-5 rounded-full border border-gray-300 shadow-sm transition-transform hover:scale-110 ${customColor === c.value ? 'ring-2 ring-blue-500' : ''
                            }`}
                        style={{ backgroundColor: c.value }}
                        title={`Set text to ${c.name}`}
                    />
                ))}
            </div>
        </div>
    );
}
