# 🎮 JS Arcade Collection

A nostalgic mini-arcade of classic games originally built in Python and reimagined with **React JavaScript** for the web. This collection is a personal project focused on recreating text-based terminal games with modern UI/UX — clean, fast, and responsive.

---

## 🕹️ Games Included

- **Hangman** – Guess the word before your stickman meets his fate
- **Tic Tac Toe** – Classic 3x3 grid with player vs player mode
- **Number Guess** – Can you guess the secret number in time?
- **Rock Paper Scissors** – The timeless battle of logic and luck
- **Mad Libs** – A silly, creative word game using user input
- **More Games Coming Soon!** – Stay tuned for new classics and surprises

---

## 🚀 Live Demo

🔗 [View the Arcade Online](https://taxidriver802.github.io/JSGames/)

> _(Hosted with GitHub Pages)_

---

## 🧠 Motivation

This project stemmed from a few Python-based games that ran in the command line. I wanted to convert these games into a language I understood better, allowing me to give the games improved user experiences with modern web technologies. Each game has been carefully translated, styled, and structured for the browser with performance, modularity, and mobile support in mind.

---

## 🛠️ Built With

- **React** – UI components & routing
- **JavaScript (ES6+)** – Core game logic
- **React Router** – Page navigation
- **CSS Modules** – Responsive & themed styling
- **HTML5/CSS3** – Semantic layout
- **LocalStorage** – Stores wins/losses for each game

---

## 📂 Project Structure

```bash
src/
├── Components/
│   ├── Header/
│   ├── Footer/
│   ├── GameCard/
│   └── GameCards/
├── Games/
│   ├── Hangman/
│   ├── TicTacToe/
│   ├── NumberGuess/
│   ├── RockPaperScissors/
│   └── MadLibs/
├── utils/
├── App.jsx
├── index.js
└── index.css
```

---

## 📦 Getting Started

### Prerequisites

Make sure you have:

- Node.js (v16+ recommended)
- npm (comes with Node)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/taxidriver802/JSGames.git
   cd JSGames
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the local dev server:

   ```bash
   npm run dev
   ```

4. Open your browser at:
   ```
   http://localhost:3000
   ```

---

## 🧪 Dev Notes

- Games are self-contained in their folders
- Logic is separated from UI for maintainability
- React Router is used for routing, with HashRouter for GitHub Pages support

---

This project is licensed under the [MIT License](LICENSE).

---

## ✨ Future Plans

- Add sound effects & background music toggle
- High score tracking with a backend (MongoDB)
- User login to save progress
- Add more games (Snake, Memory Match, Simon Says)

---

## 🙌 Acknowledgments

- [Python games repository](https://github.com/taxidriver802/python-practice-games)
- Original python games Inspired by [FreeCodeCamp - 12 Beginner Python Projects - Coding Course](https://www.youtube.com/watch?v=8ext9G7xspg&t=4786s)
- Fonts: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P)
- Built by Jason Cox
