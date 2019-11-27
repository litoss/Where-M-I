const pageDrawer = new mdc.drawer.MDCDrawer(document.getElementById('content_drawer'));

document.getElementById('content_menu').addEventListener("click", () => {
  mainDrawer.open = true;
  pageDrawer.open = false;
})

document.getElementById('content_clear').addEventListener("click", () => {
  pageDrawer.open = false;
})
