import React from 'react';
import './GameCard.css';

const GameCard = ({ title, onClick }) => {
  return (
    <button className="game__card" type="button" onClick={onClick}>
      <h1 className="game__card-title">{title}</h1>
    </button>
  );
};

export default GameCard;
