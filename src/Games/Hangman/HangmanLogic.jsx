import words from './words';

export default function getRandomWord() {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  if (randomWord.includes('-') || randomWord.includes(' ')) {
    return getRandomWord();
  }
  const word = randomWord.toUpperCase();

  return word;
}
