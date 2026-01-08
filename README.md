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