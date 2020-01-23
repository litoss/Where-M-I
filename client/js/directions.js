// Google Maps Directions API
// https://developers.google.com/maps/documentation/directions/start

var service;
var renderer;
var interval = false;

function directions_init(map){
  service = new google.maps.DirectionsService;
  renderer = new google.maps.DirectionsRenderer({map: map, preserveViewport: true, suppressMarkers: true});
  interval = false;
}

function drivingDirections(origin, destination){

  if(interval){
    stopNavigation();
  }

  route(origin, destination);

  player.navigation.root_.disabled = false;
  interval = setInterval(function(){
    var distance = getDistance(origin.getPosition(), destination.getPosition());

    if(distance < 0.0002){
      stopNavigation();
      var snackbar = new SnackBar('You have arrived at your destination');
      snackbar.open();
    }else{
      route(origin, destination);
    }
  }, 3000);

}

function route(origin, destination){
  service.route({
    origin: origin.getPosition(),
    destination: destination.getPosition(),
    travelMode: 'WALKING'
  }, function(response, status) {

    if (status === 'OK') {
      player.setTitle('you are walking to : ' + destination.title);
      player.setImg(destination.icon.url);
      renderer.setDirections(response);
      renderer.setMap(map);
    } else {
      renderer.setMap(null);
      var snackbar = new SnackBar('Directions request failed due to ' + status);
      clearInterval(interval);
    }
  });
}

function stopNavigation(){
  player.navigation.root_.disabled = true;
  if(player.forward.root_.disabled == false) player.setTitle('Press &rarr; to navigate to next place');
  else player.setTitle('Press Here to select navigation mode');
  player.setImg("favicon.ico");
  clearInterval(interval);
  interval = false;
  renderer.setMap(null);
}

function isNavigating(){
  return interval ? true : false;
}
