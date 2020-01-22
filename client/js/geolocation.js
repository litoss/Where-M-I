var geolocator;

async function localize(){
  var options = {enableHighAccuracy: true,timeout: 5000,maximumAge: 0};
  geolocator = navigator.geolocation.watchPosition(watch, error, options);
  //welcomeDialog.close();
}

async function watch(pos){
  var latLng = new google.maps.LatLng({lat: pos.coords.latitude, lng: pos.coords.longitude});
  if(!position){
    position = new Position(latLng, false);
    map.setCenter(latLng);
  }else if(pos.coords.accuracy){
    position.setPosition(latLng);
    position.setAccuracy(pos.coords.accuracy);
    welcomeDialog.close();
  }else error();
}

function clear(){
  geolocator = navigator.geolocation.clearWatch(geolocator);
  if(position){
    position.remove();
    position = null;
  }
}

function error(err) {
  if(geolocator != null) clear();
  //rimuove marker se cambio metodo di localizzazione
  if(draggableMarker){
    draggableMarker.marker.setMap(null);
    draggableMarker = null;
  }
  var snackbar = new SnackBar('Geolocation error, please try again or use another method');
  snackbar.open();

  menuDrawer.open = false;
  openGeocode();
}
