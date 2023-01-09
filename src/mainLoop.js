/* eslint-disable no-return-assign */

import {
  playerOne, computer, playerBoard, compBoard,
} from './setup';

import createDOM from './DOM';
// create DOM export to use in index.js
export const create = createDOM();

export const main = () => {
  // game control
  let gameOver = false;
  let turn = 'player';
  const changeTurn = () => turn = turn === 'player' ? 'computer' : 'player';

  create.create();
  // create.loadDOM(); ----------------------------------
  const banner = document.querySelector('.banner');
  const playGame = (choice) => {
    // play user choice
    // check board still alive
    if (compBoard.checkAlive()) {
      // users choice and to which board
      playerOne.playerAttack(choice, compBoard);
      create.loadDOM();
      changeTurn();
      // if computer board is finished then return
      // winner and update board
      if (!(compBoard.checkAlive())) {
        gameOver = true;
        create.loadDOM();
        banner.textContent = 'Congratulations, you won';
        create.again();
      }
    }

    // check user still in play
    if (playerBoard.checkAlive()) {
      // play computer guess
      // will use recusion to find an acceptable shot
      computer.computerAttack(playerBoard);
      create.loadDOM();
      // if player board is finished then return
      // winner and update board
      if (!(playerBoard.checkAlive())) {
        gameOver = true;
        create.loadDOM();
        banner.textContent = 'Better luck next time, the computer won';
        create.again();
      }
      changeTurn();
    }
    // if either is dead
    // offer to start again
  };

  // add event listeners to the correct squares
  // game plays on user input - auto computer shot
  const boxes = document.querySelectorAll('[who="C"]');
  boxes.forEach((box) => {
    box.addEventListener('click', () => {
      const hit = box.style.backgroundColor === 'red';
      const miss = box.style.backgroundColor === 'green';
      const available = !!(miss === false && hit === false);
      if (!gameOver && turn === 'player' && available === true) {
        playGame(box.attributes.target.value);
      }
    });
  });
};
