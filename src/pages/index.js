import Section from '../components/Section.js';
import Keyboard from '../components/Keyboard.js';

const container = new Section();
container.renderToDom();

const keyboard = new Keyboard('.keyboard');

keyboard.renderer();

document.addEventListener('keydown', (e) => {
    console.log(e)
})