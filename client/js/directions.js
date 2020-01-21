// Google Maps Directions API
// https://developers.google.com/maps/documentation/directions/start

var interval = false;

function drivingDirections(origin, destination){

  if(interval){
    stopNavigation();
  }

  route(origin, destination);

  map.player.navigation.root_.disabled = false;
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
  map.directionsService.route({
    origin: origin.getPosition(),
    destination: destination.getPosition(),
    travelMode: 'WALKING'
  }, function(response, status) {

    if (status === 'OK') {
      map.player.setTitle('you are walking to : ' + destination.title);
      map.player.setImg(destination.icon.url);
      map.directionsRenderer.setDirections(response);
      map.directionsRenderer.setMap(map);
    } else {
      map.directionsRenderer.setMap(null);
      var snackbar = new SnackBar('Directions request failed due to ' + status);
      clearInterval(interval);
    }
  });
}

function stopNavigation(){
  map.player.navigation.root_.disabled = true;
  map.player.setTitle('Press play to start navigation');
  map.player.setImg("content/favicon.ico");
  clearInterval(interval);
  interval = false;
  map.directionsRenderer.setMap(null);
}

function isNavigating(){
  return interval ? true : false;
}
