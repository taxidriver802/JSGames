import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MadLibs.css';

const MadLibs = () => {
  const navigate = useNavigate();
  return (
    <div className="madlibs">
      <h2>MadLibs</h2>
      <p>Game will go here...</p>
      <button onClick={() => navigate('/')}>Back to Menu</button>
    </div>
  );
};

export default MadLibs;
