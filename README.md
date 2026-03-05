# 🦜 Adarna Quest – Interactive Classroom Game

A React-based educational game about **Ibong Adarna** for classroom use.

---

## 🚀 Setup in VS Code (One-Time)

### Prerequisites
Make sure you have **Node.js** installed.
👉 Download from: https://nodejs.org (get the LTS version)

Check if it's installed by opening a terminal and running:
```
node --version
npm --version
```

---

### Steps

1. **Open this folder in VS Code**
   - File → Open Folder → select `adarna-quest`

2. **Open the Terminal in VS Code**
   - Terminal → New Terminal (or press Ctrl + `)

3. **Install all packages** (only needed once!)
   ```
   npm install
   ```
   Wait for it to finish. This downloads all the libraries.

4. **Start the game**
   ```
   npm run dev
   ```

5. **Open in browser**
   - Vite will show a link like: `http://localhost:5173`
   - Click it or paste it in your browser

6. **Done! The game is running! 🎉**

---

## 📁 File Structure

```
adarna-quest/
├── src/
│   ├── data/
│   │   └── gameData.js     ← ✏️ EDIT THIS to change all game content
│   ├── components/
│   │   ├── HomeScreen.jsx
│   │   ├── VocabGame.jsx
│   │   ├── CharacterGame.jsx
│   │   ├── PuzzleReveal.jsx
│   │   ├── StoryOrder.jsx
│   │   ├── FinalScreen.jsx
│   │   └── ScoreBar.jsx
│   ├── hooks/
│   │   └── useGame.js      ← game state & scoring
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html
```

---

## ✏️ How to Edit Content

**All game content is in one file: `src/data/gameData.js`**

| What to change | Where |
|---|---|
| Vocab words & meanings | `VOCAB_WORDS` array |
| Character clues & descriptions | `CHAR_QUESTIONS` array |
| Puzzle trivia questions | `PUZZLE_QUESTIONS` array |
| Story order events | `STORY_EVENTS` array |
| Puzzle tile emojis/colors | `PUZZLE_TILES` array |

**To change point values**, edit `src/hooks/useGame.js` → `POINTS` object.

**To change colors/fonts**, edit `tailwind.config.js` → `theme.extend`.

---

## 📦 Packages Used

| Package | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Dev server & build tool |
| Tailwind CSS | Utility-based styling |
| Framer Motion | Animations & transitions |
| Lucide React | SVG icon library |
| canvas-confetti | Celebration confetti effect |
| @dnd-kit | Drag-and-drop story ordering |

---

## 🎮 Game Flow

```
Home → Talasalitaan (Vocab) → Character Quiz → Puzzle Reveal → Story Order → Final Screen
```

Each correct answer:
- Adds points to the score
- Reveals one puzzle tile of the Ibong Adarna

---

Made for classroom use 🏫 | Ibong Adarna Filipino Literature
