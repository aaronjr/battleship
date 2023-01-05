/* eslint-disable no-undef */
import gameboard from '../gameboard';
import newShip from '../ship';

test('check to not add ship ontop of another', () => {
  const board = gameboard();
  const ship = newShip(3);
  expect(board.placeShips('a', 1, ship)).toBe(true);
  expect(board.placeShips('a', 2, ship)).toBe(false);
});

test('check to ship doesnt overflow board', () => {
  const board = gameboard();
  const ship = newShip(3);
  expect(board.placeShips('a', 5, ship)).toBe(false);
  expect(board.placeShips('a', 4, ship)).toBe(true);
});

test('add hit from board to ship', () => {
  const board = gameboard();
  const ship = newShip(3);

  board.placeShips('a', 1, ship);
  expect(board.recieveHit('a1')).toBe('hit');
  expect(board.recieveHit('a1')).toBe(false);
  expect(board.recieveHit('a2')).toBe('hit');
  expect(board.recieveHit('a6')).toBe('miss');
});

test('checkAlive, check ships are all dead when neccesary', () => {
  const boards = gameboard();
  const ship = newShip(3);

  boards.placeShips('e', 1, ship);
  boards.recieveHit('e1');
  boards.recieveHit('e2');
  expect(boards.checkAlive()).toBe(true);
  boards.recieveHit('e3');
  expect(boards.checkAlive()).toBe(false);
});
