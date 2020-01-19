// Google Maps Directions API
// https://developers.google.com/maps/documentation/directions/start

var interval = false;

function drivingDirections(origin, destination){

  if(!interval){
    route(origin, destination);
    console.log(map.player)
<<<<<<< HEAD
    map.player.navigation.root_.style.display = 'block';
=======
    map.player.navigation.root_.style.display = 'inline';
>>>>>>> 79ace0dfc80b2b07d7f9c885e37b67885321f926
    interval = setInterval(function(){
      var distance = getDistance(origin, destination);

      if(distance < 0.0002){
        stopNavigation();
        var snackbar = new SnackBar('You have arrived at your destination');
        snackbar.open();
      }else{
        route(origin, destination);
      }
    }, 3000);
  }
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

function stopNavigation(){
  clearInterval(interval);
  interval = false;
  map.directionsRenderer.setMap(null);
  map.player.navigation.root_.style.display = 'none';
}
