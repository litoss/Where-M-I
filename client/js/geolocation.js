var geolocator;

function localize(){
  var options = {enableHighAccuracy: true,timeout: 5000,maximumAge: 0};
  geolocator = navigator.geolocation.watchPosition(watch, error, options);
}

function watch(position){
  if(!map.position.getPosition){
    map.setCenter(latLng);
  }

  if(position.coords.accuracy){
    var latLng = {lat: position.coords.latitude, lng: position.coords.longitude};
    map.position.setPosition(latLng);
    map.position.setAccuracy(position.coords.accuracy);
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
  alert('Geolocation error, please try again or use another method');
  openWelcome();
}
