/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
// loop through the board and update the colours accorinding to data
// using 'WHO="?"' to select correctly
// loop through the board and update the colours accorinding to data

import { playDOM } from './setup';

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

export default updatePlayerBoardDOM;
