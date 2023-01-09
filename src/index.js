import './style.css';
import { main, create } from './mainLoop';
// import Icon from './icon.png';

const mainGame = main();
const button = document.querySelector('.start');
button.addEventListener('click', () => {
  create.loadDOM();
  mainGame.start();
  button.style.display = 'none';
});
