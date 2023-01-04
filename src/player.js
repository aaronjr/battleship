/* eslint-disable no-return-assign */

const Player = () => {
  
  const random = (letter, number) => {
    const firstNumber = Math.floor(Math.random() * number);
    const secondNumber = Math.floor(Math.random() * number);
    return `${letter[firstNumber]}${secondNumber}`;
  };

  const computerGuess = () => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const { length } = letters;

    return random(letters, length);
  };

  return { changeTurn, computerGuess };
};

export default Player;
