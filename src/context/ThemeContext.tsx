'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'comic' | 'coding' | 'professional' | 'retro';
export type Font = 'comic' | 'coding' | 'inter' | 'serif';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    font: Font;
    setFont: (font: Font) => void;
    customColor: string | null;
    setCustomColor: (color: string | null) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('comic');
    const [font, setFont] = useState<Font>('comic');
    const [customColor, setCustomColor] = useState<string | null>(null);

    // We apply the custom color directly to the style attribute of the root div.
    // This allows it to override the variable defined in the .comic/.coding classes because inline styles have higher specificity.
    const style = customColor ? ({ '--text-primary': customColor } as React.CSSProperties) : undefined;

    return (
        <ThemeContext.Provider value={{ theme, setTheme, font, setFont, customColor, setCustomColor }}>
            <div data-theme={theme} data-font={font} className={`app-root ${theme}`} style={style}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
