export default class Keyboard {
    constructor({ container, keys, lang }) {
        this._keyboardContainer = document.querySelector(container);
        this._keys = keys;
        this._lang = lang;
        this._caps = true;
        this._value = '';
        this._shift = true;
        this._textarea = document.querySelector('.show-output');
    }

    _renderer() {
        this._keys.forEach((rowElements) => {
            this._row = this._createKeysRow();
            rowElements.forEach((item) => {
                this._item = item;
                this._key = this._switchLangInit(item);
                this._caps = item.caps ? item.caps : 'no-caps';
                this._shift = item.shift ? 'shift' : 'no-shift';
                this._Element = this._createElementKey(this._key, item.code, this._caps, this._shift);
                const keyElement = this._Element;
                this._keyEventListener(item, keyElement);
                this._row.append(keyElement);
            })
            this._keyboardContainer.append(this._row);
        })
    }

    _keyEventListener(item, keyElement) {
        switch (item.code) {
            case 'CapsLock':
                this._capsEvetnListener();
                break;

            case 'Backspace':
                keyElement.addEventListener("click", () => {
                    this._value = this._value.substring(0, this._value.length - 1)
                });
                document.addEventListener('keydown', (evt) => {
                    if (evt.code === item.code) {
                        keyElement.classList.add('keyboard__key_active');
                        this._value = this._value.substring(0, this._value.length - 1);
                        this._textarea.textContent = this._value
                    }
                })
                document.addEventListener('keyup', (evt) => {
                    if (evt.code === item.code) {
                        keyElement.classList.remove('keyboard__key_active');
                    }
                })
                break;

            case 'Tab':
                keyElement.addEventListener('click', () => this._value += '    ')
                break;

            case 'Enter':
                keyElement.addEventListener('click', () => this._value += '\n')
                break;

            case 'ShiftLeft':
            case 'ShiftRight':
                keyElement.addEventListener('mousedown', () => {
                    this._chengeShiftElements();
                    this._shift = !this._shift;
                });
                keyElement.addEventListener('mouseup', () => {
                    this._chengeShiftElements();
                    this._shift = !this._shift;
                })
                let allowed = true;
                document.addEventListener('keydown', (evt) => {
                    if (evt.repeat !== 'undefined') {
                        allowed = !evt.repeat;
                    }
                    if (!allowed) return;
                    if (evt.code === item.code) {
                        keyElement.classList.add('keyboard__key_active');
                        this._chengeShiftElements();
                        this._shift = !this._shift;
                    }
                })
                document.addEventListener('keyup', (evt) => {
                    if (evt.code === item.code) {
                        keyElement.classList.remove('keyboard__key_active');
                        this._chengeShiftElements();
                        this._shift = !this._shift;
                        allowed = true;
                    }
                })
                break;

            case 'ControlLeft':
            case 'MetaLeft':
            case 'AltLeft':
            case 'AltRight':
            case 'ControlRight':
                document.addEventListener('keydown', (evt) => {
                    evt.preventDefault();
                    if (evt.code === item.code) {
                        keyElement.classList.add('keyboard__key_active');
                    }
                })
                document.addEventListener('keyup', (evt) => {
                    if (evt.code === item.code) {
                        keyElement.classList.remove('keyboard__key_active');
                    }
                })
                break;

            default:
                keyElement.addEventListener("click", () => {
                    this._value += keyElement.textContent;
                });
                this._toggleActiveClass(item.code, keyElement)
                break;
        }
    }

    _toggleActiveClass(code, keyElement) {
        document.addEventListener('keydown', (evt) => {
            if (evt.code === code) {
                keyElement.classList.add('keyboard__key_active');
                this._value += keyElement.textContent;
                // document.addEventListener('keydown', () => this._textarea.textContent = this._value);
                this._textarea.textContent = this._value;
            }
        })
        document.addEventListener('keyup', (evt) => {
            if (evt.code === code) {
                keyElement.classList.remove('keyboard__key_active');
            }
        })
    }

    _capsEvetnListener() {
        const capsKey = this._Element;
        capsKey.classList.add('keyboard__key_activatable');
        capsKey.addEventListener('click', () => {
            capsKey.classList.toggle('keyboard__key_activatable_active');
            this._toggleCaps();
        })
        let allowed = true;
        document.addEventListener('keydown', (evt) => {
            if (evt.repeat !== 'undefined') {
                allowed = !evt.repeat;
            }
            if (!allowed) return;
            if (evt.code === 'CapsLock') {
                capsKey.classList.toggle('keyboard__key_activatable_active');
                capsKey.classList.toggle('keyboard__key_active');
                this._toggleCaps();
            }
        })
        document.addEventListener('keyup', (evt) => {
            if (evt.code === 'CapsLock') allowed = true;
        })
    }

    _toggleCaps() {
        const capsElements = [...document.querySelectorAll('.caps')];
        capsElements.forEach((el) => {
            el.textContent = this._caps ? el.textContent.toUpperCase() : el.textContent.toLowerCase();
        })
        this._caps = !this._caps;
    }

