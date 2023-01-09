/* eslint-disable import/prefer-default-export */
import Player from './player';
import gameboard from './gameboard';
import newShip from './ship';

// initialise two players
export const playerOne = Player();
export const computer = Player();

// create two boards
export const playerBoard = gameboard();
export const compBoard = gameboard();

// get the boards of each player
export const compDOM = compBoard.printBoard();
export const playDOM = playerBoard.printBoard();

// random letter and number generators
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const randomLetter = () => `${letters[Math.floor(Math.random() * 7)]}`;
const randomNumber = () => Math.floor(Math.random() * 7);

// ships for game and their lengths
const lengthOfShips = [5, 4, 3, 3, 2];

// fill players board, using recursion if first spot not available
const placePShips = (ship) => {
  if (!playerBoard.placeShips(randomLetter(), randomNumber(), ship)) {
    placePShips(ship);
  }
};
// fill computers board, using recursion if first spot not available
const placeCShips = (ship) => {
  if (!compBoard.placeShips(randomLetter(letters, 7), parseInt(randomNumber(), 10), ship)) {
    placeCShips(ship);
  }
};

// randomly place each ship on each board
lengthOfShips.forEach((number) => {
  placePShips(newShip(number));
  placeCShips(newShip(number));
});
