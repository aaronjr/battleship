/* eslint-disable no-alert */
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
  let lastGo = 'computer';
  const changeTurn = () => lastGo = lastGo === 'computer' ? 'playerOne' : 'computer';

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

  // set up behind boards
  const body = document.querySelector('body');
  const container = document.createElement('div');
  container.className = 'container';
  body.append(container);

  // set up boards
  const boardOne = document.createElement('div');
  const boardTwo = document.createElement('div');
  boardOne.className = 'boardOne';
  boardTwo.className = 'boardTwo';

  // loop through and create 7 x 7 board - a0, a1 ... g6
  // create boxes for each board with different names
  // so DOM can be updated accuretly
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
  // add boards to background
  container.append(boardOne);
  container.append(boardTwo);

  // get the boards of each player
  const compDOM = compBoard.printBoard();
  const playDOM = playerBoard.printBoard();

  // loop through the board and update the colours accorinding to data
  // using 'WHO="?"' to select correctly
  const updateComputerBoardDOM = () => {
    for (const item in compDOM) {
      if (compDOM[item].history === true) {
        const a = document.querySelector(`[target="${compDOM[item].location}"][who="C"]`);
        a.style.backgroundColor = 'green';
      }
      if (compDOM[item].hit === true) {
        const a = document.querySelector(`[target="${compDOM[item].location}"][who="C"]`);
        a.style.backgroundColor = 'red';
      }
    }
  };

  // loop through the board and update the colours accorinding to data
  const updatePlayerBoardDOM = () => {
    for (const item in playDOM) {
      if (playDOM[item].ship) {
        const a = document.querySelector(`[target="${item}"][who="P"]`);
        a.style.backgroundColor = 'black';
      }
      if (playDOM[item].history === true) {
        const a = document.querySelector(`[target="${playDOM[item].location}"][who="P"]`);
        a.style.backgroundColor = 'green';
      }
      if (playDOM[item].hit === true) {
        const a = document.querySelector(`[target="${playDOM[item].location}"][who="P"]`);
        a.style.backgroundColor = 'red';
      }
    }
  };

  const playGame = () => {
    // change player from last go
    changeTurn();
    const player = lastGo;
    // update latest board
    updatePlayerBoardDOM();
    updateComputerBoardDOM();

    // play computers choice and update accordingly
    // use recusion to playGame if game not over
    if (player === 'computer') {
      if (playerBoard.checkAlive()) {
        computer.computerAttack(playerBoard);
        updatePlayerBoardDOM();
        if ((playerBoard.checkAlive())) {
          setTimeout(() => { playGame(); }, 500);
        } else {
          updatePlayerBoardDOM();
          console.log('Computer won');
          return true;
        }
      }

      // players go and update accordingly
      // use recusion to playGame if game not over
    } else if (player === 'playerOne') {
      if (compBoard.checkAlive()) {
        playerOne.computerAttack(compBoard);
        updateComputerBoardDOM();
        if ((compBoard.checkAlive())) {
          setTimeout(() => { playGame(); }, 500);
        } else {
          updateComputerBoardDOM();
          console.log('playerOne won');
          return true;
        }
      }
    }
    return true;
  };

  // add button for start game
  return { playGame };
};

export default mainLoop;
