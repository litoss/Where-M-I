var geolocator;

async function localize(){
  var options = {enableHighAccuracy: true,timeout: 5000,maximumAge: 0};
  geolocator = navigator.geolocation.watchPosition(watch, error, options);
  //welcomeDialog.close();
}

async function watch(position){
  if(!map.position.getPosition){
    map.setCenter(latLng);
    //welcomeDialog.close();
  }

  if(position.coords.accuracy){
    var latLng = new google.maps.LatLng({lat: position.coords.latitude, lng: position.coords.longitude});
    map.position.setPosition(latLng);
    await map.position.setAccuracy(position.coords.accuracy);
    welcomeDialog.close();
  }else error();
}

function clear(){
  geolocator = navigator.geolocation.clearWatch(geolocator);
  map.position.remove();
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
