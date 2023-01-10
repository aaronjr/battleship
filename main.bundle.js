"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["main"],{

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shipHolder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipHolder */ "./src/shipHolder.js");
/* harmony import */ var _updateComputerBoardDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateComputerBoardDOM */ "./src/updateComputerBoardDOM.js");
/* harmony import */ var _updatePlayerBoardDOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updatePlayerBoardDOM */ "./src/updatePlayerBoardDOM.js");
/* harmony import */ var _logo_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logo.png */ "./src/logo.png");
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */





const createDOM = () => {
  const create = () => {
    // set up of main body
    const body = document.querySelector('body');
    const banner = document.createElement('div');
    const footer = document.createElement('div');
    const container = document.createElement('div');
    const ships = document.createElement('div');
    ships.className += 'shipHolder';
    banner.className += 'banner';
    container.className += 'container';
    footer.className += 'footer';
    const button = document.createElement('button');
    button.className += 'start';
    button.textContent = 'START';
    footer.append(button);
    body.append(banner);
    body.append(container);
    body.append(footer);

    // set up boards
    const boardOne = document.createElement('div');
    const boardTwo = document.createElement('div');
    boardOne.className = 'boardOne';
    boardTwo.className = 'boardTwo';

    // image of logo
    const img = document.createElement('img');
    img.src = _logo_png__WEBPACK_IMPORTED_MODULE_3__;
    img.className += 'one';
    body.append(img);

    // image of logo
    const imgTwo = document.createElement('img');
    imgTwo.src = _logo_png__WEBPACK_IMPORTED_MODULE_3__;
    imgTwo.className += 'two';
    body.append(imgTwo);

    // loop through and create 7 x 7 board - a0, a1 ... g6
    // create boxes for each board with different names
    // so DOM can be updated accuretly
    // letters
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    for (const letter in letters) {
      for (const number in letters) {
        const start = letters[letter];
        const end = number;
        const box1 = document.createElement('div');
        const box2 = document.createElement('div');
        box1.className = 'box';
        box1.setAttribute('who', 'P');
        box1.setAttribute('target', `${start + end}`);
        box2.className = 'box';
        box2.setAttribute('who', 'C');
        box2.setAttribute('target', `${start + end}`);
        boardOne.append(box1);
        boardTwo.append(box2);
      }
    }
    // add boards to background
    container.append(boardOne);
    container.append(boardTwo);
    container.append(ships);
  };
  let counter = 0;
  const loadDOM = () => {
    // load loaded board to screen
    (0,_updateComputerBoardDOM__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_updatePlayerBoardDOM__WEBPACK_IMPORTED_MODULE_2__["default"])();
    if (counter !== 0) {
      (0,_shipHolder__WEBPACK_IMPORTED_MODULE_0__.updateSide)();
    }
    counter += 1;
  };
  const again = () => {
    const button = document.querySelector('.start');
    button.className = 'end';
    button.style.display = 'block';
    button.textContent = 'Play again?';
    button.addEventListener('click', () => {
      window.location.reload();
      return false;
    });
  };
  return {
    create,
    loadDOM,
    again
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createDOM);

// get all ships
// ships .length for length
// ships .hitcount for color
// call updayed within loadDOM

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

const gameboard = () => {
  // 7 x 7 grid
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  // empty board array
  const board = {};
  // list of ships on board
  const ships = [];
  // export list of ships
  const shipList = () => ships;

  // loop through and create 7 x 7 board - a0, a1 ... g6
  // set keys and their values
  for (const letter in letters) {
    for (const number in letters) {
      const start = letters[letter];
      const end = number;
      board[start + end] = {
        ship: null,
        history: false,
        hit: false,
        location: start + end
      };
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
        // if space taken return false
        return false;
      }
    } else {
      // if ship will overflow board
      return false;
    }
    // if ship layed succesfully, return true
    return true;
  };

  // returns the board
  const printBoard = () => board;

  // add hit to board
  const recieveHit = location => {
    // check for duplicate shot
    const local = board[location];
    if (local.history === false) {
      // if there is a ship here
      // eslint-disable-next-line prefer-destructuring, dot-notation
      if (local.ship) {
        // check the ship is alive and user hasnt been here yet
        // hit ship
        local.ship.hit();
        // update board of hit locations
        local.history = true;
        local.hit = true;
        return 'hit';
      }
      // if no hit, update the board as a missed hit
      local.history = true;
      return 'miss';
    }
    return false;
  };

  // check if this board still alive
  const checkAlive = () => {
    // filter all ships that are still alive
    const alive = ships.filter(ship => ship.alive());
    // return boolean of how many ships are alive
    return !!alive.length;
  };
  return {
    placeShips,
    printBoard,
    recieveHit,
    checkAlive,
    shipList
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameboard);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _mainLoop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mainLoop */ "./src/mainLoop.js");
/* harmony import */ var _shipHolder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shipHolder */ "./src/shipHolder.js");



const mainGame = (0,_mainLoop__WEBPACK_IMPORTED_MODULE_1__.main)();
const button = document.querySelector('.start');
button.addEventListener('click', () => {
  _mainLoop__WEBPACK_IMPORTED_MODULE_1__.create.loadDOM();
  mainGame.start();
  button.style.display = 'none';
  (0,_shipHolder__WEBPACK_IMPORTED_MODULE_2__.fillSide)();
});

/***/ }),

/***/ "./src/mainLoop.js":
/*!*************************!*\
  !*** ./src/mainLoop.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "main": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var _setup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setup */ "./src/setup.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* eslint-disable no-return-assign */



// create DOM export to use in index.js
const create = (0,_DOM__WEBPACK_IMPORTED_MODULE_1__["default"])();
const main = () => {
  // game control
  let gameOver = false;
  let turn = 'player';
  const changeTurn = () => turn = turn === 'player' ? 'computer' : 'player';
  create.create();
  const banner = document.querySelector('.banner');
  const playGame = choice => {
    // play user choice
    // check board still alive
    if (_setup__WEBPACK_IMPORTED_MODULE_0__.compBoard.checkAlive()) {
      // users choice and to which board
      _setup__WEBPACK_IMPORTED_MODULE_0__.playerOne.playerAttack(choice, _setup__WEBPACK_IMPORTED_MODULE_0__.compBoard);
      create.loadDOM();
      changeTurn();
      // if computer board is finished then return
      // winner and update board
      if (!_setup__WEBPACK_IMPORTED_MODULE_0__.compBoard.checkAlive()) {
        gameOver = true;
        banner.textContent = 'Congratulations, you won.';
        create.again();
      }
    }

    // check user still in play
    if (_setup__WEBPACK_IMPORTED_MODULE_0__.playerBoard.checkAlive()) {
      // play computer guess
      // will use recusion to find an acceptable shot
      _setup__WEBPACK_IMPORTED_MODULE_0__.computer.computerAttack(_setup__WEBPACK_IMPORTED_MODULE_0__.playerBoard);
      create.loadDOM();
      // if player board is finished then return
      // winner and update board
      if (!_setup__WEBPACK_IMPORTED_MODULE_0__.playerBoard.checkAlive()) {
        gameOver = true;
        banner.textContent = 'Better luck next time, the computer won.';
        create.again();
      }
      changeTurn();
    }
  };
  const start = () => {
    // add event listeners to the correct squares
    // game plays on user input - auto computer shot
    const boxes = document.querySelectorAll('[who="C"]');
    boxes.forEach(box => {
      box.addEventListener('click', () => {
        const hit = box.style.backgroundColor === 'red';
        const miss = box.style.backgroundColor === 'green';
        const available = !!(miss === false && hit === false);
        if (!gameOver && turn === 'player' && available === true) {
          playGame(box.attributes.target.value);
        }
      });
    });
  };
  return {
    start
  };
};

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */

const Player = () => {
  // keep track off last shot and if succesful
  const lastShot = {
    location: '',
    hit: false
  };

  // get random coordinates
  const random = (letter, number) => {
    const firstNumber = Math.floor(Math.random() * number);
    const secondNumber = Math.floor(Math.random() * number);
    return `${letter[firstNumber]}${secondNumber}`;
  };

  // get random coords
  const computerGuess = () => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const {
      length
    } = letters;
    // return the coords, returned by random function
    return random(letters, length);
  };

  // computer can make a random guess or side shot if last was succesful
  const computerAttack = board => {
    // if last shot was wrong, make new guess
    if (lastShot.hit === false) {
      // create new guess for computer
      const guess = computerGuess();
      // save into a function to later compare
      const attempt = board.recieveHit(guess);
      if (!attempt) {
        // if shot has already been taken, recursively guess again
        lastShot.location = guess;
        lastShot.hit = false;
        return computerAttack(board);
        // if missed update lastShot correctly
      }

      if (attempt === 'miss') {
        lastShot.location = guess;
        lastShot.hit = false;
        // if hit update lastShot correctly
      } else {
        lastShot.location = guess;
        lastShot.hit = true;
      }
      // make sure next go won't overflow the board
    } else if (lastShot.location[1] < 6) {
      // increase number coord by 1
      let increase = parseInt(lastShot.location[1], 10);
      const letter = lastShot.location[0];
      increase += 1;
      // save back into location
      lastShot.location = `${letter}${increase}`;
      // save call to function in a variable to later compare
      const attempt = board.recieveHit(lastShot.location);
      // if shot already taken
      if (!attempt) {
        lastShot.hit = false;
        // new shot, but random
        computerAttack(board);
      } else if (attempt === 'miss') {
        // if missed shot, update lastshot to false
        lastShot.hit = false;
      } else {
        // if hit update last shot to hit and location already changed
        lastShot.hit = true;
      }
    } else {
      // if last shot was the last square of a row, make random shot
      lastShot.hit = false;
      computerAttack(board);
    }
  };

  // create a function that takes a user input
  // as with above checks its valid
  const playerAttack = (location, board) => !!board.recieveHit(location);
  return {
    computerGuess,
    computerAttack,
    playerAttack
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/setup.js":
/*!**********************!*\
  !*** ./src/setup.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compBoard": () => (/* binding */ compBoard),
