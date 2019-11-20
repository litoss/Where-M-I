var drawer_content = new mdc.drawer.MDCDrawer(document.getElementById('content_drawer'));

document.getElementById('content_menu').addEventListener("click", openMenuDrawer);

document.getElementById('content_clear').addEventListener("click", () => {
 drawer_content_element.open = false;
})
