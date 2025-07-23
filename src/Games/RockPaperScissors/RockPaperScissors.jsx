import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RockPaperScissors.css';

const RockPaperScissors = () => {
  const navigate = useNavigate();
  return (
    <div className="rock-paper-scissors">
      <h2>RockPaperScissors</h2>
      <p>Game will go here...</p>
      <button onClick={() => navigate('/')}>Back to Menu</button>
    </div>
  );
};

export default RockPaperScissors;
