const mainDrawer = mdc.drawer.MDCDrawer.attachTo(document.getElementById('menu_drawer'));
const mainContentEl = document.querySelector('.main-content');

const listEl = document.querySelector('.mdc-list-item');
listEl.addEventListener('click', (event) => {
  mainDrawer.open = false;
});

document.body.addEventListener('MDCDrawer:closed', () => {
  mainContentEl.querySelector('button').focus();
});
