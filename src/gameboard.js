/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

const gameboard = () => {
  // 7 x 7 grid
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  // array to log current hits
  const hitLocations = [];
  // empty board array
  const board = {};
  // list of ships on board
  const ships = [];

  // loop through and create 7 x 7 board - a0, a1 ... g6
  for (const letter in letters) {
    for (const number in letters) {
      const start = letters[letter];
      const end = number;
      board[start + end] = { ship: null };
      board[start + end] = { history: null };
      board[start + end] = { hit: null };
    }
  }

  // loop through coordinates (a1 - a5) and check all are empty
  const checkNull = (l, n, length) => {
    for (let i = n; i - n < length; i += 1) {
      if (board[l + i].ship != null) {
        return false;
      }
    }
    return true;
  };

  // place ship onto board
  const placeShips = (l, n, ship) => {
    // store length
    const length = ship.getLength();
    // check ship will fit onto board
    if (n + length <= 7) {
      // check all spots for the ship will occupy are empty
      if (checkNull(l, n, length)) {
        ships.push(ship);
        for (let i = n; i - n < length; i += 1) {
          // if clear add ship to each square
          board[l + i].ship = ship;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
    // if ship layed succesfully, return true
    return true;
  };

  // print board
  const printBoard = () => board;

  // check an ship hasn't already been hit
  const hit = (location) => !hitLocations.includes(location);

  // add to array to log all hits.
  const updateHit = (location) => hitLocations.push(location);

  // add hit to board
  const recieveHit = (location) => {
    // check for duplicate shot
    if (hit(location) === true) {
      // if there is a ship here
      // eslint-disable-next-line prefer-destructuring, dot-notation
      const ship = board[location]['ship'];
      // this ship should be a ship but its undefined
      console.log(ship);
      if (ship !== null) {
        // check the ship is alive and user hasnt been here yet
        if (ship.alive() === true) {
          // hit ship
          ship.hit();
          // update board array of hit locations
          updateHit(location);
          console.log(location, 'hit');
          return 'hit';
        }
      } else {
        updateHit(location);
        console.log(location, 'miss');
        return 'miss';
      }
    } else {
      console.log(location, 'taken');
      return false;
    }
  };

  const checkAlive = () => {
    const alive = ships.filter((ship) => ship.alive());
    return !!alive.length;
  };

  return {
    placeShips,
    printBoard,
    recieveHit,
    checkAlive,
    hitLocations,
  };
};

export default gameboard;
