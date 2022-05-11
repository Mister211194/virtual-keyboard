import './index.css';
import Section from '../components/Section';
import Keyboard from '../components/Keyboard';
import { keyboardConstants } from '../utils/constants';

function getLocalStorage() {
  return JSON.parse(window.localStorage.getItem('lang'));
}
keyboardConstants.lang = getLocalStorage();
const container = new Section();
container.renderToDom();

const keyboard = new Keyboard(keyboardConstants);
keyboard.setEventListener();

window.addEventListener('load', getLocalStorage);
