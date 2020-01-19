var geolocator;

async function localize(){
  var options = {enableHighAccuracy: true,timeout: 5000,maximumAge: 0};
  geolocator = navigator.geolocation.watchPosition(watch, error, options);
  //welcomeDialog.close();
}

async function watch(position){
  var latLng = new google.maps.LatLng({lat: position.coords.latitude, lng: position.coords.longitude});
  if(!map.position){
    map.position = new Position(latLng, false);
    map.setCenter(latLng);
  }else if(position.coords.accuracy){
    map.position.setPosition(latLng);
    map.position.setAccuracy(position.coords.accuracy);
    welcomeDialog.close();
  }else error();
}

function clear(){
  geolocator = navigator.geolocation.clearWatch(geolocator);
  if(map.position){
    map.position.remove();
    map.position = null;
  }
}

function error(err) {
  if(geolocator != null) clear();
  //rimuove marker se cambio metodo di localizzazione
  if(map.draggableMarker){
    map.draggableMarker.marker.setMap(null);
    map.draggableMarker = null;
  }
  var snackbar = new SnackBar('Geolocation error, please try again or use another method');
  snackbar.open();

  map.menuDrawer.open = false;
  openWelcome();
}
