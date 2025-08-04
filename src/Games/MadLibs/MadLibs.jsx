import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MadLibs.css';

import MadLibsGame from './MadLibsGame';

import madlibPhrases from '../MadLibs/MadLibsPhrases';

const MadLibs = () => {
  const navigate = useNavigate();

  const selectedPhrase =
    madlibPhrases[Math.floor(Math.random() * madlibPhrases.length)];

  return (
    <div className="madlibs">
      <h2>MadLibs</h2>
      <div className="madlibs__screen-container">
        <MadLibsGame phrase={selectedPhrase} />
        <button onClick={() => navigate('/')}>Back to Menu</button>
      </div>
    </div>
  );
};

export default MadLibs;
