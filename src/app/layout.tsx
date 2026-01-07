import type { Metadata } from 'next';
import { Bangers, Comic_Neue, Fira_Code, Inter, Roboto_Slab } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

const bangers = Bangers({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bangers',
});

const comicNeue = Comic_Neue({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-comic',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-coding',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Avanotes - Styled Summaries',
  description: 'Meeting notes, summarized with style!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bangers.variable} ${comicNeue.variable} ${firaCode.variable} ${inter.variable} ${robotoSlab.variable} antialiased transition-colors duration-300`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
