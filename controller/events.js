//funzione che adatta il contenuto alla dimensione della finestra
window.addEventListener("resize", function() {
  if (window.innerWidth > 767){
    document.getElementById('scrim').className = "";
    if(!pageDrawer.open) mainDrawer.open = true;
  } else {
    document.getElementById('scrim').className = "mdc-drawer-scrim";
    mainDrawer.open = false;
  }
});
