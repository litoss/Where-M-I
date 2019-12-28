var geolocator;

function localize(){
  geolocator = navigator.geolocation.watchPosition(watch, error, {enableHighAccuracy: true,timeout: 5000,maximumAge: 0});
}

function watch(position){
  if(position.coords.accuracy < 100){
    map.position.setPosition({lat: position.coords.latitude, lng: position.coords.longitude});
    map.position.setAccuracy(position.coords.accuracy);
    map.setPosition({lat: position.coords.latitude, lng: position.coords.longitude});
  }else error();
}

function clear(){
  navigator.geolocation.clearWatch(geolocator);
  map.position.remove();
}

function error(err) {
  clear();
  map.geolocation.setToggle(false);
  alert('La tua geolocalizzazione è troppo scadente');
}

var audioChunks;

function recordAudio(){
  navigator.mediaDevice.getUserMedia({
    audio: true
  }).then(function(stream){
    const mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", (event) => {
      audioChunks.push(event.data);
    });

    mediaRecorder.start();
  });
}
