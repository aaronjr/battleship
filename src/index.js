import './style.css';
import newShip from './ship';
import gameboard from './gameboard';
// import Icon from './icon.png';

const board = gameboard(5);
const ship = newShip(3);
// ship.getLength()

board.placeShips('a', 1, ship);
board.placeShips('b', 2, ship);

console.log(board.printBoard());

board.recieveHit('a6');
