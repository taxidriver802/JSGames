import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import Hangman from '../../Games/Hangman/Hangman';
import MadLibs from '../../Games/MadLibs/MadLibs';
import NumberGuess from '../../Games/NumberGuess/NumberGuess';
import RockPaperScissors from '../../Games/RockPaperScissors/RockPaperScissors';
import TicTacToe from '../../Games/TicTacToe/TicTacToe';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="app__header">
          <Header />
        </div>
        <div className="app__main">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/hangman" element={<Hangman />} />
            <Route path="/tic-tac-toe" element={<TicTacToe />} />
            <Route path="/number-guess" element={<NumberGuess />} />
            <Route
              path="/rock-paper-scissors"
              element={<RockPaperScissors />}
            />
            <Route path="/madlibs" element={<MadLibs />} />
          </Routes>
        </div>
        <div className="app__footer">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
