export const getAttemptsForRange = (maxNum, difficulty) => {
  let modifier = 2;
  if (difficulty === 'easy') modifier = 4;
  else if (difficulty === 'hard') modifier = 1;

  return Math.ceil(Math.log2(maxNum)) + modifier;
};

export const getDirectionFeedback = (guess, target) => {
  if (guess < target) return `${guess} is too low`;
  if (guess > target) return `${guess} is too high`;
  return `${guess} is correct!`;
};

export const generateRandomTarget = (maxNum) =>
  Math.floor(Math.random() * maxNum) + 1;
