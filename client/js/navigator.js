var geolocator;

function localize(){
  geolocator = navigator.geolocation.watchPosition(watch, error, {enableHighAccuracy: true,timeout: 5000,maximumAge: 0});
}

function watch(position){
  if(position.coords.accuracy < 100){
    map.position.setPosition({lat: position.coords.latitude, lng: position.coords.longitude});
    map.position.setAccuracy(position.coords.accuracy);
  }else error();
}

function clear(){
  navigator.geolocation.clearWatch(geolocator);
  geolocator = null;
  map.position.removePosition();
}

function error(err) {
  clear();
  this.geolocation.setToggle(false);
  alert('La tua geolocalizzazione è troppo scadente');
}
