# Avanotes — The note-taking app with a personality.
Real-time summarization meets total visual control.

Live at: https://avanotes.vercel.app/

### Features
- **Custom Moods & Aesthetics**: Switch between **Comic**, **Hacker**, **Professional**, and **Retro** themes. Customize further with dedicated **Font** and **Color** switchers for a truly personal workspace.
- **Voice Typing**: Integrated **Dictation** mode powered by the Web Speech API. Transcribe meetings in real-time directly into the editor.
- **Smart Local Intelligence**: Uses advanced NLP to understand context, automatically detecting Action Items, Decisions, and Next Steps without special tags.
- **Productivity Suite**: Integrated **File Upload** (.txt/.md), **Multi-Page PDF** export, and one-click **Markdown Copy**.
- **WYSIWYG Editor**: Real-time visual formatting (Bold, Italic, Lists) with adjustable font sizes.
- **Privacy First**: 100% Local and Ephemeral. No servers, no tracking, and zero-storage. Your data exists only and briefly in your browser.
- **Premium UX**: Smooth transitions, glassmorphism, and responsive design tailored for high-focus writing.

### Seeing it in Action
Just type naturally! Avanotes understands context using on-device NLP:
- **Actions**: "John needs to review the PR by Tuesday." -> Automatically added to **Action Items**.
- **Decisions**: "We agreed to use Tailwind for the styling." -> Automatically added to **Decisions**.
- **Insights**: "The project is currently in beta." -> Intelligently kept as a **Key Note**.

### Built With
- **Next.js 16**: Modern React framework for the overall application structure.
- **React 19**: The core library for building the interactive user interface.
- **TypeScript**: Adds static typing to ensure code reliability and catch errors early.
- **Tailwind CSS 4**: Handles all styling and theme-switching logic via CSS variables.
- **Compromise**: A natural language processing (NLP) library that runs 100% in your browser.
- **Web Speech API**: Powers the real-time voice-to-text dictation feature.
- **Lucide React**: Provides the premium-style icons used throughout the app.
- **jsPDF**: Generates the multi-page PDF documents for your summaries.
- **html-to-image**: Captures the visual look of the app for high-quality exported files.
- **Google Fonts**: Sources the high-quality typography for the various themes.
- **@tailwindcss/typography**: Adds beautiful, automatic styling to the summarized notes.
- **Selection API**: Manages text highlighting and cursor placement for the rich-text editor.
- **ContentEditable**: The native browser technology used to build the distraction-free editor.

---

### Folder Structure
```text
└── src
    ├── app             # App Router: Layout, main page, and global CSS
    ├── components      # React Components: Editor, Summary, & Theme switchers
    ├── context         # State: ThemeContext for global styles, fonts, and colors
    └── lib             # Core Logic: NLP Summarizer and PDF Export engines
```

### Run It
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### License
Copyright © 2026 Avanith Kanamarlapudi. All Rights Reserved.