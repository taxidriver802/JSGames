import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GameCards.css';

import GameCard from '../GameCard/GameCard';

const GameCards = () => {
  const navigate = useNavigate();
  const games = [
    { title: 'Tic Tac Toe', path: '/tic-tac-toe' },
    { title: 'Hangman', path: '/hangman' },
    { title: 'Number Guess', path: '/number-guess' },
    { title: 'Rock Paper Scissors', path: '/rock-paper-scissors' },
    { title: 'Madlibs', path: '/madlibs' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="game__cards">
      {games.map((game) => (
        <GameCard
          key={game.title}
          title={game.title}
          onClick={() => handleNavigate(game.path)}
        />
      ))}
    </div>
  );
};

export default GameCards;
