import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hangman.css';

import {
  getRandomWord,
  calculateLives,
  handleGuess,
  isCorrectGuess,
  getDisplayWord,
  isGameWon,
} from './HangmanLogic';

const Hangman = () => {
  const [word, setWord] = useState('');
  const [lives, setLives] = useState(6);
  const [usedLetters, setUsedLetters] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const navigate = useNavigate();

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  useEffect(() => {
    const newWord = getRandomWord();
    setWord(newWord);
    setLives(calculateLives(newWord));
  }, []);

  useEffect(() => {
    if (lives === 0) {
      setGameLost(true);
      setLosses((prev) => prev + 1);
    }
  }, [lives]);

  useEffect(() => {
    if (usedLetters.length === 0) return;

    if (isGameWon(word, usedLetters)) {
      setGameWon(true);
      setWins((prev) => prev + 1);
    }
  }, [word, usedLetters]);

  const onLetterClick = (letter) => {
    setUsedLetters((prev) => handleGuess(letter, prev));
    if (!isCorrectGuess(word, letter)) {
      setLives((prev) => prev - 1);
    }
  };

  const resetGame = () => {
    const newWord = getRandomWord();
    setWord(newWord);
    setLives(calculateLives(newWord));
    setUsedLetters([]);
    setGameWon(false);
    setGameLost(false);
  };

  console.log(gameWon, gameLost);

  return (
    <div className="hangman">
      <h2>Hangman</h2>
      <div className="hangman__container">
        <div className="hangman__container-info">
          <p>Lives:{lives}</p>
          <p>Used Letters:{usedLetters.join(', ')}</p>
          <div className="hangman__container-winloss">
            <p>Games Won:{wins}</p>
            <p>Games Lost:{losses}</p>
          </div>
        </div>
        <div className="hangman__container-screen">
          <div className="hangman__container-screen-img">
            <img src={`/assets/Hangman/hangman${lives}.svg`} alt="Hangman" />
          </div>
          {!gameWon && !gameLost && (
            <div className="hangman__container-screen-alphabet">
              {alphabet
                .filter((letter) => !usedLetters.includes(letter))
                .map((letter) => (
                  <button key={letter} onClick={() => onLetterClick(letter)}>
                    {letter}
                  </button>
                ))}
            </div>
          )}

          <p>Game Word: {getDisplayWord(word, usedLetters)}</p>
          <p>dev word: {word}</p>
        </div>
      </div>

      {gameWon && (
        <>
          {' '}
          <p>You Won! The word was {word}.</p>
          <button className="hangman__button" onClick={resetGame}>
            Restart?
          </button>
        </>
      )}

      {gameLost && (
        <>
          {' '}
          <p>You Lost! The word was {word}.</p>
          <button className="hangman__button" onClick={resetGame}>
            Restart?
          </button>
        </>
      )}
      <button className="hangman__button" onClick={() => navigate('/')}>
        Back to Menu
      </button>
    </div>
  );
};

export default Hangman;