    _switchLangInit(item) {
        if (this._lang) return item.key;
        else {
            if (!item.keyRu) return item.key;
            return item.keyRu;
        }
    }

    _createKeysRow() {
        this._keysRow = document.createElement('div');
        this._keysRow.classList.add('keyboard__row');
        return this._keysRow;
    }

    _createElementKey(key, code, caps, shift) {
        this._keyElement = document.createElement('button');
        this._keyElement.classList.add('keyboard__key', code, caps, shift);
        this._keyElement.textContent = key;
        const Element = this._keyElement;
        Element.addEventListener('mousedown', () => Element.classList.add('keyboard__key_active'));
        Element.addEventListener('mouseup', () => Element.classList.remove('keyboard__key_active'));
        return Element;
    }

    _chengeShiftElements() {
        const shiftElements = [...document.querySelectorAll('.keyboard__key')];
        shiftElements.forEach((el) => {
            if (el.textContent === '`' || el.textContent === '~') {
                el.textContent = this._shift ? '~' : '`';
            }
            if (el.textContent === '1' || el.textContent === '!') {
                el.textContent = this._shift ? '!' : '1';
            }
            if (el.textContent === '2' || el.textContent === '@') {
                el.textContent = this._shift ? '@' : '2';
            }
            if (el.textContent === '3' || el.textContent === '#') {
                el.textContent = this._shift ? '#' : '3';
            }
            if (el.textContent === '4' || el.textContent === '$') {
                el.textContent = this._shift ? '$' : '4';
            }
            if (el.textContent === '5' || el.textContent === '%') {
                el.textContent = this._shift ? '%' : '5';
            }
            if (el.textContent === '6' || el.textContent === '^') {
                el.textContent = this._shift ? '^' : '6';
            }
            if (el.textContent === '7' || el.textContent === '&') {
                el.textContent = this._shift ? '&' : '7';
            }
            if (el.textContent === '8' || el.textContent === '*') {
                el.textContent = this._shift ? '*' : '8';
            }
            if (el.textContent === '9' || el.textContent === '(') {
                el.textContent = this._shift ? '(' : '9';
            }
            if (el.textContent === '0' || el.textContent === ')') {
                el.textContent = this._shift ? ')' : '0';
            }
            if (el.textContent === '-' || el.textContent === '_') {
                el.textContent = this._shift ? '_' : '-';
            }
            if (el.textContent === '=' || el.textContent === '+') {
                el.textContent = this._shift ? '+' : '=';
            }
            if (el.textContent === '[' || el.textContent === '{') {
                el.textContent = this._shift ? '{' : '[';
            }
            if (el.textContent === ']' || el.textContent === '}') {
                el.textContent = this._shift ? '}' : ']';
            }
            if (el.textContent === '\\' || el.textContent === '|') {
                el.textContent = this._shift ? '|' : '\\';
            }
            if (el.textContent === ';' || el.textContent === ':') {
                el.textContent = this._shift ? ':' : ';';
            }
            if (el.textContent === "'" || el.textContent === '"') {
                el.textContent = this._shift ? '"' : "'";
            }
            if (el.textContent === ',' || el.textContent === '<') {
                if (this._lang) { // English
                    el.textContent = this._shift ? '<' : ',';
                }
                if (this._lang === false) { // rus
                    el.textContent = '.'
                }

            }
            if (el.textContent === '.' || el.textContent === '>') {
                if (this._lang) { // English
                    el.textContent = this._shift ? '>' : '.';
                }
                if (this._lang === false) { // rus
                    el.textContent = this._shift ? ',' : '.';
                }
            }
            if (el.textContent === '/' || el.textContent === '?') {
                el.textContent = this._shift ? '?' : '/';
            }
        })
        const capsElements = [...document.querySelectorAll('.caps')];
        capsElements.forEach((el) => {
            el.textContent = this._shift ? el.textContent.toUpperCase() : el.textContent.toLowerCase();
        })
        this._toggleCaps();
    }

    //Изменение языка на клавиатуре
    _toggleLang(...codes) {
        let pressed = new Set();

        document.addEventListener('keydown', (evt) => {
            pressed.add(evt.code);
            for (let code of codes) { // все ли клавиши из набора нажаты?
                if (!pressed.has(code)) {
                    return;
                }
            }
            pressed.clear();
            const Elements = [...document.querySelectorAll('.keyboard__key')];
            Elements.forEach((el, i) => {
                const keys = this._keys.flat();
                if (!this._lang) {
                    el.textContent = keys[i].key;
                    this._toggleCaps()
                } else {
                    el.textContent = keys[i].keyRu ? keys[i].keyRu : keys[i].key;
                    this._toggleCaps()
                }
            })
            this._lang = !this._lang
        });
        document.addEventListener('keyup', (evt) => {
            pressed.delete(evt.code);
        });
    }

    setEventListener() {
        window.addEventListener("DOMContentLoaded", () => {
            this._renderer();
            this._toggleLang('ControlLeft', 'AltLeft');
            this._toggleLang('ControlLeft', 'ControlRight');
        });
        document.addEventListener('click', () => this._textarea.textContent = this._value)

    }
}