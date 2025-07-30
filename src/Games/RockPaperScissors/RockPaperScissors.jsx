import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getStoredStat, setStoredStat } from '../../utils/utils';

import { Mountain, ScrollText, Scissors } from 'lucide-react';

import './RockPaperScissors.css';

const RockPaperScissors = () => {
  const [userChoice, setUserChoice] = useState({
    choiceName: '',
    choiceIcon: null,
  });
  const [cpuChoice, setCpuChoice] = useState({
    choiceName: '',
    choiceIcon: null,
  });
  const [wins, setWins] = useState(() => getStoredStat('rps', 'Wins'));
  const [losses, setLosses] = useState(() => getStoredStat('rps', 'Losses'));
  const [ties, setTies] = useState(() => getStoredStat('rps', 'Ties'));
  const [feedback, setFeedback] = useState('');

  const navigate = useNavigate();

  const choices = [
    { name: 'Rock', icon: <Mountain /> },
    { name: 'Paper', icon: <ScrollText /> },
    { name: 'Scissors', icon: <Scissors /> },
  ];

  const handleVsClick = () => {
    console.log(userChoice);

    if (userChoice.choiceName === '') {
      return setFeedback('No choice selected.');
    }

    // Randomly select CPU choice
    const randomIndex = Math.floor(Math.random() * choices.length);
    const cpuSelection = choices[randomIndex];

    setCpuChoice({
      choiceName: cpuSelection.name,
      choiceIcon: cpuSelection.icon,
    });

    // Determine winner
    const userChoiceName = userChoice.choiceName;
    const cpuChoiceName = cpuSelection.name;

    if (userChoiceName === cpuChoiceName) {
      setFeedback("It's a tie!");
      setTies((prev) => {
        const updated = prev + 1;
        setStoredStat('rps', 'Ties', updated);
        return updated;
      });
    } else if (
      (userChoiceName === 'Rock' && cpuChoiceName === 'Scissors') ||
      (userChoiceName === 'Paper' && cpuChoiceName === 'Rock') ||
      (userChoiceName === 'Scissors' && cpuChoiceName === 'Paper')
    ) {
      setFeedback('You win!');
      setWins((prev) => {
        const updated = prev + 1;
        setStoredStat('rps', 'Wins', updated);
        return updated;
      });
    } else {
      setFeedback('You lose!');
      setLosses((prev) => {
        const updated = prev + 1;
        setStoredStat('rps', 'Losses', updated);
        return updated;
      });
    }
  };

  return (
    <div className="rock-paper-scissors">
      <h2 className="rps__container-title">Rock Paper Scissors</h2>
      <div className="rps__container">
        <div className="rps__container-game">
          <div className="rps__container-game-user">
            <div className="selection__container">
              <div className="rps__game-user-choice">
                {userChoice.choiceIcon}
              </div>
              <div className="rps__game-user-choice">
                {userChoice.choiceName}
              </div>
            </div>
            <div className="rps__game-user-container">
              <div className="game-choices">
                {choices.map(({ name, icon }) => (
                  <button
                    className="rps__choice"
                    key={name}
                    onClick={() =>
                      setUserChoice({ choiceName: name, choiceIcon: icon })
                    }
                  >
                    {icon}
                    <p>{name}</p>
                  </button>
                ))}
              </div>
              <p>You</p>
            </div>
          </div>
          <div className="rps__container-submit">
            <button className="rps__choice rps__submit" onClick={handleVsClick}>
              VS.
            </button>
          </div>
          <div className="rps__container-game-opp ">
            <div className="selection__container-opp">
              <div className="rps__game-user-choice">
                {cpuChoice.choiceIcon}
              </div>
              <div className="rps__game-user-choice">
                {cpuChoice.choiceName}
              </div>
            </div>
            <div className="rps__game-opp-choice">
              <div className="game-choices">
                {choices.map(({ name, icon }) => (
                  <button className="rps__choice" key={name}>
                    {icon}
                    <p>{name}</p>
                  </button>
                ))}
              </div>
              <p>Opponent</p>
            </div>
          </div>
        </div>
        <div className="rps__feedback">
          {feedback}
          <div className="rps__container-winloss">
            <div className="winloss-container">
              <p>Wins: {wins}</p>
              <p>Losses: {losses}</p>
            </div>
            <p>Ties: {ties}</p>
          </div>
        </div>
        <div className="rps__description">
          <h3>How to Play:</h3>
          <p>
            Choose Rock, Paper, or Scissors. Rock beats Scissors, Scissors beats
            Paper, and Paper beats Rock.
          </p>
        </div>
      </div>
      <button className="exit__game-rps" onClick={() => navigate('/')}>
        Back to Menu
      </button>
    </div>
  );
};

export default RockPaperScissors;
