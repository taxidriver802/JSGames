import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './NumberGuess.css';

import {
  getAttemptsForRange,
  getDirectionFeedback,
  generateRandomTarget,
} from './NumberGuessLogic';

import { getStoredStat, setStoredStat } from '../../utils/utils';

const NumberGuess = () => {
  const navigate = useNavigate();

  const [max, setMax] = useState('');
  const [target, setTarget] = useState(null);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [difficulty, setDifficulty] = useState('medium');

  useEffect(() => {
    setWins(getStoredStat('numberguess', 'Wins'));
    setLosses(getStoredStat('numberguess', 'Losses'));
  }, []);

  const startGame = useCallback(() => {
    const maxNum = parseInt(max, 10);
    if (!isNaN(maxNum) && maxNum > 1) {
      const calculatedAttempts = getAttemptsForRange(maxNum, difficulty);

      setAttempts(calculatedAttempts);
      setTarget(generateRandomTarget(maxNum));
      setGameStarted(true);
      setFeedback('');
      setGuess('');
      setIsCorrect(false);
    } else {
      setFeedback('Please enter a valid number > 1.');
    }
  }, [max, difficulty]);

  const handleGuess = useCallback(() => {
    const num = parseInt(guess, 10);
    setGuess('');

    if (isNaN(num)) {
      setFeedback('That’s not a number!');
      return;
    }

    const feedbackText = getDirectionFeedback(num, target);
    setFeedback(feedbackText);

    if (feedbackText.includes('correct')) {
      setIsCorrect(true);
      setWins((prev) => {
        const updated = prev + 1;
        setStoredStat('numberGuess', 'Wins', updated);
        return updated;
      });

      return;
    }

    setAttempts((prev) => {
      const remaining = prev - 1;
      if (remaining <= 0) {
        setFeedback('You lost!');
        setLosses((prev) => {
          const updated = prev + 1;
          setStoredStat('numberGuess', 'Losses', updated);
          return updated;
        });

        setGameStarted(false);
      }
      return remaining;
    });
  }, [guess, target]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        if (!gameStarted) {
          startGame();
        } else if (!isCorrect) {
          handleGuess();
        }
      }
    },
    [handleGuess, startGame, gameStarted, isCorrect]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const resetGame = () => {
    setMax(max);
    setTarget(null);
    setGuess('');
    setFeedback('');
    setAttempts(0);
    setGameStarted(false);
    setIsCorrect(false);
  };

  return (
    <>
      <div className="game__container">
        <h2 className="game__title">Number Guess</h2>
        <div className="game__rules">
          <p className="game__rules-text">
            1. Set a max number for the guessing range.
            <br />
            2. Select a difficulty, which determines how many attempts you get.
            <br />
            3. Keep guessing until you find the correct number or run out of
            attempts!
          </p>
        </div>

        {!gameStarted ? (
          <div className="game__setup">
            <div className="game__setup-max-container">
              <label>Set Max Number:</label>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="game__input"
              />
            </div>
            <label>Select Difficulty:</label>
            <div className="game__button--diff-container">
              {['easy', 'medium', 'hard'].map((level) => (
                <button
                  key={level}
                  type="button"
                  className={`game__button game__button--diff ${
                    difficulty === level ? 'selected' : ''
                  }`}
                  onClick={() => setDifficulty(level)}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>

            <button className="game__button" onClick={startGame}>
              Start
            </button>
          </div>
        ) : (
          <div className="game__play">
            <p>Guess a number between 1 and {max}:</p>
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="game__input"
              disabled={isCorrect || attempts <= 0}
            />
            {!isCorrect && attempts > 0 && (
              <button
                className="game__button game__buttom-submit"
                onClick={handleGuess}
              >
                Submit Guess
              </button>
            )}

            <p className="game__feedback">{feedback}</p>
            <p>Attempts left: {attempts}</p>
            <div className="game__buttons">
              <button className="game__button" onClick={resetGame}>
                Reset
              </button>
            </div>
          </div>
        )}
        <div className="game__stats">
          <p>Wins: {wins}</p>
          <p>Losses: {losses}</p>
        </div>
      </div>
      <div className="exit_game">
        <button
          className="game__button"
          type="button"
          onClick={() => navigate('/')}
        >
          Back to Menu
        </button>
      </div>
    </>
  );
};

export default NumberGuess;
