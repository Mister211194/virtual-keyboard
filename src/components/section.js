export default class Section {
  constructor() {

  }

  _createContainer() {
    this._container = document.createElement('main');
    this._container.classList.add('container');
    this._container.append(this._createTitle(), this._createTextarea(), this._createKeyboardContainer());
    return this._container;
  }

  _createTitle() {
    this._title = document.createElement('h1');
    this._title.classList.add('title');
    this._title.textContent = 'Virtual keyboard';
    return this._title;
  }

  _createTextarea() {
    this._textarea = document.createElement('textarea');
    this._textarea.classList.add('show-output');
    return this._textarea;
  }

  _createKeyboardContainer() {
    this._keyboard = document.createElement('div');
    this._keyboard.classList.add('keyboard');
    return this._keyboard;
  }

  renderToDom() {
    this._body = document.querySelector('body');
    this._body.prepend(this._createContainer())
  }
}