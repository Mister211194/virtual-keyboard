export default class Keyboard {
    constructor({ container, keys }) {
        this._keyboardContainer = document.querySelector(container);
        this._keys = keys;
        this._lang = 'ru';
        this._caps = true;
    }

    _renderer() {
        this._keys.forEach((rowElements) => {
            this._row = this._createKeysRow();
            rowElements.forEach((item) => {
                this._key = this._switchLang(item);
                this._Element = this._createElementKey(this._key, item.code);
                this._row.append(this._Element);
            })
            this._keyboardContainer.append(this._row);
        })
    }

    _switchLang(item) {
        if (this._lang === 'en') return item.key;
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

    _createElementKey(key, code) {
        this._keyElement = document.createElement('button');
        this._keyElement.classList.add('keyboard__key', code);
        this._keyElement.textContent = key;
        const Element = this._keyElement;
        return Element;
    }

    setEventListener() {
        window.addEventListener("DOMContentLoaded", this._renderer());
    }
}