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
const updateSide = () => {
  const ships = _setup__WEBPACK_IMPORTED_MODULE_0__.compBoard.shipList();
  ships.forEach((ship, index) => {
    const hits = ship.hitCount() - 1;
    const children = [...document.querySelector(`[ship="${index}"]`).children];
    children.forEach((child, i) => {
      if (i <= hits) {
        child.style.backgroundColor = 'red';
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
___CSS_LOADER_EXPORT___.push([module.id, "*{\n  margin: 0px;\n  padding: 0px;\n  font-family: 'Montserrat', sans-serif;\n}\nbody{\n width: 100vw;\n display: flex;\n flex-direction: column;\n}\n\n.banner{\n  height: 100px;\n  display: grid;\n  place-items: center;\n}\n\n.container{\n  align-self: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-evenly;\n  width: 90%;\n  gap: 50px;\n}\n\n.footer{\n  display: grid;\n  place-items: center;\n  height: 100px;\n}\n\n.boardOne,\n.boardTwo {\n  aspect-ratio: 1/1;\n  width: 60%;\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  place-items: center;\n  position: relative;\n}\n.boardOne::after{\n  content: 'Your ships';\n  position: absolute;\n  bottom:-17px;\n  left: 1%;\n}\n.boardTwo::after{\n  content: 'Attack here';\n  position: absolute;\n  bottom:-17px;\n  left: 1%;\n}\n.box{\n  aspect-ratio: 1/1;\n  width: 85%;\n  border: solid black 1px;\n}\n\n.start,\n.end{\n  height: 50%;\n  width: calc(100vh / 3);\n  border-radius: .5rem;\n  border: 1px solid black;\n  background-color: white;\n  font-weight: 600;\n}\n\n.shipHolder{\n  height: calc( (100vw / 100 * 30) - 4px );\n  width: 30%;\n  display: grid;\n  grid-template-rows: 40% repeat(5, 1fr);\n}\n\n.top{\n  width: 100%;\n  display: grid;\n  justify-content: center;\n  align-items: flex-end;\n  padding-bottom: 30%;\n  text-align: center;\n  color: black;\n}\n.ship{\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  margin: 0px 10px;\n}\n\n.part{\n  width:100%;\n  aspect-ratio: 1/1;\n  background-color: black;\n}\n\n.ship:last-child{\n  margin-bottom: 25%;\n}\n\n.one{\n  position: absolute;\n  top: 5%;\n  left: 5%;\n  width: 20%;\n}\n\n.two{\n  position: absolute;\n  bottom: 5%;\n  right: 5%;\n  width: 20%;\n  transform: rotate(180deg);\n}\n\n@media screen and (min-width: 600px){\n  .container{\n    flex-direction: row;\n    margin: 30px 50px;\n  }\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAEA;EACE,WAAW;EACX,YAAY;EACZ,qCAAqC;AACvC;AACA;CACC,YAAY;CACZ,aAAa;CACb,sBAAsB;AACvB;;AAEA;EACE,aAAa;EACb,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,6BAA6B;EAC7B,UAAU;EACV,SAAS;AACX;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,aAAa;AACf;;AAEA;;EAEE,iBAAiB;EACjB,UAAU;EACV,aAAa;EACb,qCAAqC;EACrC,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,YAAY;EACZ,QAAQ;AACV;AACA;EACE,sBAAsB;EACtB,kBAAkB;EAClB,YAAY;EACZ,QAAQ;AACV;AACA;EACE,iBAAiB;EACjB,UAAU;EACV,uBAAuB;AACzB;;AAEA;;EAEE,WAAW;EACX,sBAAsB;EACtB,oBAAoB;EACpB,uBAAuB;EACvB,uBAAuB;EACvB,gBAAgB;AAClB;;AAEA;EACE,wCAAwC;EACxC,UAAU;EACV,aAAa;EACb,sCAAsC;AACxC;;AAEA;EACE,WAAW;EACX,aAAa;EACb,uBAAuB;EACvB,qBAAqB;EACrB,mBAAmB;EACnB,kBAAkB;EAClB,YAAY;AACd;AACA;EACE,aAAa;EACb,qCAAqC;EACrC,gBAAgB;AAClB;;AAEA;EACE,UAAU;EACV,iBAAiB;EACjB,uBAAuB;AACzB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,OAAO;EACP,QAAQ;EACR,UAAU;AACZ;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,SAAS;EACT,UAAU;EACV,yBAAyB;AAC3B;;AAEA;EACE;IACE,mBAAmB;IACnB,iBAAiB;EACnB;AACF","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');\n\n*{\n  margin: 0px;\n  padding: 0px;\n  font-family: 'Montserrat', sans-serif;\n}\nbody{\n width: 100vw;\n display: flex;\n flex-direction: column;\n}\n\n.banner{\n  height: 100px;\n  display: grid;\n  place-items: center;\n}\n\n.container{\n  align-self: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-evenly;\n  width: 90%;\n  gap: 50px;\n}\n\n.footer{\n  display: grid;\n  place-items: center;\n  height: 100px;\n}\n\n.boardOne,\n.boardTwo {\n  aspect-ratio: 1/1;\n  width: 60%;\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  place-items: center;\n  position: relative;\n}\n.boardOne::after{\n  content: 'Your ships';\n  position: absolute;\n  bottom:-17px;\n  left: 1%;\n}\n.boardTwo::after{\n  content: 'Attack here';\n  position: absolute;\n  bottom:-17px;\n  left: 1%;\n}\n.box{\n  aspect-ratio: 1/1;\n  width: 85%;\n  border: solid black 1px;\n}\n\n.start,\n.end{\n  height: 50%;\n  width: calc(100vh / 3);\n  border-radius: .5rem;\n  border: 1px solid black;\n  background-color: white;\n  font-weight: 600;\n}\n\n.shipHolder{\n  height: calc( (100vw / 100 * 30) - 4px );\n  width: 30%;\n  display: grid;\n  grid-template-rows: 40% repeat(5, 1fr);\n}\n\n.top{\n  width: 100%;\n  display: grid;\n  justify-content: center;\n  align-items: flex-end;\n  padding-bottom: 30%;\n  text-align: center;\n  color: black;\n}\n.ship{\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  margin: 0px 10px;\n}\n\n.part{\n  width:100%;\n  aspect-ratio: 1/1;\n  background-color: black;\n}\n\n.ship:last-child{\n  margin-bottom: 25%;\n}\n\n.one{\n  position: absolute;\n  top: 5%;\n  left: 5%;\n  width: 20%;\n}\n\n.two{\n  position: absolute;\n  bottom: 5%;\n  right: 5%;\n  width: 20%;\n  transform: rotate(180deg);\n}\n\n@media screen and (min-width: 600px){\n  .container{\n    flex-direction: row;\n    margin: 30px 50px;\n  }\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFpbkxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zZXR1cC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwSG9sZGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdXBkYXRlQ29tcHV0ZXJCb2FyZERPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3VwZGF0ZVBsYXllckJvYXJkRE9NLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cbi8qIGVzbGludC1kaXNhYmxlIGd1YXJkLWZvci1pbiAqL1xuXG5pbXBvcnQgeyB1cGRhdGVTaWRlIH0gZnJvbSAnLi9zaGlwSG9sZGVyJztcbmltcG9ydCB1cGRhdGVDb21wdXRlckJvYXJkRE9NIGZyb20gJy4vdXBkYXRlQ29tcHV0ZXJCb2FyZERPTSc7XG5pbXBvcnQgdXBkYXRlUGxheWVyQm9hcmRET00gZnJvbSAnLi91cGRhdGVQbGF5ZXJCb2FyZERPTSc7XG5pbXBvcnQgbG9nbyBmcm9tICcuL2xvZ28ucG5nJztcblxuY29uc3QgY3JlYXRlRE9NID0gKCkgPT4ge1xuICBjb25zdCBjcmVhdGUgPSAoKSA9PiB7XG4gICAgLy8gc2V0IHVwIG9mIG1haW4gYm9keVxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgY29uc3QgYmFubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHNoaXBzLmNsYXNzTmFtZSArPSAnc2hpcEhvbGRlcic7XG4gICAgYmFubmVyLmNsYXNzTmFtZSArPSAnYmFubmVyJztcbiAgICBjb250YWluZXIuY2xhc3NOYW1lICs9ICdjb250YWluZXInO1xuICAgIGZvb3Rlci5jbGFzc05hbWUgKz0gJ2Zvb3Rlcic7XG5cbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidXR0b24uY2xhc3NOYW1lICs9ICdzdGFydCc7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gJ1NUQVJUJztcblxuICAgIGZvb3Rlci5hcHBlbmQoYnV0dG9uKTtcbiAgICBib2R5LmFwcGVuZChiYW5uZXIpO1xuICAgIGJvZHkuYXBwZW5kKGNvbnRhaW5lcik7XG4gICAgYm9keS5hcHBlbmQoZm9vdGVyKTtcblxuICAgIC8vIHNldCB1cCBib2FyZHNcbiAgICBjb25zdCBib2FyZE9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGJvYXJkVHdvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYm9hcmRPbmUuY2xhc3NOYW1lID0gJ2JvYXJkT25lJztcbiAgICBib2FyZFR3by5jbGFzc05hbWUgPSAnYm9hcmRUd28nO1xuXG4gICAgLy8gaW1hZ2Ugb2YgbG9nb1xuICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGltZy5zcmMgPSBsb2dvO1xuICAgIGltZy5jbGFzc05hbWUgKz0gJ29uZSc7XG4gICAgYm9keS5hcHBlbmQoaW1nKTtcblxuICAgIC8vIGltYWdlIG9mIGxvZ29cbiAgICBjb25zdCBpbWdUd28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpbWdUd28uc3JjID0gbG9nbztcbiAgICBpbWdUd28uY2xhc3NOYW1lICs9ICd0d28nO1xuICAgIGJvZHkuYXBwZW5kKGltZ1R3byk7XG5cbiAgICAvLyBsb29wIHRocm91Z2ggYW5kIGNyZWF0ZSA3IHggNyBib2FyZCAtIGEwLCBhMSAuLi4gZzZcbiAgICAvLyBjcmVhdGUgYm94ZXMgZm9yIGVhY2ggYm9hcmQgd2l0aCBkaWZmZXJlbnQgbmFtZXNcbiAgICAvLyBzbyBET00gY2FuIGJlIHVwZGF0ZWQgYWNjdXJldGx5XG4gICAgLy8gbGV0dGVyc1xuICAgIGNvbnN0IGxldHRlcnMgPSBbJ2EnLCAnYicsICdjJywgJ2QnLCAnZScsICdmJywgJ2cnXTtcbiAgICBmb3IgKGNvbnN0IGxldHRlciBpbiBsZXR0ZXJzKSB7XG4gICAgICBmb3IgKGNvbnN0IG51bWJlciBpbiBsZXR0ZXJzKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbGV0dGVyc1tsZXR0ZXJdO1xuICAgICAgICBjb25zdCBlbmQgPSBudW1iZXI7XG4gICAgICAgIGNvbnN0IGJveDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgYm94MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGJveDEuY2xhc3NOYW1lID0gJ2JveCc7XG4gICAgICAgIGJveDEuc2V0QXR0cmlidXRlKCd3aG8nLCAnUCcpO1xuICAgICAgICBib3gxLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgYCR7c3RhcnQgKyBlbmR9YCk7XG5cbiAgICAgICAgYm94Mi5jbGFzc05hbWUgPSAnYm94JztcbiAgICAgICAgYm94Mi5zZXRBdHRyaWJ1dGUoJ3dobycsICdDJyk7XG4gICAgICAgIGJveDIuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCBgJHtzdGFydCArIGVuZH1gKTtcblxuICAgICAgICBib2FyZE9uZS5hcHBlbmQoYm94MSk7XG4gICAgICAgIGJvYXJkVHdvLmFwcGVuZChib3gyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gYWRkIGJvYXJkcyB0byBiYWNrZ3JvdW5kXG4gICAgY29udGFpbmVyLmFwcGVuZChib2FyZE9uZSk7XG4gICAgY29udGFpbmVyLmFwcGVuZChib2FyZFR3byk7XG4gICAgY29udGFpbmVyLmFwcGVuZChzaGlwcyk7XG4gIH07XG4gIGxldCBjb3VudGVyID0gMDtcbiAgY29uc3QgbG9hZERPTSA9ICgpID0+IHtcbiAgICAvLyBsb2FkIGxvYWRlZCBib2FyZCB0byBzY3JlZW5cbiAgICB1cGRhdGVDb21wdXRlckJvYXJkRE9NKCk7XG4gICAgdXBkYXRlUGxheWVyQm9hcmRET00oKTtcbiAgICBpZiAoY291bnRlciAhPT0gMCkgeyB1cGRhdGVTaWRlKCk7IH1cbiAgICBjb3VudGVyICs9IDE7XG4gIH07XG5cbiAgY29uc3QgYWdhaW4gPSAoKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0Jyk7XG4gICAgYnV0dG9uLmNsYXNzTmFtZSA9ICdlbmQnO1xuICAgIGJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSAnUGxheSBhZ2Fpbj8nO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4geyBjcmVhdGUsIGxvYWRET00sIGFnYWluIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVET007XG5cbi8vIGdldCBhbGwgc2hpcHNcbi8vIHNoaXBzIC5sZW5ndGggZm9yIGxlbmd0aFxuLy8gc2hpcHMgLmhpdGNvdW50IGZvciBjb2xvclxuLy8gY2FsbCB1cGRheWVkIHdpdGhpbiBsb2FkRE9NXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cbi8qIGVzbGludC1kaXNhYmxlIGd1YXJkLWZvci1pbiAqL1xuXG5jb25zdCBnYW1lYm9hcmQgPSAoKSA9PiB7XG4gIC8vIDcgeCA3IGdyaWRcbiAgY29uc3QgbGV0dGVycyA9IFsnYScsICdiJywgJ2MnLCAnZCcsICdlJywgJ2YnLCAnZyddO1xuICAvLyBlbXB0eSBib2FyZCBhcnJheVxuICBjb25zdCBib2FyZCA9IHt9O1xuICAvLyBsaXN0IG9mIHNoaXBzIG9uIGJvYXJkXG4gIGNvbnN0IHNoaXBzID0gW107XG4gIC8vIGV4cG9ydCBsaXN0IG9mIHNoaXBzXG4gIGNvbnN0IHNoaXBMaXN0ID0gKCkgPT4gc2hpcHM7XG5cbiAgLy8gbG9vcCB0aHJvdWdoIGFuZCBjcmVhdGUgNyB4IDcgYm9hcmQgLSBhMCwgYTEgLi4uIGc2XG4gIC8vIHNldCBrZXlzIGFuZCB0aGVpciB2YWx1ZXNcbiAgZm9yIChjb25zdCBsZXR0ZXIgaW4gbGV0dGVycykge1xuICAgIGZvciAoY29uc3QgbnVtYmVyIGluIGxldHRlcnMpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gbGV0dGVyc1tsZXR0ZXJdO1xuICAgICAgY29uc3QgZW5kID0gbnVtYmVyO1xuICAgICAgYm9hcmRbc3RhcnQgKyBlbmRdID0ge1xuICAgICAgICBzaGlwOiBudWxsLFxuICAgICAgICBoaXN0b3J5OiBmYWxzZSxcbiAgICAgICAgaGl0OiBmYWxzZSxcbiAgICAgICAgbG9jYXRpb246IHN0YXJ0ICsgZW5kLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvLyBsb29wIHRocm91Z2ggY29vcmRpbmF0ZXMgKGExIC0gYTUpIGFuZCBjaGVjayBhbGwgYXJlIGVtcHR5XG4gIGNvbnN0IGNoZWNrTnVsbCA9IChsLCBuLCBsZW5ndGgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gbjsgaSAtIG4gPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGJvYXJkW2wgKyBpXS5zaGlwICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvLyBwbGFjZSBzaGlwIG9udG8gYm9hcmRcbiAgY29uc3QgcGxhY2VTaGlwcyA9IChsLCBuLCBzaGlwKSA9PiB7XG4gICAgLy8gc3RvcmUgbGVuZ3RoXG4gICAgY29uc3QgbGVuZ3RoID0gc2hpcC5nZXRMZW5ndGgoKTtcbiAgICAvLyBjaGVjayBzaGlwIHdpbGwgZml0IG9udG8gYm9hcmRcbiAgICBpZiAobiArIGxlbmd0aCA8PSA3KSB7XG4gICAgICAvLyBjaGVjayBhbGwgc3BvdHMgZm9yIHRoZSBzaGlwIHdpbGwgb2NjdXB5IGFyZSBlbXB0eVxuICAgICAgaWYgKGNoZWNrTnVsbChsLCBuLCBsZW5ndGgpKSB7XG4gICAgICAgIHNoaXBzLnB1c2goc2hpcCk7XG4gICAgICAgIGZvciAobGV0IGkgPSBuOyBpIC0gbiA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgLy8gaWYgY2xlYXIgYWRkIHNoaXAgdG8gZWFjaCBzcXVhcmVcbiAgICAgICAgICBib2FyZFtsICsgaV0uc2hpcCA9IHNoaXA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIHNwYWNlIHRha2VuIHJldHVybiBmYWxzZVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIHNoaXAgd2lsbCBvdmVyZmxvdyBib2FyZFxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBpZiBzaGlwIGxheWVkIHN1Y2Nlc2Z1bGx5LCByZXR1cm4gdHJ1ZVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8vIHJldHVybnMgdGhlIGJvYXJkXG4gIGNvbnN0IHByaW50Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuICAvLyBhZGQgaGl0IHRvIGJvYXJkXG4gIGNvbnN0IHJlY2lldmVIaXQgPSAobG9jYXRpb24pID0+IHtcbiAgICAvLyBjaGVjayBmb3IgZHVwbGljYXRlIHNob3RcbiAgICBjb25zdCBsb2NhbCA9IGJvYXJkW2xvY2F0aW9uXTtcbiAgICBpZiAobG9jYWwuaGlzdG9yeSA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIGlmIHRoZXJlIGlzIGEgc2hpcCBoZXJlXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmcsIGRvdC1ub3RhdGlvblxuICAgICAgaWYgKGxvY2FsLnNoaXApIHtcbiAgICAgICAgLy8gY2hlY2sgdGhlIHNoaXAgaXMgYWxpdmUgYW5kIHVzZXIgaGFzbnQgYmVlbiBoZXJlIHlldFxuICAgICAgICAvLyBoaXQgc2hpcFxuICAgICAgICBsb2NhbC5zaGlwLmhpdCgpO1xuICAgICAgICAvLyB1cGRhdGUgYm9hcmQgb2YgaGl0IGxvY2F0aW9uc1xuICAgICAgICBsb2NhbC5oaXN0b3J5ID0gdHJ1ZTtcbiAgICAgICAgbG9jYWwuaGl0ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuICdoaXQnO1xuICAgICAgfVxuICAgICAgLy8gaWYgbm8gaGl0LCB1cGRhdGUgdGhlIGJvYXJkIGFzIGEgbWlzc2VkIGhpdFxuICAgICAgbG9jYWwuaGlzdG9yeSA9IHRydWU7XG4gICAgICByZXR1cm4gJ21pc3MnO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgLy8gY2hlY2sgaWYgdGhpcyBib2FyZCBzdGlsbCBhbGl2ZVxuICBjb25zdCBjaGVja0FsaXZlID0gKCkgPT4ge1xuICAgIC8vIGZpbHRlciBhbGwgc2hpcHMgdGhhdCBhcmUgc3RpbGwgYWxpdmVcbiAgICBjb25zdCBhbGl2ZSA9IHNoaXBzLmZpbHRlcigoc2hpcCkgPT4gc2hpcC5hbGl2ZSgpKTtcbiAgICAvLyByZXR1cm4gYm9vbGVhbiBvZiBob3cgbWFueSBzaGlwcyBhcmUgYWxpdmVcbiAgICByZXR1cm4gISFhbGl2ZS5sZW5ndGg7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXBzLFxuICAgIHByaW50Qm9hcmQsXG4gICAgcmVjaWV2ZUhpdCxcbiAgICBjaGVja0FsaXZlLFxuICAgIHNoaXBMaXN0LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkO1xuIiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgeyBtYWluLCBjcmVhdGUgfSBmcm9tICcuL21haW5Mb29wJztcbmltcG9ydCB7IGZpbGxTaWRlIH0gZnJvbSAnLi9zaGlwSG9sZGVyJztcblxuY29uc3QgbWFpbkdhbWUgPSBtYWluKCk7XG5jb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQnKTtcbmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY3JlYXRlLmxvYWRET00oKTtcbiAgbWFpbkdhbWUuc3RhcnQoKTtcbiAgYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGZpbGxTaWRlKCk7XG59KTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24gKi9cblxuaW1wb3J0IHtcbiAgcGxheWVyT25lLCBjb21wdXRlciwgcGxheWVyQm9hcmQsIGNvbXBCb2FyZCxcbn0gZnJvbSAnLi9zZXR1cCc7XG5cbmltcG9ydCBjcmVhdGVET00gZnJvbSAnLi9ET00nO1xuLy8gY3JlYXRlIERPTSBleHBvcnQgdG8gdXNlIGluIGluZGV4LmpzXG5leHBvcnQgY29uc3QgY3JlYXRlID0gY3JlYXRlRE9NKCk7XG5cbmV4cG9ydCBjb25zdCBtYWluID0gKCkgPT4ge1xuICAvLyBnYW1lIGNvbnRyb2xcbiAgbGV0IGdhbWVPdmVyID0gZmFsc2U7XG4gIGxldCB0dXJuID0gJ3BsYXllcic7XG4gIGNvbnN0IGNoYW5nZVR1cm4gPSAoKSA9PiB0dXJuID0gdHVybiA9PT0gJ3BsYXllcicgPyAnY29tcHV0ZXInIDogJ3BsYXllcic7XG5cbiAgY3JlYXRlLmNyZWF0ZSgpO1xuICBjb25zdCBiYW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFubmVyJyk7XG4gIGNvbnN0IHBsYXlHYW1lID0gKGNob2ljZSkgPT4ge1xuICAgIC8vIHBsYXkgdXNlciBjaG9pY2VcbiAgICAvLyBjaGVjayBib2FyZCBzdGlsbCBhbGl2ZVxuICAgIGlmIChjb21wQm9hcmQuY2hlY2tBbGl2ZSgpKSB7XG4gICAgICAvLyB1c2VycyBjaG9pY2UgYW5kIHRvIHdoaWNoIGJvYXJkXG4gICAgICBwbGF5ZXJPbmUucGxheWVyQXR0YWNrKGNob2ljZSwgY29tcEJvYXJkKTtcbiAgICAgIGNyZWF0ZS5sb2FkRE9NKCk7XG4gICAgICBjaGFuZ2VUdXJuKCk7XG4gICAgICAvLyBpZiBjb21wdXRlciBib2FyZCBpcyBmaW5pc2hlZCB0aGVuIHJldHVyblxuICAgICAgLy8gd2lubmVyIGFuZCB1cGRhdGUgYm9hcmRcbiAgICAgIGlmICghKGNvbXBCb2FyZC5jaGVja0FsaXZlKCkpKSB7XG4gICAgICAgIGdhbWVPdmVyID0gdHJ1ZTtcbiAgICAgICAgYmFubmVyLnRleHRDb250ZW50ID0gJ0NvbmdyYXR1bGF0aW9ucywgeW91IHdvbi4nO1xuICAgICAgICBjcmVhdGUuYWdhaW4oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjaGVjayB1c2VyIHN0aWxsIGluIHBsYXlcbiAgICBpZiAocGxheWVyQm9hcmQuY2hlY2tBbGl2ZSgpKSB7XG4gICAgICAvLyBwbGF5IGNvbXB1dGVyIGd1ZXNzXG4gICAgICAvLyB3aWxsIHVzZSByZWN1c2lvbiB0byBmaW5kIGFuIGFjY2VwdGFibGUgc2hvdFxuICAgICAgY29tcHV0ZXIuY29tcHV0ZXJBdHRhY2socGxheWVyQm9hcmQpO1xuICAgICAgY3JlYXRlLmxvYWRET00oKTtcbiAgICAgIC8vIGlmIHBsYXllciBib2FyZCBpcyBmaW5pc2hlZCB0aGVuIHJldHVyblxuICAgICAgLy8gd2lubmVyIGFuZCB1cGRhdGUgYm9hcmRcbiAgICAgIGlmICghKHBsYXllckJvYXJkLmNoZWNrQWxpdmUoKSkpIHtcbiAgICAgICAgZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICBiYW5uZXIudGV4dENvbnRlbnQgPSAnQmV0dGVyIGx1Y2sgbmV4dCB0aW1lLCB0aGUgY29tcHV0ZXIgd29uLic7XG4gICAgICAgIGNyZWF0ZS5hZ2FpbigpO1xuICAgICAgfVxuICAgICAgY2hhbmdlVHVybigpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBjb3JyZWN0IHNxdWFyZXNcbiAgICAvLyBnYW1lIHBsYXlzIG9uIHVzZXIgaW5wdXQgLSBhdXRvIGNvbXB1dGVyIHNob3RcbiAgICBjb25zdCBib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1t3aG89XCJDXCJdJyk7XG4gICAgYm94ZXMuZm9yRWFjaCgoYm94KSA9PiB7XG4gICAgICBib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhpdCA9IGJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPT09ICdyZWQnO1xuICAgICAgICBjb25zdCBtaXNzID0gYm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9PT0gJ2dyZWVuJztcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlID0gISEobWlzcyA9PT0gZmFsc2UgJiYgaGl0ID09PSBmYWxzZSk7XG4gICAgICAgIGlmICghZ2FtZU92ZXIgJiYgdHVybiA9PT0gJ3BsYXllcicgJiYgYXZhaWxhYmxlID09PSB0cnVlKSB7XG4gICAgICAgICAgcGxheUdhbWUoYm94LmF0dHJpYnV0ZXMudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHsgc3RhcnQgfTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWV4cHJlc3Npb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXNzaWduICovXG5cbmNvbnN0IFBsYXllciA9ICgpID0+IHtcbiAgLy8ga2VlcCB0cmFjayBvZmYgbGFzdCBzaG90IGFuZCBpZiBzdWNjZXNmdWxcbiAgY29uc3QgbGFzdFNob3QgPSB7XG4gICAgbG9jYXRpb246ICcnLFxuICAgIGhpdDogZmFsc2UsXG4gIH07XG5cbiAgLy8gZ2V0IHJhbmRvbSBjb29yZGluYXRlc1xuICBjb25zdCByYW5kb20gPSAobGV0dGVyLCBudW1iZXIpID0+IHtcbiAgICBjb25zdCBmaXJzdE51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51bWJlcik7XG4gICAgY29uc3Qgc2Vjb25kTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbnVtYmVyKTtcbiAgICByZXR1cm4gYCR7bGV0dGVyW2ZpcnN0TnVtYmVyXX0ke3NlY29uZE51bWJlcn1gO1xuICB9O1xuXG4gIC8vIGdldCByYW5kb20gY29vcmRzXG4gIGNvbnN0IGNvbXB1dGVyR3Vlc3MgPSAoKSA9PiB7XG4gICAgY29uc3QgbGV0dGVycyA9IFsnYScsICdiJywgJ2MnLCAnZCcsICdlJywgJ2YnLCAnZyddO1xuICAgIGNvbnN0IHsgbGVuZ3RoIH0gPSBsZXR0ZXJzO1xuICAgIC8vIHJldHVybiB0aGUgY29vcmRzLCByZXR1cm5lZCBieSByYW5kb20gZnVuY3Rpb25cbiAgICByZXR1cm4gcmFuZG9tKGxldHRlcnMsIGxlbmd0aCk7XG4gIH07XG5cbiAgLy8gY29tcHV0ZXIgY2FuIG1ha2UgYSByYW5kb20gZ3Vlc3Mgb3Igc2lkZSBzaG90IGlmIGxhc3Qgd2FzIHN1Y2Nlc2Z1bFxuICBjb25zdCBjb21wdXRlckF0dGFjayA9IChib2FyZCkgPT4ge1xuICAgIC8vIGlmIGxhc3Qgc2hvdCB3YXMgd3JvbmcsIG1ha2UgbmV3IGd1ZXNzXG4gICAgaWYgKGxhc3RTaG90LmhpdCA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIGNyZWF0ZSBuZXcgZ3Vlc3MgZm9yIGNvbXB1dGVyXG4gICAgICBjb25zdCBndWVzcyA9IGNvbXB1dGVyR3Vlc3MoKTtcbiAgICAgIC8vIHNhdmUgaW50byBhIGZ1bmN0aW9uIHRvIGxhdGVyIGNvbXBhcmVcbiAgICAgIGNvbnN0IGF0dGVtcHQgPSBib2FyZC5yZWNpZXZlSGl0KGd1ZXNzKTtcbiAgICAgIGlmICghYXR0ZW1wdCkge1xuICAgICAgICAvLyBpZiBzaG90IGhhcyBhbHJlYWR5IGJlZW4gdGFrZW4sIHJlY3Vyc2l2ZWx5IGd1ZXNzIGFnYWluXG4gICAgICAgIGxhc3RTaG90LmxvY2F0aW9uID0gZ3Vlc3M7XG4gICAgICAgIGxhc3RTaG90LmhpdCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gY29tcHV0ZXJBdHRhY2soYm9hcmQpO1xuICAgICAgICAvLyBpZiBtaXNzZWQgdXBkYXRlIGxhc3RTaG90IGNvcnJlY3RseVxuICAgICAgfVxuICAgICAgaWYgKGF0dGVtcHQgPT09ICdtaXNzJykge1xuICAgICAgICBsYXN0U2hvdC5sb2NhdGlvbiA9IGd1ZXNzO1xuICAgICAgICBsYXN0U2hvdC5oaXQgPSBmYWxzZTtcbiAgICAgICAgLy8gaWYgaGl0IHVwZGF0ZSBsYXN0U2hvdCBjb3JyZWN0bHlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxhc3RTaG90LmxvY2F0aW9uID0gZ3Vlc3M7XG4gICAgICAgIGxhc3RTaG90LmhpdCA9IHRydWU7XG4gICAgICB9XG4gICAgICAvLyBtYWtlIHN1cmUgbmV4dCBnbyB3b24ndCBvdmVyZmxvdyB0aGUgYm9hcmRcbiAgICB9IGVsc2UgaWYgKGxhc3RTaG90LmxvY2F0aW9uWzFdIDwgNikge1xuICAgICAgLy8gaW5jcmVhc2UgbnVtYmVyIGNvb3JkIGJ5IDFcbiAgICAgIGxldCBpbmNyZWFzZSA9IHBhcnNlSW50KGxhc3RTaG90LmxvY2F0aW9uWzFdLCAxMCk7XG4gICAgICBjb25zdCBsZXR0ZXIgPSBsYXN0U2hvdC5sb2NhdGlvblswXTtcbiAgICAgIGluY3JlYXNlICs9IDE7XG4gICAgICAvLyBzYXZlIGJhY2sgaW50byBsb2NhdGlvblxuICAgICAgbGFzdFNob3QubG9jYXRpb24gPSBgJHtsZXR0ZXJ9JHtpbmNyZWFzZX1gO1xuICAgICAgLy8gc2F2ZSBjYWxsIHRvIGZ1bmN0aW9uIGluIGEgdmFyaWFibGUgdG8gbGF0ZXIgY29tcGFyZVxuICAgICAgY29uc3QgYXR0ZW1wdCA9IGJvYXJkLnJlY2lldmVIaXQobGFzdFNob3QubG9jYXRpb24pO1xuICAgICAgLy8gaWYgc2hvdCBhbHJlYWR5IHRha2VuXG4gICAgICBpZiAoIWF0dGVtcHQpIHtcbiAgICAgICAgbGFzdFNob3QuaGl0ID0gZmFsc2U7XG4gICAgICAgIC8vIG5ldyBzaG90LCBidXQgcmFuZG9tXG4gICAgICAgIGNvbXB1dGVyQXR0YWNrKGJvYXJkKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0ZW1wdCA9PT0gJ21pc3MnKSB7XG4gICAgICAgIC8vIGlmIG1pc3NlZCBzaG90LCB1cGRhdGUgbGFzdHNob3QgdG8gZmFsc2VcbiAgICAgICAgbGFzdFNob3QuaGl0ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpZiBoaXQgdXBkYXRlIGxhc3Qgc2hvdCB0byBoaXQgYW5kIGxvY2F0aW9uIGFscmVhZHkgY2hhbmdlZFxuICAgICAgICBsYXN0U2hvdC5oaXQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBsYXN0IHNob3Qgd2FzIHRoZSBsYXN0IHNxdWFyZSBvZiBhIHJvdywgbWFrZSByYW5kb20gc2hvdFxuICAgICAgbGFzdFNob3QuaGl0ID0gZmFsc2U7XG4gICAgICBjb21wdXRlckF0dGFjayhib2FyZCk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSB1c2VyIGlucHV0XG4gIC8vIGFzIHdpdGggYWJvdmUgY2hlY2tzIGl0cyB2YWxpZFxuICBjb25zdCBwbGF5ZXJBdHRhY2sgPSAobG9jYXRpb24sIGJvYXJkKSA9PiAhIWJvYXJkLnJlY2lldmVIaXQobG9jYXRpb24pO1xuXG4gIHJldHVybiB7IGNvbXB1dGVyR3Vlc3MsIGNvbXB1dGVyQXR0YWNrLCBwbGF5ZXJBdHRhY2sgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IGdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgbmV3U2hpcCBmcm9tICcuL3NoaXAnO1xuXG4vLyBpbml0aWFsaXNlIHR3byBwbGF5ZXJzXG5leHBvcnQgY29uc3QgcGxheWVyT25lID0gUGxheWVyKCk7XG5leHBvcnQgY29uc3QgY29tcHV0ZXIgPSBQbGF5ZXIoKTtcblxuLy8gY3JlYXRlIHR3byBib2FyZHNcbmV4cG9ydCBjb25zdCBwbGF5ZXJCb2FyZCA9IGdhbWVib2FyZCgpO1xuZXhwb3J0IGNvbnN0IGNvbXBCb2FyZCA9IGdhbWVib2FyZCgpO1xuXG4vLyBnZXQgdGhlIGJvYXJkcyBvZiBlYWNoIHBsYXllclxuZXhwb3J0IGNvbnN0IGNvbXBET00gPSBjb21wQm9hcmQucHJpbnRCb2FyZCgpO1xuZXhwb3J0IGNvbnN0IHBsYXlET00gPSBwbGF5ZXJCb2FyZC5wcmludEJvYXJkKCk7XG5cbi8vIHJhbmRvbSBsZXR0ZXIgYW5kIG51bWJlciBnZW5lcmF0b3JzXG5jb25zdCBsZXR0ZXJzID0gWydhJywgJ2InLCAnYycsICdkJywgJ2UnLCAnZicsICdnJ107XG5jb25zdCByYW5kb21MZXR0ZXIgPSAoKSA9PiBgJHtsZXR0ZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDcpXX1gO1xuY29uc3QgcmFuZG9tTnVtYmVyID0gKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNyk7XG5cbi8vIHNoaXBzIGZvciBnYW1lIGFuZCB0aGVpciBsZW5ndGhzXG5jb25zdCBsZW5ndGhPZlNoaXBzID0gWzUsIDQsIDMsIDMsIDJdO1xuXG4vLyBmaWxsIHBsYXllcnMgYm9hcmQsIHVzaW5nIHJlY3Vyc2lvbiBpZiBmaXJzdCBzcG90IG5vdCBhdmFpbGFibGVcbmNvbnN0IHBsYWNlUFNoaXBzID0gKHNoaXApID0+IHtcbiAgaWYgKCFwbGF5ZXJCb2FyZC5wbGFjZVNoaXBzKHJhbmRvbUxldHRlcigpLCByYW5kb21OdW1iZXIoKSwgc2hpcCkpIHtcbiAgICBwbGFjZVBTaGlwcyhzaGlwKTtcbiAgfVxufTtcbi8vIGZpbGwgY29tcHV0ZXJzIGJvYXJkLCB1c2luZyByZWN1cnNpb24gaWYgZmlyc3Qgc3BvdCBub3QgYXZhaWxhYmxlXG5jb25zdCBwbGFjZUNTaGlwcyA9IChzaGlwKSA9PiB7XG4gIGlmICghY29tcEJvYXJkLnBsYWNlU2hpcHMocmFuZG9tTGV0dGVyKGxldHRlcnMsIDcpLCBwYXJzZUludChyYW5kb21OdW1iZXIoKSwgMTApLCBzaGlwKSkge1xuICAgIHBsYWNlQ1NoaXBzKHNoaXApO1xuICB9XG59O1xuXG4vLyByYW5kb21seSBwbGFjZSBlYWNoIHNoaXAgb24gZWFjaCBib2FyZFxubGVuZ3RoT2ZTaGlwcy5mb3JFYWNoKChudW1iZXIpID0+IHtcbiAgcGxhY2VQU2hpcHMobmV3U2hpcChudW1iZXIpKTtcbiAgcGxhY2VDU2hpcHMobmV3U2hpcChudW1iZXIpKTtcbn0pO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcmV0dXJuLWFzc2lnbiAqL1xuY29uc3QgbmV3U2hpcCA9IChsZW5ndGgpID0+IHtcbiAgbGV0IGNvdW50ID0gMDtcblxuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGg7XG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICBjb3VudCArPSAxO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuICBjb25zdCBoaXRDb3VudCA9ICgpID0+IGNvdW50O1xuICBjb25zdCBhbGl2ZSA9ICgpID0+IGNvdW50IDwgbGVuZ3RoO1xuXG4gIHJldHVybiB7XG4gICAgZ2V0TGVuZ3RoLCBoaXQsIGhpdENvdW50LCBhbGl2ZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5ld1NoaXA7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLWRlc3RydWN0dXJpbmcgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1lbXB0eS1wYXR0ZXJuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuLyogZXNsaW50LWRpc2FibGUgZ3VhcmQtZm9yLWluICovXG5pbXBvcnQgeyBjb21wQm9hcmQgfSBmcm9tICcuL3NldHVwJztcblxuZXhwb3J0IGNvbnN0IGZpbGxTaWRlID0gKCkgPT4ge1xuICBjb25zdCBob2xkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hpcEhvbGRlcicpO1xuICBjb25zdCB0b3BPZkhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0b3BPZkhvbGRlci5jbGFzc05hbWUgKz0gJ3RvcCc7XG4gIHRvcE9mSG9sZGVyLnRleHRDb250ZW50ID0gJ0VuZW15IHNoaXBzJztcbiAgaG9sZGVyLmFwcGVuZCh0b3BPZkhvbGRlcik7XG4gIGNvbnN0IHNoaXBzID0gY29tcEJvYXJkLnNoaXBMaXN0KCk7XG5cbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBsZW5ndGggPSBzaGlwLmdldExlbmd0aCgpO1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5jbGFzc05hbWUgKz0gJ3NoaXAnO1xuICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ3NoaXAnLCBpbmRleCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBib3guY2xhc3NOYW1lID0gJ3BhcnQnO1xuICAgICAgZGl2LmFwcGVuZChib3gpO1xuICAgIH1cbiAgICBob2xkZXIuYXBwZW5kKGRpdik7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZVNpZGUgPSAoKSA9PiB7XG4gIGNvbnN0IHNoaXBzID0gY29tcEJvYXJkLnNoaXBMaXN0KCk7XG4gIHNoaXBzLmZvckVhY2goKHNoaXAsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgaGl0cyA9IHNoaXAuaGl0Q291bnQoKSAtIDE7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW3NoaXA9XCIke2luZGV4fVwiXWApLmNoaWxkcmVuXTtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaSkgPT4geyBpZiAoaSA8PSBoaXRzKSB7IGNoaWxkLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnOyB9IH0pO1xuICB9KTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuLyogZXNsaW50LWRpc2FibGUgZ3VhcmQtZm9yLWluICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuLy8gbG9vcCB0aHJvdWdoIHRoZSBib2FyZCBhbmQgdXBkYXRlIHRoZSBjb2xvdXJzIGFjY29yaW5kaW5nIHRvIGRhdGFcbi8vIHVzaW5nICdXSE89XCI/XCInIHRvIHNlbGVjdCBjb3JyZWN0bHlcblxuaW1wb3J0IHsgY29tcERPTSB9IGZyb20gJy4vc2V0dXAnO1xuXG5jb25zdCB1cGRhdGVDb21wdXRlckJvYXJkRE9NID0gKCkgPT4ge1xuICBmb3IgKGNvbnN0IGl0ZW0gaW4gY29tcERPTSkge1xuICAgIGlmIChjb21wRE9NW2l0ZW1dLmhpc3RvcnkgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbdGFyZ2V0PVwiJHtjb21wRE9NW2l0ZW1dLmxvY2F0aW9ufVwiXVt3aG89XCJDXCJdYCk7XG4gICAgICBhLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdncmVlbic7XG4gICAgfVxuICAgIGlmIChjb21wRE9NW2l0ZW1dLmhpdCA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFt0YXJnZXQ9XCIke2NvbXBET01baXRlbV0ubG9jYXRpb259XCJdW3dobz1cIkNcIl1gKTtcbiAgICAgIGEuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCc7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1cGRhdGVDb21wdXRlckJvYXJkRE9NO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cbi8qIGVzbGludC1kaXNhYmxlIGd1YXJkLWZvci1pbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbi8vIGxvb3AgdGhyb3VnaCB0aGUgYm9hcmQgYW5kIHVwZGF0ZSB0aGUgY29sb3VycyBhY2NvcmluZGluZyB0byBkYXRhXG4vLyB1c2luZyAnV0hPPVwiP1wiJyB0byBzZWxlY3QgY29ycmVjdGx5XG4vLyBsb29wIHRocm91Z2ggdGhlIGJvYXJkIGFuZCB1cGRhdGUgdGhlIGNvbG91cnMgYWNjb3JpbmRpbmcgdG8gZGF0YVxuXG5pbXBvcnQgeyBwbGF5RE9NIH0gZnJvbSAnLi9zZXR1cCc7XG5cbmNvbnN0IHVwZGF0ZVBsYXllckJvYXJkRE9NID0gKCkgPT4ge1xuICBmb3IgKGNvbnN0IGl0ZW0gaW4gcGxheURPTSkge1xuICAgIGlmIChwbGF5RE9NW2l0ZW1dLnNoaXApIHtcbiAgICAgIGNvbnN0IGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbdGFyZ2V0PVwiJHtpdGVtfVwiXVt3aG89XCJQXCJdYCk7XG4gICAgICBhLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdibGFjayc7XG4gICAgfVxuICAgIGlmIChwbGF5RE9NW2l0ZW1dLmhpc3RvcnkgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbdGFyZ2V0PVwiJHtwbGF5RE9NW2l0ZW1dLmxvY2F0aW9ufVwiXVt3aG89XCJQXCJdYCk7XG4gICAgICBhLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdncmVlbic7XG4gICAgfVxuICAgIGlmIChwbGF5RE9NW2l0ZW1dLmhpdCA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFt0YXJnZXQ9XCIke3BsYXlET01baXRlbV0ubG9jYXRpb259XCJdW3dobz1cIlBcIl1gKTtcbiAgICAgIGEuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCc7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1cGRhdGVQbGF5ZXJCb2FyZERPTTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9TW9udHNlcnJhdDp3Z2h0QDQwMDs2MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKntcXG4gIG1hcmdpbjogMHB4O1xcbiAgcGFkZGluZzogMHB4O1xcbiAgZm9udC1mYW1pbHk6ICdNb250c2VycmF0Jywgc2Fucy1zZXJpZjtcXG59XFxuYm9keXtcXG4gd2lkdGg6IDEwMHZ3O1xcbiBkaXNwbGF5OiBmbGV4O1xcbiBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4uYmFubmVye1xcbiAgaGVpZ2h0OiAxMDBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwbGFjZS1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uY29udGFpbmVye1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxuICB3aWR0aDogOTAlO1xcbiAgZ2FwOiA1MHB4O1xcbn1cXG5cXG4uZm9vdGVye1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IDEwMHB4O1xcbn1cXG5cXG4uYm9hcmRPbmUsXFxuLmJvYXJkVHdvIHtcXG4gIGFzcGVjdC1yYXRpbzogMS8xO1xcbiAgd2lkdGg6IDYwJTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg3LCAxZnIpO1xcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLmJvYXJkT25lOjphZnRlcntcXG4gIGNvbnRlbnQ6ICdZb3VyIHNoaXBzJztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTotMTdweDtcXG4gIGxlZnQ6IDElO1xcbn1cXG4uYm9hcmRUd286OmFmdGVye1xcbiAgY29udGVudDogJ0F0dGFjayBoZXJlJztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTotMTdweDtcXG4gIGxlZnQ6IDElO1xcbn1cXG4uYm94e1xcbiAgYXNwZWN0LXJhdGlvOiAxLzE7XFxuICB3aWR0aDogODUlO1xcbiAgYm9yZGVyOiBzb2xpZCBibGFjayAxcHg7XFxufVxcblxcbi5zdGFydCxcXG4uZW5ke1xcbiAgaGVpZ2h0OiA1MCU7XFxuICB3aWR0aDogY2FsYygxMDB2aCAvIDMpO1xcbiAgYm9yZGVyLXJhZGl1czogLjVyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG59XFxuXFxuLnNoaXBIb2xkZXJ7XFxuICBoZWlnaHQ6IGNhbGMoICgxMDB2dyAvIDEwMCAqIDMwKSAtIDRweCApO1xcbiAgd2lkdGg6IDMwJTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDQwJSByZXBlYXQoNSwgMWZyKTtcXG59XFxuXFxuLnRvcHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcbiAgcGFkZGluZy1ib3R0b206IDMwJTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuLnNoaXB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcXG4gIG1hcmdpbjogMHB4IDEwcHg7XFxufVxcblxcbi5wYXJ0e1xcbiAgd2lkdGg6MTAwJTtcXG4gIGFzcGVjdC1yYXRpbzogMS8xO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxufVxcblxcbi5zaGlwOmxhc3QtY2hpbGR7XFxuICBtYXJnaW4tYm90dG9tOiAyNSU7XFxufVxcblxcbi5vbmV7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDUlO1xcbiAgbGVmdDogNSU7XFxuICB3aWR0aDogMjAlO1xcbn1cXG5cXG4udHdve1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiA1JTtcXG4gIHJpZ2h0OiA1JTtcXG4gIHdpZHRoOiAyMCU7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2MDBweCl7XFxuICAuY29udGFpbmVye1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBtYXJnaW46IDMwcHggNTBweDtcXG4gIH1cXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1oscUNBQXFDO0FBQ3ZDO0FBQ0E7Q0FDQyxZQUFZO0NBQ1osYUFBYTtDQUNiLHNCQUFzQjtBQUN2Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixhQUFhO0VBQ2IsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLDZCQUE2QjtFQUM3QixVQUFVO0VBQ1YsU0FBUztBQUNYOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixhQUFhO0FBQ2Y7O0FBRUE7O0VBRUUsaUJBQWlCO0VBQ2pCLFVBQVU7RUFDVixhQUFhO0VBQ2IscUNBQXFDO0VBQ3JDLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLFFBQVE7QUFDVjtBQUNBO0VBQ0Usc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osUUFBUTtBQUNWO0FBQ0E7RUFDRSxpQkFBaUI7RUFDakIsVUFBVTtFQUNWLHVCQUF1QjtBQUN6Qjs7QUFFQTs7RUFFRSxXQUFXO0VBQ1gsc0JBQXNCO0VBQ3RCLG9CQUFvQjtFQUNwQix1QkFBdUI7RUFDdkIsdUJBQXVCO0VBQ3ZCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLHdDQUF3QztFQUN4QyxVQUFVO0VBQ1YsYUFBYTtFQUNiLHNDQUFzQztBQUN4Qzs7QUFFQTtFQUNFLFdBQVc7RUFDWCxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLHFCQUFxQjtFQUNyQixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLFlBQVk7QUFDZDtBQUNBO0VBQ0UsYUFBYTtFQUNiLHFDQUFxQztFQUNyQyxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsaUJBQWlCO0VBQ2pCLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixPQUFPO0VBQ1AsUUFBUTtFQUNSLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsU0FBUztFQUNULFVBQVU7RUFDVix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRTtJQUNFLG1CQUFtQjtJQUNuQixpQkFBaUI7RUFDbkI7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Nb250c2VycmF0OndnaHRANDAwOzYwMCZkaXNwbGF5PXN3YXAnKTtcXG5cXG4qe1xcbiAgbWFyZ2luOiAwcHg7XFxuICBwYWRkaW5nOiAwcHg7XFxuICBmb250LWZhbWlseTogJ01vbnRzZXJyYXQnLCBzYW5zLXNlcmlmO1xcbn1cXG5ib2R5e1xcbiB3aWR0aDogMTAwdnc7XFxuIGRpc3BsYXk6IGZsZXg7XFxuIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi5iYW5uZXJ7XFxuICBoZWlnaHQ6IDEwMHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5jb250YWluZXJ7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gIHdpZHRoOiA5MCU7XFxuICBnYXA6IDUwcHg7XFxufVxcblxcbi5mb290ZXJ7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG4gIGhlaWdodDogMTAwcHg7XFxufVxcblxcbi5ib2FyZE9uZSxcXG4uYm9hcmRUd28ge1xcbiAgYXNwZWN0LXJhdGlvOiAxLzE7XFxuICB3aWR0aDogNjAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDcsIDFmcik7XFxuICBwbGFjZS1pdGVtczogY2VudGVyO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4uYm9hcmRPbmU6OmFmdGVye1xcbiAgY29udGVudDogJ1lvdXIgc2hpcHMnO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOi0xN3B4O1xcbiAgbGVmdDogMSU7XFxufVxcbi5ib2FyZFR3bzo6YWZ0ZXJ7XFxuICBjb250ZW50OiAnQXR0YWNrIGhlcmUnO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOi0xN3B4O1xcbiAgbGVmdDogMSU7XFxufVxcbi5ib3h7XFxuICBhc3BlY3QtcmF0aW86IDEvMTtcXG4gIHdpZHRoOiA4NSU7XFxuICBib3JkZXI6IHNvbGlkIGJsYWNrIDFweDtcXG59XFxuXFxuLnN0YXJ0LFxcbi5lbmR7XFxuICBoZWlnaHQ6IDUwJTtcXG4gIHdpZHRoOiBjYWxjKDEwMHZoIC8gMyk7XFxuICBib3JkZXItcmFkaXVzOiAuNXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBmb250LXdlaWdodDogNjAwO1xcbn1cXG5cXG4uc2hpcEhvbGRlcntcXG4gIGhlaWdodDogY2FsYyggKDEwMHZ3IC8gMTAwICogMzApIC0gNHB4ICk7XFxuICB3aWR0aDogMzAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogNDAlIHJlcGVhdCg1LCAxZnIpO1xcbn1cXG5cXG4udG9we1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XFxuICBwYWRkaW5nLWJvdHRvbTogMzAlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG4uc2hpcHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCAxZnIpO1xcbiAgbWFyZ2luOiAwcHggMTBweDtcXG59XFxuXFxuLnBhcnR7XFxuICB3aWR0aDoxMDAlO1xcbiAgYXNwZWN0LXJhdGlvOiAxLzE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG59XFxuXFxuLnNoaXA6bGFzdC1jaGlsZHtcXG4gIG1hcmdpbi1ib3R0b206IDI1JTtcXG59XFxuXFxuLm9uZXtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNSU7XFxuICBsZWZ0OiA1JTtcXG4gIHdpZHRoOiAyMCU7XFxufVxcblxcbi50d297XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3R0b206IDUlO1xcbiAgcmlnaHQ6IDUlO1xcbiAgd2lkdGg6IDIwJTtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDYwMHB4KXtcXG4gIC5jb250YWluZXJ7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIG1hcmdpbjogMzBweCA1MHB4O1xcbiAgfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsidXBkYXRlU2lkZSIsInVwZGF0ZUNvbXB1dGVyQm9hcmRET00iLCJ1cGRhdGVQbGF5ZXJCb2FyZERPTSIsImxvZ28iLCJjcmVhdGVET00iLCJjcmVhdGUiLCJib2R5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYmFubmVyIiwiY3JlYXRlRWxlbWVudCIsImZvb3RlciIsImNvbnRhaW5lciIsInNoaXBzIiwiY2xhc3NOYW1lIiwiYnV0dG9uIiwidGV4dENvbnRlbnQiLCJhcHBlbmQiLCJib2FyZE9uZSIsImJvYXJkVHdvIiwiaW1nIiwic3JjIiwiaW1nVHdvIiwibGV0dGVycyIsImxldHRlciIsIm51bWJlciIsInN0YXJ0IiwiZW5kIiwiYm94MSIsImJveDIiLCJzZXRBdHRyaWJ1dGUiLCJjb3VudGVyIiwibG9hZERPTSIsImFnYWluIiwic3R5bGUiLCJkaXNwbGF5IiwiYWRkRXZlbnRMaXN0ZW5lciIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZ2FtZWJvYXJkIiwiYm9hcmQiLCJzaGlwTGlzdCIsInNoaXAiLCJoaXN0b3J5IiwiaGl0IiwiY2hlY2tOdWxsIiwibCIsIm4iLCJsZW5ndGgiLCJpIiwicGxhY2VTaGlwcyIsImdldExlbmd0aCIsInB1c2giLCJwcmludEJvYXJkIiwicmVjaWV2ZUhpdCIsImxvY2FsIiwiY2hlY2tBbGl2ZSIsImFsaXZlIiwiZmlsdGVyIiwibWFpbiIsImZpbGxTaWRlIiwibWFpbkdhbWUiLCJwbGF5ZXJPbmUiLCJjb21wdXRlciIsInBsYXllckJvYXJkIiwiY29tcEJvYXJkIiwiZ2FtZU92ZXIiLCJ0dXJuIiwiY2hhbmdlVHVybiIsInBsYXlHYW1lIiwiY2hvaWNlIiwicGxheWVyQXR0YWNrIiwiY29tcHV0ZXJBdHRhY2siLCJib3hlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiYm94IiwiYmFja2dyb3VuZENvbG9yIiwibWlzcyIsImF2YWlsYWJsZSIsImF0dHJpYnV0ZXMiLCJ0YXJnZXQiLCJ2YWx1ZSIsIlBsYXllciIsImxhc3RTaG90IiwicmFuZG9tIiwiZmlyc3ROdW1iZXIiLCJNYXRoIiwiZmxvb3IiLCJzZWNvbmROdW1iZXIiLCJjb21wdXRlckd1ZXNzIiwiZ3Vlc3MiLCJhdHRlbXB0IiwiaW5jcmVhc2UiLCJwYXJzZUludCIsIm5ld1NoaXAiLCJjb21wRE9NIiwicGxheURPTSIsInJhbmRvbUxldHRlciIsInJhbmRvbU51bWJlciIsImxlbmd0aE9mU2hpcHMiLCJwbGFjZVBTaGlwcyIsInBsYWNlQ1NoaXBzIiwiY291bnQiLCJoaXRDb3VudCIsImhvbGRlciIsInRvcE9mSG9sZGVyIiwiaW5kZXgiLCJkaXYiLCJoaXRzIiwiY2hpbGRyZW4iLCJjaGlsZCIsIml0ZW0iLCJhIl0sInNvdXJjZVJvb3QiOiIifQ==