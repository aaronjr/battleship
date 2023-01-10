import './style.css';
import { main, create } from './mainLoop';
import { fillSide } from './shipHolder';
// import Icon from './icon.png';

const mainGame = main();
const button = document.querySelector('.start');
button.addEventListener('click', () => {
  create.loadDOM();
  mainGame.start();
  button.style.display = 'none';
  fillSide();
});
