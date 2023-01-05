/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
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
  console.log(compBoard.printBoard());
  playerOne.computerAttack(compBoard);
  playerOne.computerAttack(compBoard);
  playerOne.computerAttack(compBoard);
  playerOne.computerAttack(compBoard);
  playerOne.computerAttack(compBoard);
  playerOne.computerAttack(compBoard);
  playerOne.computerAttack(compBoard);
  playerOne.computerAttack(compBoard);
  playerOne.computerAttack(compBoard);

  // set first go to player one
  changeTurn();

  //
  // above here is game setup
  //

  const body = document.querySelector('body');
  console.log(body);
  const container = document.createElement('div');
  container.className = 'container';
  body.append(container);

  const boardOne = document.createElement('div');
  const boardTwo = document.createElement('div');

  boardOne.className = 'boardOne';
  boardTwo.className = 'boardTwo';

  // loop through and create 7 x 7 board - a0, a1 ... g6
  for (const letter in letters) {
    for (const number in letters) {
      const start = letters[letter];
      const end = number;
      const box1 = document.createElement('div');
      const box2 = document.createElement('div');

      box1.className = 'box';
      box1.setAttribute('who', 'P');
      box1.setAttribute('target', `${start + end}`);

      box2.className = 'box';
      box2.setAttribute('who', 'C');
      box2.setAttribute('target', `${start + end}`);

      boardOne.append(box1);
      boardTwo.append(box2);
    }
  }
  container.append(boardOne);
  container.append(boardTwo);

  const compDOM = compBoard.hitLocations;
  const playDOM = playerBoard.printBoard();

  // this is map for computers pieces
  for (const item in compDOM) {
    const a = document.querySelector(`[target="${compDOM[item]}"][who="C"]`);
    a.style.backgroundColor = 'red';
  }

  for (const item in playDOM) {
    if (playDOM[item].ship) {
      const a = document.querySelector(`[target="${item}"][who="P"]`);
      a.style.backgroundColor = 'black';
    }
  }
};

export default mainLoop;
