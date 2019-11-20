const pageDrawer = new mdc.drawer.MDCDrawer(document.getElementById('content_drawer'));

/*
var elem = document.querySelectorAll('.mdc-list-item');

elem.forEach( function (element) {
    element.addEventListener( 'click', () =>{
    mainDrawer.open = false;
    pageDrawer.open = true;
  })
})
*/
document.getElementById('content_menu').addEventListener("click", () => {
  mainDrawer.open = true;
  pageDrawer.open = false;
})

document.getElementById('content_clear').addEventListener("click", () => {
  pageDrawer.open = false;
})
