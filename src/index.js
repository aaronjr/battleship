import './style.css';
import newShip from './ship';
import gameboard from './gameboard';
import Player from './player';
import mainLoop from './mainLoop';
// import Icon from './icon.png';

const main = mainLoop();
const board = gameboard(5);
const ship = newShip(3);
const player = Player();

// board.placeShips('d', 1, ship);
// board.placeShips('e', 1, ship);
// console.log(board.printBoard());
// console.log(board.checkAlive());

// board.recieveHit('e1');
// board.recieveHit('e2');
// console.log(board.checkAlive());
// board.recieveHit('e3');
// console.log(board.checkAlive());
