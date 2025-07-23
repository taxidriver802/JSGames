import GameCards from '../GameCards/GameCards';
import './Main.css';

import React from 'react';

const Main = ({ onSelectGame }) => {
  return (
    <main className="main">
      <h1 className="main__title">SELECT YOUR GAME</h1>
      <div className="main__container">
        <GameCards onSelectGame={onSelectGame} />
      </div>
    </main>
  );
};

export default Main;
