import Section from '../components/section.js';

const container = new Section().renderToDom();
console.log(container)

document.addEventListener('keydown', (e) => {
    console.log(e.code)
})