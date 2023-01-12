/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { compBoard } from './setup';

export const fillSide = () => {
  const holder = document.querySelector('.shipHolder');
  const topOfHolder = document.createElement('div');
  topOfHolder.className += 'top';
  topOfHolder.textContent = 'Enemy ships';
  holder.append(topOfHolder);
  const ships = compBoard.shipList();

  ships.forEach((ship, index) => {
    const length = ship.getLength();
    const div = document.createElement('div');
    div.className += 'ship';
    div.setAttribute('ship', index);
    for (let i = 0; i < length; i += 1) {
      const box = document.createElement('div');
      box.className = 'part';
      div.append(box);
    }
    holder.append(div);
  });
};

export const updateSide = () => {
  const ships = compBoard.shipList();
  ships.forEach((ship, index) => {
    const hits = ship.hitCount() - 1;
    const children = [...document.querySelector(`[ship="${index}"]`).children];
    children.forEach((child, i) => { if (i <= hits) { child.style.backgroundColor = 'red'; } });
  });
};
