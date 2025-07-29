export const getStoredStat = (game, stat) => {
  const value = localStorage.getItem(
    `${game.toLowerCase()}${stat.toLowerCase()}`
  );
  return value ? parseInt(value, 10) : 0;
};

export const setStoredStat = (game, stat, value) => {
  localStorage.setItem(`${game.toLowerCase()}${stat.toLowerCase()}`, value);
};
