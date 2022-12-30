/* eslint-disable no-undef */
import newShip from "../ship";

test('ship length - should be unaccesible', () => {
  const ship = newShip(1);
  expect(ship.length).toBe(undefined)
});

test('getLength returns length', () => {
  const ship2 = newShip(5);
  const getLength = ship2.getLength()
  expect(getLength).toBe(5)
});

test('count length - should be unaccesible', () => {
  const ship = newShip(1);
  expect(ship.count).toBe(undefined)
});

test('hit count updates on hit', () => {
  const ship = newShip(1);
  ship.hit()
  expect(ship.hitCount()).toBe(1)
  ship.hit()
  ship.hit()
  expect(ship.hitCount()).toBe(3)
});

test('checks if ship is afloat', () => {
  const ship = newShip(1);
  expect(ship.alive()).toBe(true)
  ship.hit()
  expect(ship.alive()).toBe(false)
});
