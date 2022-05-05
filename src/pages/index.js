import Section from '../components/Section.js';
import Keyboard from '../components/Keyboard.js';
import { keyboardConstants } from '../utils/constants.js';

const container = new Section();
container.renderToDom();

const keyboard = new Keyboard(keyboardConstants);

keyboard.setEventListener();

document.addEventListener('keydown', (e) => {
    console.log(e)
})