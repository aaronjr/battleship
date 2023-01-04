/* eslint-disable no-return-assign */
import gameboard from './gameboard';
import Player from './player';
import newShip from './ship';

const mainLoop = () => {
  // initialise two players
  const playerOne = Player();
  const computer = Player();

  // initialise to computer, so player goes first
  let lastGo = computer;
  const changeTurn = () => lastGo = lastGo === computer ? playerOne : computer;

  // create two boards
  const playerBoard = gameboard();
  const compBoard = gameboard();

  // random letter and number generators
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  const randomLetter = (letter, number) => `${letter[Math.floor(Math.random() * number)]}`;
  const randomNumber = () => `${Math.floor(Math.random() * 7)}`;

  // ships for game and their lengths
  const lengthOfShips = [5, 4, 3, 3, 2];

  // fill players board, using recursion if first spot not available
  const placePShips = (ship) => {
    if (!playerBoard.placeShips(randomLetter(letters, 7), parseInt(randomNumber(), 10), ship)) {
      placePShips(ship);
    }
  };
  // fill computers board, using recursion if first spot not available
  const placeCShips = (ship) => {
    if (!compBoard.placeShips(randomLetter(letters, 7), parseInt(randomNumber(), 10), ship)) {
      placeCShips(ship);
    }
  };
  // place each ship on each board
  lengthOfShips.forEach((number) => {
    placePShips(newShip(number));
    placeCShips(newShip(number));
  });

  console.log(playerBoard.printBoard());
  console.log(compBoard.printBoard());

  // set first go to player one
  changeTurn();

  return { };
};

export default mainLoop;
