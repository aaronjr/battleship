/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
// loop through the board and update the colours accorinding to data
// using 'WHO="?"' to select correctly

import { compDOM } from './setup';

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

export default updateComputerBoardDOM;