/* harmony export */   "compDOM": () => (/* binding */ compDOM),
/* harmony export */   "computer": () => (/* binding */ computer),
/* harmony export */   "playDOM": () => (/* binding */ playDOM),
/* harmony export */   "playerBoard": () => (/* binding */ playerBoard),
/* harmony export */   "playerOne": () => (/* binding */ playerOne)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* eslint-disable import/prefer-default-export */




// initialise two players
const playerOne = (0,_player__WEBPACK_IMPORTED_MODULE_0__["default"])();
const computer = (0,_player__WEBPACK_IMPORTED_MODULE_0__["default"])();

// create two boards
const playerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
const compBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();

// get the boards of each player
const compDOM = compBoard.printBoard();
const playDOM = playerBoard.printBoard();

// random letter and number generators
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const randomLetter = () => `${letters[Math.floor(Math.random() * 7)]}`;
const randomNumber = () => Math.floor(Math.random() * 7);

// ships for game and their lengths
const lengthOfShips = [5, 4, 3, 3, 2];

// fill players board, using recursion if first spot not available
const placePShips = ship => {
  if (!playerBoard.placeShips(randomLetter(), randomNumber(), ship)) {
    placePShips(ship);
  }
};
// fill computers board, using recursion if first spot not available
const placeCShips = ship => {
  if (!compBoard.placeShips(randomLetter(letters, 7), parseInt(randomNumber(), 10), ship)) {
    placeCShips(ship);
  }
};

// randomly place each ship on each board
lengthOfShips.forEach(number => {
  placePShips((0,_ship__WEBPACK_IMPORTED_MODULE_2__["default"])(number));
  placeCShips((0,_ship__WEBPACK_IMPORTED_MODULE_2__["default"])(number));
});

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable no-return-assign */
const newShip = length => {
  let count = 0;
  const getLength = () => length;
  const hit = () => {
    count += 1;
    return true;
  };
  const hitCount = () => count;
  const alive = () => count < length;
  return {
    getLength,
    hit,
    hitCount,
    alive
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (newShip);

/***/ }),

/***/ "./src/shipHolder.js":
/*!***************************!*\
  !*** ./src/shipHolder.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fillSide": () => (/* binding */ fillSide),
/* harmony export */   "updateSide": () => (/* binding */ updateSide)
/* harmony export */ });
/* harmony import */ var _setup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setup */ "./src/setup.js");
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

const fillSide = () => {
  const holder = document.querySelector('.shipHolder');
  const topOfHolder = document.createElement('div');
  topOfHolder.className += 'top';
  topOfHolder.textContent = 'Enemy ships';
  holder.append(topOfHolder);
  const ships = _setup__WEBPACK_IMPORTED_MODULE_0__.compBoard.shipList();
  ships.forEach((ship, index) => {
    const length = ship.getLength();
    const hits = ship.hitCount();
    const div = document.createElement('div');
    div.className += 'ship';
    div.setAttribute('ship', index);
    for (let i = 0; i < length; i += 1) {
      const box = document.createElement('div');
      box.className = 'part';
      if (i > 0 && i <= hits) {
        box.style.backgroundColor = 'green';
      }
      div.append(box);
    }
    holder.append(div);
  });
};
const updateSide = () => {
  const ships = _setup__WEBPACK_IMPORTED_MODULE_0__.compBoard.shipList();
  ships.forEach((ship, index) => {
    const hits = ship.hitCount() - 1;
    const children = [...document.querySelector(`[ship="${index}"]`).children];
    children.forEach((child, i) => {
      if (i <= hits) {
        child.style.backgroundColor = 'green';
      }
    });
  });
};

/***/ }),

/***/ "./src/updateComputerBoardDOM.js":
/*!***************************************!*\
  !*** ./src/updateComputerBoardDOM.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _setup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setup */ "./src/setup.js");
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
// loop through the board and update the colours accorinding to data
// using 'WHO="?"' to select correctly


const updateComputerBoardDOM = () => {
  for (const item in _setup__WEBPACK_IMPORTED_MODULE_0__.compDOM) {
    if (_setup__WEBPACK_IMPORTED_MODULE_0__.compDOM[item].history === true) {
      const a = document.querySelector(`[target="${_setup__WEBPACK_IMPORTED_MODULE_0__.compDOM[item].location}"][who="C"]`);
      a.style.backgroundColor = 'green';
    }
    if (_setup__WEBPACK_IMPORTED_MODULE_0__.compDOM[item].hit === true) {
      const a = document.querySelector(`[target="${_setup__WEBPACK_IMPORTED_MODULE_0__.compDOM[item].location}"][who="C"]`);
      a.style.backgroundColor = 'red';
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateComputerBoardDOM);

/***/ }),

/***/ "./src/updatePlayerBoardDOM.js":
/*!*************************************!*\
  !*** ./src/updatePlayerBoardDOM.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _setup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setup */ "./src/setup.js");
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
// loop through the board and update the colours accorinding to data
// using 'WHO="?"' to select correctly
// loop through the board and update the colours accorinding to data


