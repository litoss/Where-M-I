//init
/*if (window.innerWidth > 767){
  document.getElementById('scrim').className = "";
  mainDrawer.open = true;
}*/

var profile;
var zoomLessButton = new ZoomLess();
var zoomPlusButton = new ZoomPlus();
var geolocatorButton = new Geolocation();
var menuButton = new Menu();
var positionMarker = new PositionMarker();
var placeMarker;
var map = new Mappa();

/*var xhr = new XMLHttpRequest();
xhr.open('POST', 'https://texttospeech.googleapis.com/v1/voices?key=AIzaSyDIMZTc-elycsk2nn3gM-q3_FU5188fsDU');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function(){
  console.log(xhr.responseText);
}
xhr.send();*/
