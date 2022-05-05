export default class Keyboard {
    constructor(container) {
        this._keyboardContainer = document.querySelector(container);
        this._keys = [
            [
                { key: '`', code: 'Backquote' }, { key: '1', code: 'Digit1' }, { key: '2', code: 'Digit2' }, { key: '3', code: 'Digit3' },
                { key: '4', code: 'Digit4' }, { key: '5', code: 'Digit5' }, { key: '6', code: 'Digit6' }, { key: '7', code: 'Digit7' },
                { key: '8', code: 'Digit8' }, { key: '9', code: 'Digit9' }, { key: '0', code: 'Digit0' }, { key: '-', code: 'Minus' },
                { key: '=', code: 'Equal' }, { key: 'Backspace', code: 'Backspace' }
            ],
            [
                { key: 'Tab', code: 'Tab' }, { key: 'q', code: 'KeyQ' }, { key: 'w', code: 'KeyW' }, { key: 'e', code: 'KeyE' },
                { key: 'r', code: 'KeyR' }, { key: 't', code: 'KeyT' }, { key: 'y', code: 'KeyY' }, { key: 'u', code: 'KeyU' },
                { key: 'i', code: 'KeyI' }, { key: 'o', code: 'KeyO' }, { key: 'p', code: 'KeyP' }, { key: '[', code: 'BracketLeft' },
                { key: ']', code: 'BracketRight' }, { key: '\\', code: 'Backslash' }, { key: 'Del', code: 'Delete' }
            ],
            [
                { key: 'CapsLock', code: 'CapsLock' }, { key: 'a', code: 'KeyA' }, { key: 's', code: 'KeyS' }, { key: 'd', code: 'KeyD' },
                { key: 'f', code: 'KeyF' }, { key: 'g', code: 'KeyG' }, { key: 'h', code: 'KeyH' }, { key: 'j', code: 'KeyJ' },
                { key: 'k', code: 'KeyK' }, { key: 'l', code: 'KeyL' }, { key: ';', code: 'Semicolon' }, { key: "'", code: 'Quote' },
                { key: 'Enter', code: 'Enter' }
            ],
            [
                { key: 'Shift', code: 'ShiftLeft' }, { key: 'z', code: 'KeyZ' }, { key: 'x', code: 'KeyX' }, { key: 'c', code: 'KeyC' },
                { key: 'v', code: 'KeyV' }, { key: 'b', code: 'KeyB' }, { key: 'n', code: 'KeyN' }, { key: 'm', code: 'KeyM' },
                { key: ',', code: 'Comma' }, { key: '.', code: 'Period' }, { key: '/', code: 'Slash' }, { key: '▲', code: 'ArrowUp' },
                { key: 'Shift', code: 'ShiftRight' }
            ],
            [
                { key: 'Ctrl', code: 'ControlLeft' }, { key: 'Win', code: 'MetaLeft' }, { key: 'Alt', code: 'AltLeft' }, { key: ' ', code: 'Space' },
                { key: 'Alt', code: 'AltRight' }, { key: '◄', code: 'ArrowLeft' }, { key: '▼', code: 'ArrowDown' },
                { key: '►', code: 'ArrowRight' }, { key: 'Ctrl', code: 'ControlRight' }
            ]
        ];
        this._lang = 'en';
    }

    renderer() {
        this._keys.forEach((rowElements) => {
            this._row = this._createKeysRow();
            rowElements.forEach((item) => {
                this._Element = this._createElementKey(item.key, item.code);
                this._row.append(this._Element);
            })
            this._keyboardContainer.append(this._row);
        })
    }

    _createKeysRow() {
        this._keysRow = document.createElement('div');
        this._keysRow.classList.add('keyboard__row');
        return this._keysRow;
    }

    _createElementKey(key, code) {
        this._keyElement = document.createElement('button');
        this._keyElement.classList.add('keyboard__key', code);
        this._keyElement.textContent = key;
        return this._keyElement;
    }
}