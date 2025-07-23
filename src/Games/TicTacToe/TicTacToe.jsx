import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TicTacToe.css';

const TicTacToe = () => {
  const navigate = useNavigate();
  return (
    <div className="tictactoe">
      <h2 className="tictactoe__title">TicTacToe</h2>
      <p>Game will go here...</p>
      <button onClick={() => navigate('/')}>Back to Menu</button>
    </div>
  );
};

export default TicTacToe;
