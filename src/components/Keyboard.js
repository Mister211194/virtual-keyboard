export default class Keyboard {
    constructor({ container, keys, lang }) {
        this._keyboardContainer = document.querySelector(container);
        this._keys = keys;
        this._lang = !lang;
        this._caps = true;
    }

    _renderer() {
        this._keys.forEach((rowElements) => {
            this._row = this._createKeysRow();
            rowElements.forEach((item) => {
                this._key = this._switchLang(item);
                this._caps = item.caps ? item.caps : ';'
                this._Element = this._createElementKey(this._key, item.code, this._caps);
                switch (item.code) {
                    case 'CapsLock':
                        this._capsEvetnListener();
                        break;
                }
                this._row.append(this._Element);
            })
            this._keyboardContainer.append(this._row);
        })
    }

    _capsEvetnListener() {
        const capsKey = this._Element;
        capsKey.classList.add('keyboard__key_activatable');
        capsKey.addEventListener('click', () => {
            capsKey.classList.toggle('keyboard__key_activatable_active');
            this._toggleCaps();
        })
        document.addEventListener('keydown', (evt) => {
            if (evt.code === 'CapsLock') {
                capsKey.classList.toggle('keyboard__key_activatable_active');
                capsKey.classList.toggle('keyboard__key_active');
                this._toggleCaps();
            }
        })
    }

    _toggleCaps() {
        const capsElements = [...document.querySelectorAll('.caps')];
        capsElements.forEach((el) => {
            el.textContent = this._caps ? el.textContent.toUpperCase() : el.textContent.toLowerCase();
        })
        this._caps = !this._caps;
    }

    _switchLang(item) {
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

    _createElementKey(key, code, caps) {
        this._keyElement = document.createElement('button');
        this._keyElement.classList.add('keyboard__key', code, caps);
        this._keyElement.textContent = key;
        const Element = this._keyElement;
        Element.addEventListener('mousedown', () => Element.classList.add('keyboard__key_active'));
        Element.addEventListener('mouseup', () => Element.classList.remove('keyboard__key_active'));
        return Element;
    }

    setEventListener() {
        window.addEventListener("DOMContentLoaded", this._renderer());
    }
}