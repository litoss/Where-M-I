var geolocator;

function localize(){
  var options = {enableHighAccuracy: true,timeout: 5000,maximumAge: 0};
  geolocator = navigator.geolocation.watchPosition(watch, error, options);
}

function watch(position){
  if(position.coords.accuracy){
    var latLng = {lat: position.coords.latitude, lng: position.coords.longitude};
    map.position.setPosition(latLng);
    map.position.setAccuracy(position.coords.accuracy);
    map.setCenter(latLng);
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

// Recording audio
// https://developers.google.com/web/fundamentals/media/recording-audio

var mediaRecorder;
var recordedChunks = [];

function stopRecord(){
  mediaRecorder.stop();
}

function startRecord(){
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
  }).then(function(stream){

    mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'});
    mediaRecorder.addEventListener('dataavailable', function(e) {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }
    });

    mediaRecorder.start();
  });
}

function clearRecord(){
  recordedChunks = [];
}

async function getRecord(){
  return new Promise((resolve,reject) => {
    const reader = new FileReader();

    reader.onload = function(e) {
      resolve(e.target.result);
    };

    reader.readAsDataURL(new Blob(recordedChunks, {type : 'audio/webm'}));
  });
}
