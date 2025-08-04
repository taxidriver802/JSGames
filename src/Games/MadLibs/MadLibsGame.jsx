import React, { useState } from 'react';

const MadLibsGame = ({ phrase }) => {
  const extractPlaceholders = (template) => {
    const matches = [...template.matchAll(/{(.*?)}/g)];
    return matches.map((match) => match[1]);
  };

  const gamePhrase = phrase.phrase;
  const placeholders = extractPlaceholders(gamePhrase);

  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState({});
  const [currentInput, setCurrentInput] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const rawPlaceholder = placeholders[step];
  const currentPlaceholder =
    rawPlaceholder.charAt(0).toUpperCase() + rawPlaceholder.slice(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    setInputs((prev) => ({
      ...prev,
      [rawPlaceholder]: currentInput,
    }));

    setCurrentInput('');

    if (step < placeholders.length - 1) {
      setStep(step + 1);
    } else {
      setIsComplete(true);
    }
  };

  const fillPhrase = () =>
    gamePhrase.replace(/{(.*?)}/g, (_, key) => inputs[key] || `[${key}]`);

  const getArticle = (word) => {
    return /^[aeiou]/i.test(word) ? 'an' : 'a';
  };

  return (
    <div className="madlib__game-container">
      <div className="madlib__phrase-container">
        <h1 className="madlib__title">{`Theme: ${phrase.title}`}</h1>
        {!isComplete && <p className="madlib__phrase">{phrase.phrase}</p>}
      </div>

      <div className="madlib__input-container">
        {!isComplete ? (
          <form onSubmit={handleSubmit} className="madlibs__question-form">
            <div className="question__form-container">
              <div className="question__form-input-container">
                <label htmlFor="input">{`Fill in ${getArticle(
                  currentPlaceholder
                )}: `}</label>
                <input
                  type="text"
                  id="input"
                  value={currentInput}
                  placeholder={currentPlaceholder}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <small>{placeholders.length - step - 1} questions left</small>
            </div>
            <button type="submit">Next</button>
          </form>
        ) : (
          <div className="madlib__result">
            <h3>Your Story:</h3>
            <p>{fillPhrase()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MadLibsGame;
