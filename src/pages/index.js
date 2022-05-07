import Section from '../components/Section.js';
import Keyboard from '../components/Keyboard.js';
import { keyboardConstants } from '../utils/constants.js';

const container = new Section();
container.renderToDom();

const keyboard = new Keyboard(keyboardConstants);

keyboard.setEventListener();

function getCaretPos(obj) {
    obj.focus();
    if (obj.selectionStart) return obj.selectionStart;
    else if (document.selection) {
        var sel = document.selection.createRange();
        var clone = sel.duplicate();
        sel.collapse(true);
        clone.moveToElementText(obj);
        clone.setEndPoint('EndToEnd', sel);
        return clone.text.length;
    }
    return 0;
}

// const input = document.querySelector('.show-output');