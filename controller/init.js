//init
if (window.innerWidth > 767){
  document.getElementById('scrim').className = "";
  mainDrawer.open = true;
}

var positionMarker = new PositionMarker();
var placeMarker = new PlaceMarker();
var map = new Mappa();