const updatePlayerBoardDOM = () => {
  for (const item in _setup__WEBPACK_IMPORTED_MODULE_0__.playDOM) {
    if (_setup__WEBPACK_IMPORTED_MODULE_0__.playDOM[item].ship) {
      const a = document.querySelector(`[target="${item}"][who="P"]`);
      a.style.backgroundColor = 'black';
    }
    if (_setup__WEBPACK_IMPORTED_MODULE_0__.playDOM[item].history === true) {
      const a = document.querySelector(`[target="${_setup__WEBPACK_IMPORTED_MODULE_0__.playDOM[item].location}"][who="P"]`);
      a.style.backgroundColor = 'green';
    }
    if (_setup__WEBPACK_IMPORTED_MODULE_0__.playDOM[item].hit === true) {
      const a = document.querySelector(`[target="${_setup__WEBPACK_IMPORTED_MODULE_0__.playDOM[item].location}"][who="P"]`);
      a.style.backgroundColor = 'red';
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updatePlayerBoardDOM);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "*{\n  margin: 0px;\n  padding: 0px;\n  font-family: 'Montserrat', sans-serif;\n}\nbody{\n width: 100vw;\n height: 100vh;\n display: flex;\n flex-direction: column;\n\n}\n\n.banner{\n  height: 20%;\n  display: grid;\n  place-items: center;\n}\n\n.container{\n display: flex;\n align-items: center;\n justify-content: space-evenly;\n width: 100%;\n}\n\n.footer{\n  display: grid;\n  place-items: center;\n  height: 20%;\n}\n\n.boardOne,\n.boardTwo {\n  aspect-ratio: 1/1;\n  width: 30%;\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  place-items: center;\n  position: relative;\n}\n.boardOne::after{\n  content: 'Your ships';\n  position: absolute;\n  bottom:-17px;\n  left: 1%;\n}\n.boardTwo::after{\n  content: 'Attack here';\n  position: absolute;\n  bottom:-17px;\n  left: 1%;\n}\n.box{\n  aspect-ratio: 1/1;\n  width: 85%;\n  border: solid black 1px;\n}\n\n.start,\n.end{\n  height: 50%;\n  width: calc(100vh / 3);\n  border-radius: .5rem;\n  border: 2px solid black;\n  background-color: white;\n  font-weight: 600;\n}\n\n.shipHolder{\n  height: calc( (100vw / 100 * 30) - 4px );\n  width: 10%;\n  display: grid;\n  grid-template-rows: 40% repeat(5, 1fr);\n}\n\n.top{\n  width: 100%;\n  display: grid;\n  justify-content: center;\n  align-items: flex-end;\n  padding-bottom: 30%;\n  text-align: center;\n  color: black;\n}\n.ship{\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  margin: 0px 10px;\n}\n\n.part{\n  width:100%;\n  aspect-ratio: 1/1;\n  background-color: red;\n}\n\n.ship:last-child{\n  margin-bottom: 25%;\n}\n\n.one{\n  position: absolute;\n  top: 5%;\n  left: 5%;\n  width: 20%;\n}\n\n.two{\n  position: absolute;\n  bottom: 5%;\n  right: 5%;\n  width: 20%;\n  transform: rotate(180deg);\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAEA;EACE,WAAW;EACX,YAAY;EACZ,qCAAqC;AACvC;AACA;CACC,YAAY;CACZ,aAAa;CACb,aAAa;CACb,sBAAsB;;AAEvB;;AAEA;EACE,WAAW;EACX,aAAa;EACb,mBAAmB;AACrB;;AAEA;CACC,aAAa;CACb,mBAAmB;CACnB,6BAA6B;CAC7B,WAAW;AACZ;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,WAAW;AACb;;AAEA;;EAEE,iBAAiB;EACjB,UAAU;EACV,aAAa;EACb,qCAAqC;EACrC,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,YAAY;EACZ,QAAQ;AACV;AACA;EACE,sBAAsB;EACtB,kBAAkB;EAClB,YAAY;EACZ,QAAQ;AACV;AACA;EACE,iBAAiB;EACjB,UAAU;EACV,uBAAuB;AACzB;;AAEA;;EAEE,WAAW;EACX,sBAAsB;EACtB,oBAAoB;EACpB,uBAAuB;EACvB,uBAAuB;EACvB,gBAAgB;AAClB;;AAEA;EACE,wCAAwC;EACxC,UAAU;EACV,aAAa;EACb,sCAAsC;AACxC;;AAEA;EACE,WAAW;EACX,aAAa;EACb,uBAAuB;EACvB,qBAAqB;EACrB,mBAAmB;EACnB,kBAAkB;EAClB,YAAY;AACd;AACA;EACE,aAAa;EACb,qCAAqC;EACrC,gBAAgB;AAClB;;AAEA;EACE,UAAU;EACV,iBAAiB;EACjB,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,OAAO;EACP,QAAQ;EACR,UAAU;AACZ;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,SAAS;EACT,UAAU;EACV,yBAAyB;AAC3B","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');\n\n*{\n  margin: 0px;\n  padding: 0px;\n  font-family: 'Montserrat', sans-serif;\n}\nbody{\n width: 100vw;\n height: 100vh;\n display: flex;\n flex-direction: column;\n\n}\n\n.banner{\n  height: 20%;\n  display: grid;\n  place-items: center;\n}\n\n.container{\n display: flex;\n align-items: center;\n justify-content: space-evenly;\n width: 100%;\n}\n\n.footer{\n  display: grid;\n  place-items: center;\n  height: 20%;\n}\n\n.boardOne,\n.boardTwo {\n  aspect-ratio: 1/1;\n  width: 30%;\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  place-items: center;\n  position: relative;\n}\n.boardOne::after{\n  content: 'Your ships';\n  position: absolute;\n  bottom:-17px;\n  left: 1%;\n}\n.boardTwo::after{\n  content: 'Attack here';\n  position: absolute;\n  bottom:-17px;\n  left: 1%;\n}\n.box{\n  aspect-ratio: 1/1;\n  width: 85%;\n  border: solid black 1px;\n}\n\n.start,\n.end{\n  height: 50%;\n  width: calc(100vh / 3);\n  border-radius: .5rem;\n  border: 2px solid black;\n  background-color: white;\n  font-weight: 600;\n}\n\n.shipHolder{\n  height: calc( (100vw / 100 * 30) - 4px );\n  width: 10%;\n  display: grid;\n  grid-template-rows: 40% repeat(5, 1fr);\n}\n\n.top{\n  width: 100%;\n  display: grid;\n  justify-content: center;\n  align-items: flex-end;\n  padding-bottom: 30%;\n  text-align: center;\n  color: black;\n}\n.ship{\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  margin: 0px 10px;\n}\n\n.part{\n  width:100%;\n  aspect-ratio: 1/1;\n  background-color: red;\n}\n\n.ship:last-child{\n  margin-bottom: 25%;\n}\n\n.one{\n  position: absolute;\n  top: 5%;\n  left: 5%;\n  width: 20%;\n}\n\n.two{\n  position: absolute;\n  bottom: 5%;\n  right: 5%;\n  width: 20%;\n  transform: rotate(180deg);\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/logo.png":
/*!**********************!*\
  !*** ./src/logo.png ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c4737b5791dd4504a50d.png";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSwwQ0FBMEM7QUFDMUM7O0FBRUE7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFpbkxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zZXR1cC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwSG9sZGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdXBkYXRlQ29tcHV0ZXJCb2FyZERPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3VwZGF0ZVBsYXllckJvYXJkRE9NLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cbi8qIGVzbGludC1kaXNhYmxlIGd1YXJkLWZvci1pbiAqL1xuXG5pbXBvcnQgeyB1cGRhdGVTaWRlIH0gZnJvbSAnLi9zaGlwSG9sZGVyJztcbmltcG9ydCB1cGRhdGVDb21wdXRlckJvYXJkRE9NIGZyb20gJy4vdXBkYXRlQ29tcHV0ZXJCb2FyZERPTSc7XG5pbXBvcnQgdXBkYXRlUGxheWVyQm9hcmRET00gZnJvbSAnLi91cGRhdGVQbGF5ZXJCb2FyZERPTSc7XG5pbXBvcnQgbG9nbyBmcm9tICcuL2xvZ28ucG5nJztcblxuY29uc3QgY3JlYXRlRE9NID0gKCkgPT4ge1xuICBjb25zdCBjcmVhdGUgPSAoKSA9PiB7XG4gICAgLy8gc2V0IHVwIG9mIG1haW4gYm9keVxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgY29uc3QgYmFubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHNoaXBzLmNsYXNzTmFtZSArPSAnc2hpcEhvbGRlcic7XG4gICAgYmFubmVyLmNsYXNzTmFtZSArPSAnYmFubmVyJztcbiAgICBjb250YWluZXIuY2xhc3NOYW1lICs9ICdjb250YWluZXInO1xuICAgIGZvb3Rlci5jbGFzc05hbWUgKz0gJ2Zvb3Rlcic7XG5cbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidXR0b24uY2xhc3NOYW1lICs9ICdzdGFydCc7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gJ1NUQVJUJztcblxuICAgIGZvb3Rlci5hcHBlbmQoYnV0dG9uKTtcbiAgICBib2R5LmFwcGVuZChiYW5uZXIpO1xuICAgIGJvZHkuYXBwZW5kKGNvbnRhaW5lcik7XG4gICAgYm9keS5hcHBlbmQoZm9vdGVyKTtcblxuICAgIC8vIHNldCB1cCBib2FyZHNcbiAgICBjb25zdCBib2FyZE9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGJvYXJkVHdvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYm9hcmRPbmUuY2xhc3NOYW1lID0gJ2JvYXJkT25lJztcbiAgICBib2FyZFR3by5jbGFzc05hbWUgPSAnYm9hcmRUd28nO1xuXG4gICAgLy8gaW1hZ2Ugb2YgbG9nb1xuICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGltZy5zcmMgPSBsb2dvO1xuICAgIGltZy5jbGFzc05hbWUgKz0gJ29uZSc7XG4gICAgYm9keS5hcHBlbmQoaW1nKTtcblxuICAgIC8vIGltYWdlIG9mIGxvZ29cbiAgICBjb25zdCBpbWdUd28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpbWdUd28uc3JjID0gbG9nbztcbiAgICBpbWdUd28uY2xhc3NOYW1lICs9ICd0d28nO1xuICAgIGJvZHkuYXBwZW5kKGltZ1R3byk7XG5cbiAgICAvLyBsb29wIHRocm91Z2ggYW5kIGNyZWF0ZSA3IHggNyBib2FyZCAtIGEwLCBhMSAuLi4gZzZcbiAgICAvLyBjcmVhdGUgYm94ZXMgZm9yIGVhY2ggYm9hcmQgd2l0aCBkaWZmZXJlbnQgbmFtZXNcbiAgICAvLyBzbyBET00gY2FuIGJlIHVwZGF0ZWQgYWNjdXJldGx5XG4gICAgLy8gbGV0dGVyc1xuICAgIGNvbnN0IGxldHRlcnMgPSBbJ2EnLCAnYicsICdjJywgJ2QnLCAnZScsICdmJywgJ2cnXTtcbiAgICBmb3IgKGNvbnN0IGxldHRlciBpbiBsZXR0ZXJzKSB7XG4gICAgICBmb3IgKGNvbnN0IG51bWJlciBpbiBsZXR0ZXJzKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbGV0dGVyc1tsZXR0ZXJdO1xuICAgICAgICBjb25zdCBlbmQgPSBudW1iZXI7XG4gICAgICAgIGNvbnN0IGJveDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgYm94MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGJveDEuY2xhc3NOYW1lID0gJ2JveCc7XG4gICAgICAgIGJveDEuc2V0QXR0cmlidXRlKCd3aG8nLCAnUCcpO1xuICAgICAgICBib3gxLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgYCR7c3RhcnQgKyBlbmR9YCk7XG5cbiAgICAgICAgYm94Mi5jbGFzc05hbWUgPSAnYm94JztcbiAgICAgICAgYm94Mi5zZXRBdHRyaWJ1dGUoJ3dobycsICdDJyk7XG4gICAgICAgIGJveDIuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCBgJHtzdGFydCArIGVuZH1gKTtcblxuICAgICAgICBib2FyZE9uZS5hcHBlbmQoYm94MSk7XG4gICAgICAgIGJvYXJkVHdvLmFwcGVuZChib3gyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gYWRkIGJvYXJkcyB0byBiYWNrZ3JvdW5kXG4gICAgY29udGFpbmVyLmFwcGVuZChib2FyZE9uZSk7XG4gICAgY29udGFpbmVyLmFwcGVuZChib2FyZFR3byk7XG4gICAgY29udGFpbmVyLmFwcGVuZChzaGlwcyk7XG4gIH07XG4gIGxldCBjb3VudGVyID0gMDtcbiAgY29uc3QgbG9hZERPTSA9ICgpID0+IHtcbiAgICAvLyBsb2FkIGxvYWRlZCBib2FyZCB0byBzY3JlZW5cbiAgICB1cGRhdGVDb21wdXRlckJvYXJkRE9NKCk7XG4gICAgdXBkYXRlUGxheWVyQm9hcmRET00oKTtcbiAgICBpZiAoY291bnRlciAhPT0gMCkgeyB1cGRhdGVTaWRlKCk7IH1cbiAgICBjb3VudGVyICs9IDE7XG4gIH07XG5cbiAgY29uc3QgYWdhaW4gPSAoKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0Jyk7XG4gICAgYnV0dG9uLmNsYXNzTmFtZSA9ICdlbmQnO1xuICAgIGJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSAnUGxheSBhZ2Fpbj8nO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4geyBjcmVhdGUsIGxvYWRET00sIGFnYWluIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVET007XG5cbi8vIGdldCBhbGwgc2hpcHNcbi8vIHNoaXBzIC5sZW5ndGggZm9yIGxlbmd0aFxuLy8gc2hpcHMgLmhpdGNvdW50IGZvciBjb2xvclxuLy8gY2FsbCB1cGRheWVkIHdpdGhpbiBsb2FkRE9NXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cbi8qIGVzbGludC1kaXNhYmxlIGd1YXJkLWZvci1pbiAqL1xuXG5jb25zdCBnYW1lYm9hcmQgPSAoKSA9PiB7XG4gIC8vIDcgeCA3IGdyaWRcbiAgY29uc3QgbGV0dGVycyA9IFsnYScsICdiJywgJ2MnLCAnZCcsICdlJywgJ2YnLCAnZyddO1xuICAvLyBlbXB0eSBib2FyZCBhcnJheVxuICBjb25zdCBib2FyZCA9IHt9O1xuICAvLyBsaXN0IG9mIHNoaXBzIG9uIGJvYXJkXG4gIGNvbnN0IHNoaXBzID0gW107XG4gIC8vIGV4cG9ydCBsaXN0IG9mIHNoaXBzXG4gIGNvbnN0IHNoaXBMaXN0ID0gKCkgPT4gc2hpcHM7XG5cbiAgLy8gbG9vcCB0aHJvdWdoIGFuZCBjcmVhdGUgNyB4IDcgYm9hcmQgLSBhMCwgYTEgLi4uIGc2XG4gIC8vIHNldCBrZXlzIGFuZCB0aGVpciB2YWx1ZXNcbiAgZm9yIChjb25zdCBsZXR0ZXIgaW4gbGV0dGVycykge1xuICAgIGZvciAoY29uc3QgbnVtYmVyIGluIGxldHRlcnMpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gbGV0dGVyc1tsZXR0ZXJdO1xuICAgICAgY29uc3QgZW5kID0gbnVtYmVyO1xuICAgICAgYm9hcmRbc3RhcnQgKyBlbmRdID0ge1xuICAgICAgICBzaGlwOiBudWxsLFxuICAgICAgICBoaXN0b3J5OiBmYWxzZSxcbiAgICAgICAgaGl0OiBmYWxzZSxcbiAgICAgICAgbG9jYXRpb246IHN0YXJ0ICsgZW5kLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvLyBsb29wIHRocm91Z2ggY29vcmRpbmF0ZXMgKGExIC0gYTUpIGFuZCBjaGVjayBhbGwgYXJlIGVtcHR5XG4gIGNvbnN0IGNoZWNrTnVsbCA9IChsLCBuLCBsZW5ndGgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gbjsgaSAtIG4gPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGJvYXJkW2wgKyBpXS5zaGlwICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvLyBwbGFjZSBzaGlwIG9udG8gYm9hcmRcbiAgY29uc3QgcGxhY2VTaGlwcyA9IChsLCBuLCBzaGlwKSA9PiB7XG4gICAgLy8gc3RvcmUgbGVuZ3RoXG4gICAgY29uc3QgbGVuZ3RoID0gc2hpcC5nZXRMZW5ndGgoKTtcbiAgICAvLyBjaGVjayBzaGlwIHdpbGwgZml0IG9udG8gYm9hcmRcbiAgICBpZiAobiArIGxlbmd0aCA8PSA3KSB7XG4gICAgICAvLyBjaGVjayBhbGwgc3BvdHMgZm9yIHRoZSBzaGlwIHdpbGwgb2NjdXB5IGFyZSBlbXB0eVxuICAgICAgaWYgKGNoZWNrTnVsbChsLCBuLCBsZW5ndGgpKSB7XG4gICAgICAgIHNoaXBzLnB1c2goc2hpcCk7XG4gICAgICAgIGZvciAobGV0IGkgPSBuOyBpIC0gbiA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgLy8gaWYgY2xlYXIgYWRkIHNoaXAgdG8gZWFjaCBzcXVhcmVcbiAgICAgICAgICBib2FyZFtsICsgaV0uc2hpcCA9IHNoaXA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIHNwYWNlIHRha2VuIHJldHVybiBmYWxzZVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIHNoaXAgd2lsbCBvdmVyZmxvdyBib2FyZFxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBpZiBzaGlwIGxheWVkIHN1Y2Nlc2Z1bGx5LCByZXR1cm4gdHJ1ZVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8vIHJldHVybnMgdGhlIGJvYXJkXG4gIGNvbnN0IHByaW50Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuICAvLyBhZGQgaGl0IHRvIGJvYXJkXG4gIGNvbnN0IHJlY2lldmVIaXQgPSAobG9jYXRpb24pID0+IHtcbiAgICAvLyBjaGVjayBmb3IgZHVwbGljYXRlIHNob3RcbiAgICBjb25zdCBsb2NhbCA9IGJvYXJkW2xvY2F0aW9uXTtcbiAgICBpZiAobG9jYWwuaGlzdG9yeSA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIGlmIHRoZXJlIGlzIGEgc2hpcCBoZXJlXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmcsIGRvdC1ub3RhdGlvblxuICAgICAgaWYgKGxvY2FsLnNoaXApIHtcbiAgICAgICAgLy8gY2hlY2sgdGhlIHNoaXAgaXMgYWxpdmUgYW5kIHVzZXIgaGFzbnQgYmVlbiBoZXJlIHlldFxuICAgICAgICAvLyBoaXQgc2hpcFxuICAgICAgICBsb2NhbC5zaGlwLmhpdCgpO1xuICAgICAgICAvLyB1cGRhdGUgYm9hcmQgb2YgaGl0IGxvY2F0aW9uc1xuICAgICAgICBsb2NhbC5oaXN0b3J5ID0gdHJ1ZTtcbiAgICAgICAgbG9jYWwuaGl0ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuICdoaXQnO1xuICAgICAgfVxuICAgICAgLy8gaWYgbm8gaGl0LCB1cGRhdGUgdGhlIGJvYXJkIGFzIGEgbWlzc2VkIGhpdFxuICAgICAgbG9jYWwuaGlzdG9yeSA9IHRydWU7XG4gICAgICByZXR1cm4gJ21pc3MnO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgLy8gY2hlY2sgaWYgdGhpcyBib2FyZCBzdGlsbCBhbGl2ZVxuICBjb25zdCBjaGVja0FsaXZlID0gKCkgPT4ge1xuICAgIC8vIGZpbHRlciBhbGwgc2hpcHMgdGhhdCBhcmUgc3RpbGwgYWxpdmVcbiAgICBjb25zdCBhbGl2ZSA9IHNoaXBzLmZpbHRlcigoc2hpcCkgPT4gc2hpcC5hbGl2ZSgpKTtcbiAgICAvLyByZXR1cm4gYm9vbGVhbiBvZiBob3cgbWFueSBzaGlwcyBhcmUgYWxpdmVcbiAgICByZXR1cm4gISFhbGl2ZS5sZW5ndGg7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXBzLFxuICAgIHByaW50Qm9hcmQsXG4gICAgcmVjaWV2ZUhpdCxcbiAgICBjaGVja0FsaXZlLFxuICAgIHNoaXBMaXN0LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkO1xuIiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgeyBtYWluLCBjcmVhdGUgfSBmcm9tICcuL21haW5Mb29wJztcbmltcG9ydCB7IGZpbGxTaWRlIH0gZnJvbSAnLi9zaGlwSG9sZGVyJztcblxuXG5jb25zdCBtYWluR2FtZSA9IG1haW4oKTtcbmNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydCcpO1xuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjcmVhdGUubG9hZERPTSgpO1xuICBtYWluR2FtZS5zdGFydCgpO1xuICBidXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgZmlsbFNpZGUoKTtcbn0pOyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24gKi9cblxuaW1wb3J0IHtcbiAgcGxheWVyT25lLCBjb21wdXRlciwgcGxheWVyQm9hcmQsIGNvbXBCb2FyZCxcbn0gZnJvbSAnLi9zZXR1cCc7XG5cbmltcG9ydCBjcmVhdGVET00gZnJvbSAnLi9ET00nO1xuLy8gY3JlYXRlIERPTSBleHBvcnQgdG8gdXNlIGluIGluZGV4LmpzXG5leHBvcnQgY29uc3QgY3JlYXRlID0gY3JlYXRlRE9NKCk7XG5cbmV4cG9ydCBjb25zdCBtYWluID0gKCkgPT4ge1xuICAvLyBnYW1lIGNvbnRyb2xcbiAgbGV0IGdhbWVPdmVyID0gZmFsc2U7XG4gIGxldCB0dXJuID0gJ3BsYXllcic7XG4gIGNvbnN0IGNoYW5nZVR1cm4gPSAoKSA9PiB0dXJuID0gdHVybiA9PT0gJ3BsYXllcicgPyAnY29tcHV0ZXInIDogJ3BsYXllcic7XG5cbiAgY3JlYXRlLmNyZWF0ZSgpO1xuICBjb25zdCBiYW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFubmVyJyk7XG4gIGNvbnN0IHBsYXlHYW1lID0gKGNob2ljZSkgPT4ge1xuICAgIC8vIHBsYXkgdXNlciBjaG9pY2VcbiAgICAvLyBjaGVjayBib2FyZCBzdGlsbCBhbGl2ZVxuICAgIGlmIChjb21wQm9hcmQuY2hlY2tBbGl2ZSgpKSB7XG4gICAgICAvLyB1c2VycyBjaG9pY2UgYW5kIHRvIHdoaWNoIGJvYXJkXG4gICAgICBwbGF5ZXJPbmUucGxheWVyQXR0YWNrKGNob2ljZSwgY29tcEJvYXJkKTtcbiAgICAgIGNyZWF0ZS5sb2FkRE9NKCk7XG4gICAgICBjaGFuZ2VUdXJuKCk7XG4gICAgICAvLyBpZiBjb21wdXRlciBib2FyZCBpcyBmaW5pc2hlZCB0aGVuIHJldHVyblxuICAgICAgLy8gd2lubmVyIGFuZCB1cGRhdGUgYm9hcmRcbiAgICAgIGlmICghKGNvbXBCb2FyZC5jaGVja0FsaXZlKCkpKSB7XG4gICAgICAgIGdhbWVPdmVyID0gdHJ1ZTtcbiAgICAgICAgYmFubmVyLnRleHRDb250ZW50ID0gJ0NvbmdyYXR1bGF0aW9ucywgeW91IHdvbi4nO1xuICAgICAgICBjcmVhdGUuYWdhaW4oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjaGVjayB1c2VyIHN0aWxsIGluIHBsYXlcbiAgICBpZiAocGxheWVyQm9hcmQuY2hlY2tBbGl2ZSgpKSB7XG4gICAgICAvLyBwbGF5IGNvbXB1dGVyIGd1ZXNzXG4gICAgICAvLyB3aWxsIHVzZSByZWN1c2lvbiB0byBmaW5kIGFuIGFjY2VwdGFibGUgc2hvdFxuICAgICAgY29tcHV0ZXIuY29tcHV0ZXJBdHRhY2socGxheWVyQm9hcmQpO1xuICAgICAgY3JlYXRlLmxvYWRET00oKTtcbiAgICAgIC8vIGlmIHBsYXllciBib2FyZCBpcyBmaW5pc2hlZCB0aGVuIHJldHVyblxuICAgICAgLy8gd2lubmVyIGFuZCB1cGRhdGUgYm9hcmRcbiAgICAgIGlmICghKHBsYXllckJvYXJkLmNoZWNrQWxpdmUoKSkpIHtcbiAgICAgICAgZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICBiYW5uZXIudGV4dENvbnRlbnQgPSAnQmV0dGVyIGx1Y2sgbmV4dCB0aW1lLCB0aGUgY29tcHV0ZXIgd29uLic7XG4gICAgICAgIGNyZWF0ZS5hZ2FpbigpO1xuICAgICAgfVxuICAgICAgY2hhbmdlVHVybigpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBjb3JyZWN0IHNxdWFyZXNcbiAgICAvLyBnYW1lIHBsYXlzIG9uIHVzZXIgaW5wdXQgLSBhdXRvIGNvbXB1dGVyIHNob3RcbiAgICBjb25zdCBib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1t3aG89XCJDXCJdJyk7XG4gICAgYm94ZXMuZm9yRWFjaCgoYm94KSA9PiB7XG4gICAgICBib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhpdCA9IGJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPT09ICdyZWQnO1xuICAgICAgICBjb25zdCBtaXNzID0gYm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9PT0gJ2dyZWVuJztcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlID0gISEobWlzcyA9PT0gZmFsc2UgJiYgaGl0ID09PSBmYWxzZSk7XG4gICAgICAgIGlmICghZ2FtZU92ZXIgJiYgdHVybiA9PT0gJ3BsYXllcicgJiYgYXZhaWxhYmxlID09PSB0cnVlKSB7XG4gICAgICAgICAgcGxheUdhbWUoYm94LmF0dHJpYnV0ZXMudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHsgc3RhcnQgfTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWV4cHJlc3Npb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXNzaWduICovXG5cbmNvbnN0IFBsYXllciA9ICgpID0+IHtcbiAgLy8ga2VlcCB0cmFjayBvZmYgbGFzdCBzaG90IGFuZCBpZiBzdWNjZXNmdWxcbiAgY29uc3QgbGFzdFNob3QgPSB7XG4gICAgbG9jYXRpb246ICcnLFxuICAgIGhpdDogZmFsc2UsXG4gIH07XG5cbiAgLy8gZ2V0IHJhbmRvbSBjb29yZGluYXRlc1xuICBjb25zdCByYW5kb20gPSAobGV0dGVyLCBudW1iZXIpID0+IHtcbiAgICBjb25zdCBmaXJzdE51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51bWJlcik7XG4gICAgY29uc3Qgc2Vjb25kTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbnVtYmVyKTtcbiAgICByZXR1cm4gYCR7bGV0dGVyW2ZpcnN0TnVtYmVyXX0ke3NlY29uZE51bWJlcn1gO1xuICB9O1xuXG4gIC8vIGdldCByYW5kb20gY29vcmRzXG4gIGNvbnN0IGNvbXB1dGVyR3Vlc3MgPSAoKSA9PiB7XG4gICAgY29uc3QgbGV0dGVycyA9IFsnYScsICdiJywgJ2MnLCAnZCcsICdlJywgJ2YnLCAnZyddO1xuICAgIGNvbnN0IHsgbGVuZ3RoIH0gPSBsZXR0ZXJzO1xuICAgIC8vIHJldHVybiB0aGUgY29vcmRzLCByZXR1cm5lZCBieSByYW5kb20gZnVuY3Rpb25cbiAgICByZXR1cm4gcmFuZG9tKGxldHRlcnMsIGxlbmd0aCk7XG4gIH07XG5cbiAgLy8gY29tcHV0ZXIgY2FuIG1ha2UgYSByYW5kb20gZ3Vlc3Mgb3Igc2lkZSBzaG90IGlmIGxhc3Qgd2FzIHN1Y2Nlc2Z1bFxuICBjb25zdCBjb21wdXRlckF0dGFjayA9IChib2FyZCkgPT4ge1xuICAgIC8vIGlmIGxhc3Qgc2hvdCB3YXMgd3JvbmcsIG1ha2UgbmV3IGd1ZXNzXG4gICAgaWYgKGxhc3RTaG90LmhpdCA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIGNyZWF0ZSBuZXcgZ3Vlc3MgZm9yIGNvbXB1dGVyXG4gICAgICBjb25zdCBndWVzcyA9IGNvbXB1dGVyR3Vlc3MoKTtcbiAgICAgIC8vIHNhdmUgaW50byBhIGZ1bmN0aW9uIHRvIGxhdGVyIGNvbXBhcmVcbiAgICAgIGNvbnN0IGF0dGVtcHQgPSBib2FyZC5yZWNpZXZlSGl0KGd1ZXNzKTtcbiAgICAgIGlmICghYXR0ZW1wdCkge1xuICAgICAgICAvLyBpZiBzaG90IGhhcyBhbHJlYWR5IGJlZW4gdGFrZW4sIHJlY3Vyc2l2ZWx5IGd1ZXNzIGFnYWluXG4gICAgICAgIGxhc3RTaG90LmxvY2F0aW9uID0gZ3Vlc3M7XG4gICAgICAgIGxhc3RTaG90LmhpdCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gY29tcHV0ZXJBdHRhY2soYm9hcmQpO1xuICAgICAgICAvLyBpZiBtaXNzZWQgdXBkYXRlIGxhc3RTaG90IGNvcnJlY3RseVxuICAgICAgfVxuICAgICAgaWYgKGF0dGVtcHQgPT09ICdtaXNzJykge1xuICAgICAgICBsYXN0U2hvdC5sb2NhdGlvbiA9IGd1ZXNzO1xuICAgICAgICBsYXN0U2hvdC5oaXQgPSBmYWxzZTtcbiAgICAgICAgLy8gaWYgaGl0IHVwZGF0ZSBsYXN0U2hvdCBjb3JyZWN0bHlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxhc3RTaG90LmxvY2F0aW9uID0gZ3Vlc3M7XG4gICAgICAgIGxhc3RTaG90LmhpdCA9IHRydWU7XG4gICAgICB9XG4gICAgICAvLyBtYWtlIHN1cmUgbmV4dCBnbyB3b24ndCBvdmVyZmxvdyB0aGUgYm9hcmRcbiAgICB9IGVsc2UgaWYgKGxhc3RTaG90LmxvY2F0aW9uWzFdIDwgNikge1xuICAgICAgLy8gaW5jcmVhc2UgbnVtYmVyIGNvb3JkIGJ5IDFcbiAgICAgIGxldCBpbmNyZWFzZSA9IHBhcnNlSW50KGxhc3RTaG90LmxvY2F0aW9uWzFdLCAxMCk7XG4gICAgICBjb25zdCBsZXR0ZXIgPSBsYXN0U2hvdC5sb2NhdGlvblswXTtcbiAgICAgIGluY3JlYXNlICs9IDE7XG4gICAgICAvLyBzYXZlIGJhY2sgaW50byBsb2NhdGlvblxuICAgICAgbGFzdFNob3QubG9jYXRpb24gPSBgJHtsZXR0ZXJ9JHtpbmNyZWFzZX1gO1xuICAgICAgLy8gc2F2ZSBjYWxsIHRvIGZ1bmN0aW9uIGluIGEgdmFyaWFibGUgdG8gbGF0ZXIgY29tcGFyZVxuICAgICAgY29uc3QgYXR0ZW1wdCA9IGJvYXJkLnJlY2lldmVIaXQobGFzdFNob3QubG9jYXRpb24pO1xuICAgICAgLy8gaWYgc2hvdCBhbHJlYWR5IHRha2VuXG4gICAgICBpZiAoIWF0dGVtcHQpIHtcbiAgICAgICAgbGFzdFNob3QuaGl0ID0gZmFsc2U7XG4gICAgICAgIC8vIG5ldyBzaG90LCBidXQgcmFuZG9tXG4gICAgICAgIGNvbXB1dGVyQXR0YWNrKGJvYXJkKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0ZW1wdCA9PT0gJ21pc3MnKSB7XG4gICAgICAgIC8vIGlmIG1pc3NlZCBzaG90LCB1cGRhdGUgbGFzdHNob3QgdG8gZmFsc2VcbiAgICAgICAgbGFzdFNob3QuaGl0ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpZiBoaXQgdXBkYXRlIGxhc3Qgc2hvdCB0byBoaXQgYW5kIGxvY2F0aW9uIGFscmVhZHkgY2hhbmdlZFxuICAgICAgICBsYXN0U2hvdC5oaXQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBsYXN0IHNob3Qgd2FzIHRoZSBsYXN0IHNxdWFyZSBvZiBhIHJvdywgbWFrZSByYW5kb20gc2hvdFxuICAgICAgbGFzdFNob3QuaGl0ID0gZmFsc2U7XG4gICAgICBjb21wdXRlckF0dGFjayhib2FyZCk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSB1c2VyIGlucHV0XG4gIC8vIGFzIHdpdGggYWJvdmUgY2hlY2tzIGl0cyB2YWxpZFxuICBjb25zdCBwbGF5ZXJBdHRhY2sgPSAobG9jYXRpb24sIGJvYXJkKSA9PiAhIWJvYXJkLnJlY2lldmVIaXQobG9jYXRpb24pO1xuXG4gIHJldHVybiB7IGNvbXB1dGVyR3Vlc3MsIGNvbXB1dGVyQXR0YWNrLCBwbGF5ZXJBdHRhY2sgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IGdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgbmV3U2hpcCBmcm9tICcuL3NoaXAnO1xuXG4vLyBpbml0aWFsaXNlIHR3byBwbGF5ZXJzXG5leHBvcnQgY29uc3QgcGxheWVyT25lID0gUGxheWVyKCk7XG5leHBvcnQgY29uc3QgY29tcHV0ZXIgPSBQbGF5ZXIoKTtcblxuLy8gY3JlYXRlIHR3byBib2FyZHNcbmV4cG9ydCBjb25zdCBwbGF5ZXJCb2FyZCA9IGdhbWVib2FyZCgpO1xuZXhwb3J0IGNvbnN0IGNvbXBCb2FyZCA9IGdhbWVib2FyZCgpO1xuXG4vLyBnZXQgdGhlIGJvYXJkcyBvZiBlYWNoIHBsYXllclxuZXhwb3J0IGNvbnN0IGNvbXBET00gPSBjb21wQm9hcmQucHJpbnRCb2FyZCgpO1xuZXhwb3J0IGNvbnN0IHBsYXlET00gPSBwbGF5ZXJCb2FyZC5wcmludEJvYXJkKCk7XG5cbi8vIHJhbmRvbSBsZXR0ZXIgYW5kIG51bWJlciBnZW5lcmF0b3JzXG5jb25zdCBsZXR0ZXJzID0gWydhJywgJ2InLCAnYycsICdkJywgJ2UnLCAnZicsICdnJ107XG5jb25zdCByYW5kb21MZXR0ZXIgPSAoKSA9PiBgJHtsZXR0ZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDcpXX1gO1xuY29uc3QgcmFuZG9tTnVtYmVyID0gKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNyk7XG5cbi8vIHNoaXBzIGZvciBnYW1lIGFuZCB0aGVpciBsZW5ndGhzXG5jb25zdCBsZW5ndGhPZlNoaXBzID0gWzUsIDQsIDMsIDMsIDJdO1xuXG4vLyBmaWxsIHBsYXllcnMgYm9hcmQsIHVzaW5nIHJlY3Vyc2lvbiBpZiBmaXJzdCBzcG90IG5vdCBhdmFpbGFibGVcbmNvbnN0IHBsYWNlUFNoaXBzID0gKHNoaXApID0+IHtcbiAgaWYgKCFwbGF5ZXJCb2FyZC5wbGFjZVNoaXBzKHJhbmRvbUxldHRlcigpLCByYW5kb21OdW1iZXIoKSwgc2hpcCkpIHtcbiAgICBwbGFjZVBTaGlwcyhzaGlwKTtcbiAgfVxufTtcbi8vIGZpbGwgY29tcHV0ZXJzIGJvYXJkLCB1c2luZyByZWN1cnNpb24gaWYgZmlyc3Qgc3BvdCBub3QgYXZhaWxhYmxlXG5jb25zdCBwbGFjZUNTaGlwcyA9IChzaGlwKSA9PiB7XG4gIGlmICghY29tcEJvYXJkLnBsYWNlU2hpcHMocmFuZG9tTGV0dGVyKGxldHRlcnMsIDcpLCBwYXJzZUludChyYW5kb21OdW1iZXIoKSwgMTApLCBzaGlwKSkge1xuICAgIHBsYWNlQ1NoaXBzKHNoaXApO1xuICB9XG59O1xuXG4vLyByYW5kb21seSBwbGFjZSBlYWNoIHNoaXAgb24gZWFjaCBib2FyZFxubGVuZ3RoT2ZTaGlwcy5mb3JFYWNoKChudW1iZXIpID0+IHtcbiAgcGxhY2VQU2hpcHMobmV3U2hpcChudW1iZXIpKTtcbiAgcGxhY2VDU2hpcHMobmV3U2hpcChudW1iZXIpKTtcbn0pO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcmV0dXJuLWFzc2lnbiAqL1xuY29uc3QgbmV3U2hpcCA9IChsZW5ndGgpID0+IHtcbiAgbGV0IGNvdW50ID0gMDtcblxuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGg7XG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICBjb3VudCArPSAxO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuICBjb25zdCBoaXRDb3VudCA9ICgpID0+IGNvdW50O1xuICBjb25zdCBhbGl2ZSA9ICgpID0+IGNvdW50IDwgbGVuZ3RoO1xuXG4gIHJldHVybiB7XG4gICAgZ2V0TGVuZ3RoLCBoaXQsIGhpdENvdW50LCBhbGl2ZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5ld1NoaXA7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLWRlc3RydWN0dXJpbmcgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1lbXB0eS1wYXR0ZXJuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuLyogZXNsaW50LWRpc2FibGUgZ3VhcmQtZm9yLWluICovXG5pbXBvcnQgeyBjb21wQm9hcmQgfSBmcm9tICcuL3NldHVwJztcblxuZXhwb3J0IGNvbnN0IGZpbGxTaWRlID0gKCkgPT4ge1xuICBjb25zdCBob2xkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hpcEhvbGRlcicpO1xuICBjb25zdCB0b3BPZkhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0b3BPZkhvbGRlci5jbGFzc05hbWUgKz0gJ3RvcCc7XG4gIHRvcE9mSG9sZGVyLnRleHRDb250ZW50ID0gJ0VuZW15IHNoaXBzJztcbiAgaG9sZGVyLmFwcGVuZCh0b3BPZkhvbGRlcik7XG4gIGNvbnN0IHNoaXBzID0gY29tcEJvYXJkLnNoaXBMaXN0KCk7XG5cbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBsZW5ndGggPSBzaGlwLmdldExlbmd0aCgpO1xuICAgIGNvbnN0IGhpdHMgPSBzaGlwLmhpdENvdW50KCk7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTmFtZSArPSAnc2hpcCc7XG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnc2hpcCcsIGluZGV4KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGJveC5jbGFzc05hbWUgPSAncGFydCc7XG4gICAgICBpZiAoaSA+IDAgJiYgaSA8PSBoaXRzKSB7XG4gICAgICAgIGJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnZ3JlZW4nO1xuICAgICAgfVxuICAgICAgZGl2LmFwcGVuZChib3gpO1xuICAgIH1cbiAgICBob2xkZXIuYXBwZW5kKGRpdik7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZVNpZGUgPSAoKSA9PiB7XG4gIGNvbnN0IHNoaXBzID0gY29tcEJvYXJkLnNoaXBMaXN0KCk7XG4gIHNoaXBzLmZvckVhY2goKHNoaXAsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgaGl0cyA9IHNoaXAuaGl0Q291bnQoKSAtIDE7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW3NoaXA9XCIke2luZGV4fVwiXWApLmNoaWxkcmVuXTtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaSkgPT4geyBpZiAoaSA8PSBoaXRzKSB7IGNoaWxkLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdncmVlbic7IH0gfSk7XG4gIH0pO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBndWFyZC1mb3ItaW4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG4vLyBsb29wIHRocm91Z2ggdGhlIGJvYXJkIGFuZCB1cGRhdGUgdGhlIGNvbG91cnMgYWNjb3JpbmRpbmcgdG8gZGF0YVxuLy8gdXNpbmcgJ1dITz1cIj9cIicgdG8gc2VsZWN0IGNvcnJlY3RseVxuXG5pbXBvcnQgeyBjb21wRE9NIH0gZnJvbSAnLi9zZXR1cCc7XG5cbmNvbnN0IHVwZGF0ZUNvbXB1dGVyQm9hcmRET00gPSAoKSA9PiB7XG4gIGZvciAoY29uc3QgaXRlbSBpbiBjb21wRE9NKSB7XG4gICAgaWYgKGNvbXBET01baXRlbV0uaGlzdG9yeSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFt0YXJnZXQ9XCIke2NvbXBET01baXRlbV0ubG9jYXRpb259XCJdW3dobz1cIkNcIl1gKTtcbiAgICAgIGEuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2dyZWVuJztcbiAgICB9XG4gICAgaWYgKGNvbXBET01baXRlbV0uaGl0ID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW3RhcmdldD1cIiR7Y29tcERPTVtpdGVtXS5sb2NhdGlvbn1cIl1bd2hvPVwiQ1wiXWApO1xuICAgICAgYS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVwZGF0ZUNvbXB1dGVyQm9hcmRET007XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuLyogZXNsaW50LWRpc2FibGUgZ3VhcmQtZm9yLWluICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuLy8gbG9vcCB0aHJvdWdoIHRoZSBib2FyZCBhbmQgdXBkYXRlIHRoZSBjb2xvdXJzIGFjY29yaW5kaW5nIHRvIGRhdGFcbi8vIHVzaW5nICdXSE89XCI/XCInIHRvIHNlbGVjdCBjb3JyZWN0bHlcbi8vIGxvb3AgdGhyb3VnaCB0aGUgYm9hcmQgYW5kIHVwZGF0ZSB0aGUgY29sb3VycyBhY2NvcmluZGluZyB0byBkYXRhXG5cbmltcG9ydCB7IHBsYXlET00gfSBmcm9tICcuL3NldHVwJztcblxuY29uc3QgdXBkYXRlUGxheWVyQm9hcmRET00gPSAoKSA9PiB7XG4gIGZvciAoY29uc3QgaXRlbSBpbiBwbGF5RE9NKSB7XG4gICAgaWYgKHBsYXlET01baXRlbV0uc2hpcCkge1xuICAgICAgY29uc3QgYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFt0YXJnZXQ9XCIke2l0ZW19XCJdW3dobz1cIlBcIl1gKTtcbiAgICAgIGEuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2JsYWNrJztcbiAgICB9XG4gICAgaWYgKHBsYXlET01baXRlbV0uaGlzdG9yeSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFt0YXJnZXQ9XCIke3BsYXlET01baXRlbV0ubG9jYXRpb259XCJdW3dobz1cIlBcIl1gKTtcbiAgICAgIGEuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2dyZWVuJztcbiAgICB9XG4gICAgaWYgKHBsYXlET01baXRlbV0uaGl0ID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW3RhcmdldD1cIiR7cGxheURPTVtpdGVtXS5sb2NhdGlvbn1cIl1bd2hvPVwiUFwiXWApO1xuICAgICAgYS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVwZGF0ZVBsYXllckJvYXJkRE9NO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Nb250c2VycmF0OndnaHRANDAwOzYwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqe1xcbiAgbWFyZ2luOiAwcHg7XFxuICBwYWRkaW5nOiAwcHg7XFxuICBmb250LWZhbWlseTogJ01vbnRzZXJyYXQnLCBzYW5zLXNlcmlmO1xcbn1cXG5ib2R5e1xcbiB3aWR0aDogMTAwdnc7XFxuIGhlaWdodDogMTAwdmg7XFxuIGRpc3BsYXk6IGZsZXg7XFxuIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFxufVxcblxcbi5iYW5uZXJ7XFxuICBoZWlnaHQ6IDIwJTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwbGFjZS1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uY29udGFpbmVye1xcbiBkaXNwbGF5OiBmbGV4O1xcbiBhbGlnbi1pdGVtczogY2VudGVyO1xcbiBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gd2lkdGg6IDEwMCU7XFxufVxcblxcbi5mb290ZXJ7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG4gIGhlaWdodDogMjAlO1xcbn1cXG5cXG4uYm9hcmRPbmUsXFxuLmJvYXJkVHdvIHtcXG4gIGFzcGVjdC1yYXRpbzogMS8xO1xcbiAgd2lkdGg6IDMwJTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg3LCAxZnIpO1xcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLmJvYXJkT25lOjphZnRlcntcXG4gIGNvbnRlbnQ6ICdZb3VyIHNoaXBzJztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTotMTdweDtcXG4gIGxlZnQ6IDElO1xcbn1cXG4uYm9hcmRUd286OmFmdGVye1xcbiAgY29udGVudDogJ0F0dGFjayBoZXJlJztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTotMTdweDtcXG4gIGxlZnQ6IDElO1xcbn1cXG4uYm94e1xcbiAgYXNwZWN0LXJhdGlvOiAxLzE7XFxuICB3aWR0aDogODUlO1xcbiAgYm9yZGVyOiBzb2xpZCBibGFjayAxcHg7XFxufVxcblxcbi5zdGFydCxcXG4uZW5ke1xcbiAgaGVpZ2h0OiA1MCU7XFxuICB3aWR0aDogY2FsYygxMDB2aCAvIDMpO1xcbiAgYm9yZGVyLXJhZGl1czogLjVyZW07XFxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG59XFxuXFxuLnNoaXBIb2xkZXJ7XFxuICBoZWlnaHQ6IGNhbGMoICgxMDB2dyAvIDEwMCAqIDMwKSAtIDRweCApO1xcbiAgd2lkdGg6IDEwJTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDQwJSByZXBlYXQoNSwgMWZyKTtcXG59XFxuXFxuLnRvcHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcbiAgcGFkZGluZy1ib3R0b206IDMwJTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuLnNoaXB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcXG4gIG1hcmdpbjogMHB4IDEwcHg7XFxufVxcblxcbi5wYXJ0e1xcbiAgd2lkdGg6MTAwJTtcXG4gIGFzcGVjdC1yYXRpbzogMS8xO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG5cXG4uc2hpcDpsYXN0LWNoaWxke1xcbiAgbWFyZ2luLWJvdHRvbTogMjUlO1xcbn1cXG5cXG4ub25le1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1JTtcXG4gIGxlZnQ6IDUlO1xcbiAgd2lkdGg6IDIwJTtcXG59XFxuXFxuLnR3b3tcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTogNSU7XFxuICByaWdodDogNSU7XFxuICB3aWR0aDogMjAlO1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1oscUNBQXFDO0FBQ3ZDO0FBQ0E7Q0FDQyxZQUFZO0NBQ1osYUFBYTtDQUNiLGFBQWE7Q0FDYixzQkFBc0I7O0FBRXZCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYixtQkFBbUI7QUFDckI7O0FBRUE7Q0FDQyxhQUFhO0NBQ2IsbUJBQW1CO0NBQ25CLDZCQUE2QjtDQUM3QixXQUFXO0FBQ1o7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLFdBQVc7QUFDYjs7QUFFQTs7RUFFRSxpQkFBaUI7RUFDakIsVUFBVTtFQUNWLGFBQWE7RUFDYixxQ0FBcUM7RUFDckMsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osUUFBUTtBQUNWO0FBQ0E7RUFDRSxzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixRQUFRO0FBQ1Y7QUFDQTtFQUNFLGlCQUFpQjtFQUNqQixVQUFVO0VBQ1YsdUJBQXVCO0FBQ3pCOztBQUVBOztFQUVFLFdBQVc7RUFDWCxzQkFBc0I7RUFDdEIsb0JBQW9CO0VBQ3BCLHVCQUF1QjtFQUN2Qix1QkFBdUI7RUFDdkIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usd0NBQXdDO0VBQ3hDLFVBQVU7RUFDVixhQUFhO0VBQ2Isc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsWUFBWTtBQUNkO0FBQ0E7RUFDRSxhQUFhO0VBQ2IscUNBQXFDO0VBQ3JDLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFVBQVU7RUFDVixpQkFBaUI7RUFDakIscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLE9BQU87RUFDUCxRQUFRO0VBQ1IsVUFBVTtBQUNaOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixTQUFTO0VBQ1QsVUFBVTtFQUNWLHlCQUF5QjtBQUMzQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Nb250c2VycmF0OndnaHRANDAwOzYwMCZkaXNwbGF5PXN3YXAnKTtcXG5cXG4qe1xcbiAgbWFyZ2luOiAwcHg7XFxuICBwYWRkaW5nOiAwcHg7XFxuICBmb250LWZhbWlseTogJ01vbnRzZXJyYXQnLCBzYW5zLXNlcmlmO1xcbn1cXG5ib2R5e1xcbiB3aWR0aDogMTAwdnc7XFxuIGhlaWdodDogMTAwdmg7XFxuIGRpc3BsYXk6IGZsZXg7XFxuIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFxufVxcblxcbi5iYW5uZXJ7XFxuICBoZWlnaHQ6IDIwJTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwbGFjZS1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uY29udGFpbmVye1xcbiBkaXNwbGF5OiBmbGV4O1xcbiBhbGlnbi1pdGVtczogY2VudGVyO1xcbiBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gd2lkdGg6IDEwMCU7XFxufVxcblxcbi5mb290ZXJ7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG4gIGhlaWdodDogMjAlO1xcbn1cXG5cXG4uYm9hcmRPbmUsXFxuLmJvYXJkVHdvIHtcXG4gIGFzcGVjdC1yYXRpbzogMS8xO1xcbiAgd2lkdGg6IDMwJTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg3LCAxZnIpO1xcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLmJvYXJkT25lOjphZnRlcntcXG4gIGNvbnRlbnQ6ICdZb3VyIHNoaXBzJztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTotMTdweDtcXG4gIGxlZnQ6IDElO1xcbn1cXG4uYm9hcmRUd286OmFmdGVye1xcbiAgY29udGVudDogJ0F0dGFjayBoZXJlJztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTotMTdweDtcXG4gIGxlZnQ6IDElO1xcbn1cXG4uYm94e1xcbiAgYXNwZWN0LXJhdGlvOiAxLzE7XFxuICB3aWR0aDogODUlO1xcbiAgYm9yZGVyOiBzb2xpZCBibGFjayAxcHg7XFxufVxcblxcbi5zdGFydCxcXG4uZW5ke1xcbiAgaGVpZ2h0OiA1MCU7XFxuICB3aWR0aDogY2FsYygxMDB2aCAvIDMpO1xcbiAgYm9yZGVyLXJhZGl1czogLjVyZW07XFxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG59XFxuXFxuLnNoaXBIb2xkZXJ7XFxuICBoZWlnaHQ6IGNhbGMoICgxMDB2dyAvIDEwMCAqIDMwKSAtIDRweCApO1xcbiAgd2lkdGg6IDEwJTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDQwJSByZXBlYXQoNSwgMWZyKTtcXG59XFxuXFxuLnRvcHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcbiAgcGFkZGluZy1ib3R0b206IDMwJTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuLnNoaXB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcXG4gIG1hcmdpbjogMHB4IDEwcHg7XFxufVxcblxcbi5wYXJ0e1xcbiAgd2lkdGg6MTAwJTtcXG4gIGFzcGVjdC1yYXRpbzogMS8xO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG5cXG4uc2hpcDpsYXN0LWNoaWxke1xcbiAgbWFyZ2luLWJvdHRvbTogMjUlO1xcbn1cXG5cXG4ub25le1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1JTtcXG4gIGxlZnQ6IDUlO1xcbiAgd2lkdGg6IDIwJTtcXG59XFxuXFxuLnR3b3tcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTogNSU7XFxuICByaWdodDogNSU7XFxuICB3aWR0aDogMjAlO1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbInVwZGF0ZVNpZGUiLCJ1cGRhdGVDb21wdXRlckJvYXJkRE9NIiwidXBkYXRlUGxheWVyQm9hcmRET00iLCJsb2dvIiwiY3JlYXRlRE9NIiwiY3JlYXRlIiwiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImJhbm5lciIsImNyZWF0ZUVsZW1lbnQiLCJmb290ZXIiLCJjb250YWluZXIiLCJzaGlwcyIsImNsYXNzTmFtZSIsImJ1dHRvbiIsInRleHRDb250ZW50IiwiYXBwZW5kIiwiYm9hcmRPbmUiLCJib2FyZFR3byIsImltZyIsInNyYyIsImltZ1R3byIsImxldHRlcnMiLCJsZXR0ZXIiLCJudW1iZXIiLCJzdGFydCIsImVuZCIsImJveDEiLCJib3gyIiwic2V0QXR0cmlidXRlIiwiY291bnRlciIsImxvYWRET00iLCJhZ2FpbiIsInN0eWxlIiwiZGlzcGxheSIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsImdhbWVib2FyZCIsImJvYXJkIiwic2hpcExpc3QiLCJzaGlwIiwiaGlzdG9yeSIsImhpdCIsImNoZWNrTnVsbCIsImwiLCJuIiwibGVuZ3RoIiwiaSIsInBsYWNlU2hpcHMiLCJnZXRMZW5ndGgiLCJwdXNoIiwicHJpbnRCb2FyZCIsInJlY2lldmVIaXQiLCJsb2NhbCIsImNoZWNrQWxpdmUiLCJhbGl2ZSIsImZpbHRlciIsIm1haW4iLCJmaWxsU2lkZSIsIm1haW5HYW1lIiwicGxheWVyT25lIiwiY29tcHV0ZXIiLCJwbGF5ZXJCb2FyZCIsImNvbXBCb2FyZCIsImdhbWVPdmVyIiwidHVybiIsImNoYW5nZVR1cm4iLCJwbGF5R2FtZSIsImNob2ljZSIsInBsYXllckF0dGFjayIsImNvbXB1dGVyQXR0YWNrIiwiYm94ZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImJveCIsImJhY2tncm91bmRDb2xvciIsIm1pc3MiLCJhdmFpbGFibGUiLCJhdHRyaWJ1dGVzIiwidGFyZ2V0IiwidmFsdWUiLCJQbGF5ZXIiLCJsYXN0U2hvdCIsInJhbmRvbSIsImZpcnN0TnVtYmVyIiwiTWF0aCIsImZsb29yIiwic2Vjb25kTnVtYmVyIiwiY29tcHV0ZXJHdWVzcyIsImd1ZXNzIiwiYXR0ZW1wdCIsImluY3JlYXNlIiwicGFyc2VJbnQiLCJuZXdTaGlwIiwiY29tcERPTSIsInBsYXlET00iLCJyYW5kb21MZXR0ZXIiLCJyYW5kb21OdW1iZXIiLCJsZW5ndGhPZlNoaXBzIiwicGxhY2VQU2hpcHMiLCJwbGFjZUNTaGlwcyIsImNvdW50IiwiaGl0Q291bnQiLCJob2xkZXIiLCJ0b3BPZkhvbGRlciIsImluZGV4IiwiaGl0cyIsImRpdiIsImNoaWxkcmVuIiwiY2hpbGQiLCJpdGVtIiwiYSJdLCJzb3VyY2VSb290IjoiIn0=