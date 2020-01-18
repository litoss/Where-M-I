// Google Maps Directions API
// https://developers.google.com/maps/documentation/directions/start

var interval;

function drivingDirections(origin, destination){

  var check = function(){
    var distance = getDistance(origin, destination);

    route(origin, destination);
    if(distance < 0.0002){
      clearInterval(interval);
      map.directionsRenderer.setMap(null);
      var snackbar = new SnackBar('You have arrived at your destination');
      snackbar.open();
    }
  }

  interval = setInterval(check, 1000);
}

function route(origin, destination){
  map.directionsService.route({
    origin: origin.getPosition(),
    destination: destination.getPosition(),
    travelMode: 'WALKING'
  }, function(response, status) {

    if (status === 'OK') {
      map.directionsRenderer.setDirections(response);
      map.directionsRenderer.setMap(map);
    } else {
      map.directionsRenderer.setMap(null);
      var snackbar = new SnackBar('Directions request failed due to ' + status);
      clearInterval(interval);
    }
  });
}
