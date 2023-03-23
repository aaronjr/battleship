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
    // return the coords, returned by random function
    return random(letters, length);
  };

  // computer can make a random guess or side shot if last was succesful
  const computerAttack = (board) => {
    // if last shot was wrong, make new guess
    if (lastShot.hit === false) {
      // create new guess for computer
      const guess = computerGuess();
      // save into a function to later compare
      const attempt = board.recieveHit(guess);
      if (!attempt) {
        // if shot has already been taken, recursively guess again
        lastShot.location = guess;
        lastShot.hit = false;
        return computerAttack(board);
        // if missed update lastShot correctly
      }
      if (attempt === 'miss') {
        lastShot.location = guess;
        lastShot.hit = false;
        // if hit update lastShot correctly
      } else {
        lastShot.location = guess;
        lastShot.hit = true;
      }
      // make sure next go won't overflow the board
    } else if (lastShot.location[1] < 6) {
      // increase number coord by 1
      let increase = parseInt(lastShot.location[1], 10);
      const letter = lastShot.location[0];
      increase += 1;
      // save back into location
      lastShot.location = `${letter}${increase}`;
      // save call to function in a variable to later compare
      const attempt = board.recieveHit(lastShot.location);
      // if shot already taken
      if (!attempt) {
        lastShot.hit = false;
        // new shot, but random
        computerAttack(board);
      } else if (attempt === 'miss') {
        // if missed shot, update lastshot to false
        lastShot.hit = false;
      } else {
        // if hit update last shot to hit and location already changed
        lastShot.hit = true;
      }
    } else {
      // if last shot was the last square of a row, make random shot
      lastShot.hit = false;
      computerAttack(board);
    }
  };

  // create a function that takes a user input
  // as with above checks its valid
  const playerAttack = (location, board) => !!board.recieveHit(location);

  return { computerGuess, computerAttack, playerAttack };
};

export default Player;
