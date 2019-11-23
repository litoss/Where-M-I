//funzione che adatta il contenuto alla dimensione della finestra
/*window.addEventListener("resize", function() {
  if (window.innerWidth > 767){
    document.getElementById('scrim').className = "";
    if(!pageDrawer.open) mainDrawer.open = true;
  } else {
    document.getElementById('scrim').className = "mdc-drawer-scrim";
    mainDrawer.open = false;
  }
});*/

function showPosition(position){
  if(position.coords.accuracy < 100){
    positionMarker.setPosition({lat: position.coords.latitude, lng: position.coords.longitude});
    positionMarker.setAccuracy(position.coords.accuracy);

  }else{
    map.geolocatorButton.clear();
    map.geolocatorButton.on = false;
    //Popup di errore
  }
}
