import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TicTacToe.css';

import { getCpuMove, getPositionClass, checkWinner } from './TicTacToeLogic';
import { getStoredStat, setStoredStat } from '../../utils/utils';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [showPieceSelect, setShowPieceSelect] = useState(true);
  const [userPiece, setUserPiece] = useState(null);
  const [whoseTurn, setWhoseTurn] = useState('X');
  const [winner, setWinner] = useState(null);

  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [ties, setTies] = useState(0);

  useEffect(() => {
    setWins(getStoredStat('tictactoe', 'Wins'));
    setLosses(getStoredStat('tictactoe', 'Losses'));
    setTies(getStoredStat('tictactoe', 'Ties'));
  }, []);

  useEffect(() => {
    setStoredStat('tictactoe', 'Wins', wins);
  }, [wins]);

  useEffect(() => {
    setStoredStat('tictactoe', 'Losses', losses);
  }, [losses]);

  useEffect(() => {
    setStoredStat('tictactoe', 'Ties', ties);
  }, [ties]);

  const navigate = useNavigate();

  const handleBoxClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = whoseTurn;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    const isTie = newBoard.every((cell) => cell !== null);

    if (!result && isTie) {
      setWinner('tie');
      setTies((prev) => prev + 1);
      return;
    }

    if (result) {
      setWinner(result);
      if (result === userPiece) {
        setWins((prev) => prev + 1);
      } else {
        setLosses((prev) => prev + 1);
      }
      return;
    }

    setWhoseTurn((prev) => (prev === 'X' ? 'O' : 'X'));
  };

  const handlePieceChoice = (piece) => {
    setUserPiece(piece);
    setWhoseTurn('X');
    setShowPieceSelect(false);
  };

  useEffect(() => {
    if (!userPiece || winner) return;
    if (whoseTurn !== userPiece) {
      const cpuIndex = getCpuMove(board);
      if (cpuIndex !== undefined) {
        const newBoard = [...board];
        newBoard[cpuIndex] = whoseTurn;

        setTimeout(() => {
          setBoard(newBoard);
          const result = checkWinner(newBoard);
          const isTie = newBoard.every((cell) => cell !== null);

          if (!result && isTie) {
            setWinner('tie');
            setTies((prev) => prev + 1);
            return;
          }

          if (result) {
            setWinner(result);
            result === userPiece
              ? setWins((prev) => prev + 1)
              : setLosses((prev) => prev + 1);
          } else {
            setWhoseTurn(userPiece);
          }
        }, 500);
      }
    }
  }, [whoseTurn, userPiece, winner, board]);

  return (
    <div className="tictactoe">
      <h2 className="tictactoe__title">TicTacToe</h2>
      {showPieceSelect && (
        <div className="overlay">
          <div className="piece-select-modal">
            <h3>Choose Your Piece</h3>
            <div className="piece-buttons">
              <button onClick={() => handlePieceChoice('X')}>X</button>
              <button onClick={() => handlePieceChoice('O')}>O</button>
            </div>
          </div>
        </div>
      )}
      <div className="ttt__game-container">
        <div className="style-container">
          <div className="piece__container">
            {userPiece}
            <p>YOU</p>
            {whoseTurn === userPiece && (
              <span className="turn-indicator" title="Your turn"></span>
            )}
          </div>

          <div className="ttt__grid">
            {board.map((value, index) => (
              <button
                key={index}
                className={`ttt__grid-el ${getPositionClass(index)}`}
                onClick={() => handleBoxClick(index)}
                disabled={board[index] || whoseTurn !== userPiece}
              >
                {value}
              </button>
            ))}
          </div>

          <div className="piece__container">
            {userPiece === 'X' ? 'O' : 'X'}
            <p>CPU</p>
            {whoseTurn !== userPiece && (
              <span className="turn-indicator" title="Your turn"></span>
            )}
          </div>
        </div>
        {winner && (
          <div className="winner__overlay">
            <h3>
              {winner === 'tie'
                ? 'It’s a Tie!'
                : winner === userPiece
                ? 'You Win!'
                : 'CPU Wins!'}
            </h3>

            <button
              onClick={() => {
                setBoard(Array(9).fill(null));
                setWinner(null);
                setShowPieceSelect(true);
                setUserPiece(null);
                setWhoseTurn('X');
              }}
            >
              Play Again
            </button>
          </div>
        )}
        <div className="ttt-game__stats">
          <div className="game__group">
            <p>Wins: {wins}</p>
            <p>Losses: {losses}</p>
          </div>
          <p>Ties: {ties}</p>
        </div>

        <button className="exit__button" onClick={() => navigate('/')}>
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
