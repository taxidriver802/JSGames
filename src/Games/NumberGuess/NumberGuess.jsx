import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NumberGuess.css';

const NumberGuess = () => {
  const navigate = useNavigate();
  return (
    <div className="number-guess">
      <h2>NumberGuess</h2>
      <p>Game will go here...</p>
      <button onClick={() => navigate('/')}>Back to Menu</button>
    </div>
  );
};

export default NumberGuess;
