/* eslint-disable no-undef */
import Player from '../player';

test('computerGuess', () => {
  const player = Player();
  const guess = player.computerGuess();
  expect(guess.length).toBe(2);
});
