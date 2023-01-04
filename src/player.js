/* eslint-disable no-return-assign */

const Player = () => {
  // keep track off last shot and if succesful
  const lastShot = {
    location: '',
    hit: false,
  };

  // get random coordinates
  const random = (letter, number) => {
    const firstNumber = Math.floor(Math.random() * number);
    const secondNumber = Math.floor(Math.random() * number);
    return `${letter[firstNumber]}${secondNumber}`;
  };

  // get random coords
  const computerGuess = () => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const { length } = letters;

    return random(letters, length);
  };

  // computer can make a random guess or side shot if last was succesful
  const computerAttack = (board) => {
    // create new guess for computer
    const guess = computerGuess();
    if (!board.recieveHit(guess)) {
      lastShot.location = guess;
      lastShot.hit = false;
      computerAttack(board);
    }
    lastShot.location = guess;
    lastShot.hit = true;
  };

  return { computerAttack };
};

export default Player;
