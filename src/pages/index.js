import Section from '../components/Section.js';
import Keyboard from '../components/Keyboard.js';
import { keyboardConstants } from '../utils/constants.js';

function getLocalStorage() {
  return JSON.parse(window.localStorage.getItem('lang'));
}
keyboardConstants.lang = getLocalStorage();
const container = new Section();
container.renderToDom();

const keyboard = new Keyboard(keyboardConstants);
keyboard.setEventListener();

window.addEventListener('load', getLocalStorage);