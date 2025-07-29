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

import { getStoredStat, setStoredStat } from '../../utils/utils';

const Hangman = () => {
  const [word, setWord] = useState('');
  const [lives, setLives] = useState(6);
  const [usedLetters, setUsedLetters] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  useEffect(() => {
    setWins(getStoredStat('hangman', 'Wins'));
    setLosses(getStoredStat('hangman', 'Losses'));
  }, []);

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
      setLosses((prev) => {
        const updated = prev + 1;
        setStoredStat('hangman', 'Losses', updated);
        return updated;
      });
    }
  }, [lives]);

  useEffect(() => {
    if (usedLetters.length === 0) return;

    if (isGameWon(word, usedLetters)) {
      setGameWon(true);
      setWins((prev) => {
        const updated = prev + 1;
        setStoredStat('hangman', 'Wins', updated);
        return updated;
      });
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

  return (
    <div className="hangman">
      <h2>Hangman</h2>
      <div className="hangman__container">
        <div className="hangman__container-info">
          <div className="hangman__description">
            <p className="hangman__description-title">Description:</p>
            <p className="hangman__description-word">
              Guess the hidden word one letter at a time. Each incorrect guess
              brings the hangman closer to completion. Can you solve the word
              before you run out of lives?
            </p>
          </div>
          <div className="hangman__container-alphabet">
            <p>Used Letters:{usedLetters.join(', ')}</p>
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
            <div className="hangman__container-winloss">
              <p>Games Won:{wins}</p>
              <p>Games Lost:{losses}</p>
            </div>
          </div>
        </div>
        <div className="hangman__container-screen">
          <div className="hangman__container-screen-img-container">
            <p className="hangman__container-screen-img-lives">Lives:{lives}</p>
            {lives !== 0 ? (
              <img
                src={`${process.env.PUBLIC_URL}/assets/Hangman/hangman${lives}.svg`}
                alt="Hangman"
                className="hangman__container-screen-img"
              />
            ) : (
              <img
                src={`${process.env.PUBLIC_URL}/assets/Hangman/hangman10_with_x_eyes.svg`}
                alt="Hangman"
                className="hangman__container-screen-img"
              />
            )}
          </div>

          <p>Game Word: {getDisplayWord(word, usedLetters)}</p>
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
