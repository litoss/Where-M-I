
function drivingDirections(origin, destination){

  var check = function(){
    var distance = getDistance(origin, destination);
    console.log(distance)
    route(origin, destination);
    if(distance < 0.0002){
      clearInterval(cancel);
      map.directionsRenderer.setMap(null);
      alert("Sei arrivato a destinazione");
    }
  }

  var cancel = setInterval(check, 1000);
}

function route(origin, destination){
  map.directionsService.route({
    origin: origin.getPosition(),
    destination: destination.getPosition(),
    travelMode: 'WALKING'
  }, function(response, status) {
    // Route the directions and pass the response to a function to create
    // markers for each step.
    if (status === 'OK') {
      map.directionsRenderer.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }

});
}
