import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hangman.css';

import getRandomWord from './HangmanLogic';

const Hangman = () => {
  const [word, setWord] = useState('');
  const [wordLetters, setWordLetters] = useState([]);
  const [lives, setLives] = useState(6);
  const [usedLetters, setUsedLetters] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const navigate = useNavigate();

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toUpperCase().split('');

  useEffect(() => {
    let user_input = prompt('Are you ready to play? (Y/N)');
    if (user_input === 'Y') {
      setGameOver(false);
    } else {
      setGameOver(true);
    }
  }, []);

  useEffect(() => {
    if (gameOver) {
      navigate('/');
    }
  }, [gameOver, navigate]);

  useEffect(() => {
    const newWord = getRandomWord();
    setWord(newWord);
    let initialLives = 6;
    if (newWord.length > 10) {
      initialLives = 10;
    } else if (newWord.length > 5) {
      initialLives = 8;
    }
    setLives(initialLives);
  }, []);

  useEffect(() => {
    const wordLetters = new Set(word.split(''));
    setWordLetters(wordLetters);
  }, [word]);

  return (
    <div className="hangman">
      <h2>Hangman</h2>
      <p>Game Word:{word}</p>
      <button onClick={() => navigate('/')}>Back to Menu</button>
    </div>
  );
};

export default Hangman;
