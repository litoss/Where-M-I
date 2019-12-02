function watch(position){
  if(position.coords.accuracy > 100){
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
  console.warn('ERROR(' + err.code + '): ' + err.message);
}
