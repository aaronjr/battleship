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
      board[start + end] = null;
    }
  }

  // loop through coordinates (a1 - a5) and check all are empty
  const checkNull = (l, n, length) => {
    for (let i = n; (i - n) < length; i += 1) {
      if (board[l + i] != null) {
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
        for (let i = n; (i - n) < length; i += 1) {
          // if clear add ship to each square
          board[l + i] = ship;
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
  const hit = (location) => (!hitLocations.includes(location));

  // add to array to log all hits.
  const updateHit = (location) => hitLocations.push(location);

  // add hit to board
  const recieveHit = (location) => {
    // if there is a ship here
    if (board[location] !== null) {
      // save as a ship
      const ship = board[location];
      // check the ship is alive and user hasnt been here yet
      if (ship.alive() === true && hit(location) === true) {
        // hit ship
        ship.hit();
        // update hit to array
        updateHit(location);
        console.log('hit');
        return true;
      }
      console.log(hitLocations);
      console.log('already been here');
      return false;
    }
    // ive missed, still add hit to array
    updateHit(location);
    console.log('missed ship, shot logged');
    return true;
  };

  const checkAlive = () => {
    const alive = ships.filter((ship) => ship.alive());
    console.log(alive.length);
    return !!alive.length;
  };

  return {
    placeShips, printBoard, recieveHit, checkAlive, hitLocations, ships,
  };
};

export default gameboard;
