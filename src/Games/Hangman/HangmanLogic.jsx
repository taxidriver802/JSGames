import words from './words';

export function getRandomWord() {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  if (randomWord.includes('-') || randomWord.includes(' ')) {
    return getRandomWord();
  }
  const word = randomWord.toUpperCase();

  return word;
}

export function calculateLives(word) {
  if (word.length > 10) return 10;
  if (word.length > 6) return 8;
  return 6;
}

export function handleGuess(letter, usedLetters) {
  return [...usedLetters, letter.toUpperCase()];
}

export function isCorrectGuess(word, letter) {
  return word.includes(letter);
}

export function getDisplayWord(word, usedLetters) {
  return word
    .split('')
    .map((l) => (usedLetters.includes(l) ? l : '_'))
    .join(' ');
}

export function isGameWon(word, usedLetters) {
  return word.split('').every((letter) => usedLetters.includes(letter));
}
