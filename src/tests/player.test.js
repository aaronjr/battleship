/* eslint-disable no-undef */
import Player from '../player';

test('change turn', () => {
  const player = Player();
  expect(player.changeTurn()).toBe('a');
  expect(player.changeTurn()).toBe('b');
  expect(player.changeTurn()).toBe('a');
});

test('computerGuess', () => {
  const player = Player();
  const guess = player.computerGuess();
  expect(guess.length).toBe(2);
});
