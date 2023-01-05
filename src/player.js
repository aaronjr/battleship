/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
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
    if (lastShot.hit === false) {
      // create new guess for computer
      const guess = computerGuess();
      const attempt = board.recieveHit(guess);
      if (!attempt) {
        lastShot.location = guess;
        lastShot.hit = false;
        return computerAttack(board);
      } if (attempt === 'miss') {
        lastShot.location = guess;
        lastShot.hit = false;
      } else {
        lastShot.location = guess;
        lastShot.hit = true;
      }
    } else if (lastShot.location[1] < 6) {
      let increase = parseInt(lastShot.location[1], 10);
      const letter = lastShot.location[0];
      increase += 1;
      lastShot.location = `${letter}${increase}`;
      const attempt = board.recieveHit(lastShot.location);
      if (!attempt) {
        lastShot.hit = false;
        computerAttack(board);
      } else if (attempt === 'miss') {
        lastShot.hit = false;
      } else {
        lastShot.hit = true;
      }
    } else {
      lastShot.hit = false;
      computerAttack(board);
    }
  };

  return { computerGuess, computerAttack };
};

export default Player;
