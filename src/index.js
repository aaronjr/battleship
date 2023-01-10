import './style.css';
import { main, create } from './mainLoop';
import { fillSide } from './shipHolder';


const mainGame = main();
const button = document.querySelector('.start');
button.addEventListener('click', () => {
  create.loadDOM();
  mainGame.start();
  button.style.display = 'none';
  fillSide();
});