/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
import './style.css';
import { main, create } from './mainLoop';
// import Icon from './icon.png';

main();

const button = document.querySelector('.start');
button.addEventListener('click', () => {
  create.loadDOM();
  button.style.display = 'none';
});
