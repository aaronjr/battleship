/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

import updateComputerBoardDOM from './updateComputerBoardDOM';
import updatePlayerBoardDOM from './updatePlayerBoardDOM';

const createDOM = () => {
  const create = () => {
    // set up of main body
    const body = document.querySelector('body');
    const banner = document.createElement('div');
    const footer = document.createElement('div');
    const container = document.createElement('div');
    banner.className += 'banner';
    container.className += 'container';
    footer.className += 'footer';
    const button = document.createElement('button');
    button.className += 'start';
    button.textContent = 'START';
    footer.append(button);
    body.append(banner);
    body.append(container);
    body.append(footer);

    // set up boards
    const boardOne = document.createElement('div');
    const boardTwo = document.createElement('div');
    boardOne.className = 'boardOne';
    boardTwo.className = 'boardTwo';

    // loop through and create 7 x 7 board - a0, a1 ... g6
    // create boxes for each board with different names
    // so DOM can be updated accuretly
    // letters
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
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
  };

  const loadDOM = () => {
    // load loaded board to screen
    updateComputerBoardDOM();
    updatePlayerBoardDOM();
  };

  const again = () => {
    const button = document.querySelector('.start');
    button.className = 'end';
    button.style.display = 'block';
    button.textContent = 'Play again?';
    button.addEventListener('click', () => {
      window.location.reload();
      return false;
    });
  };

  return { create, loadDOM, again };
};

export default createDOM;
