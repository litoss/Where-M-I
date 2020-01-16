async function selectedPath(path){

  var content = document.createElement('div');
  content.id = 'content';

  for(var i in path.route){
    searchPlace(path.route[i]);
  }

  var navigationButton = new FloatingActionButton('navigation', 'drawer-fab');

  content.appendChild(navigationButton.root_);

  navigationButton.listen('click', () => {
    showRoute(path.route);
  })


  map.pageDrawer  = new PageDrawer(path.namer, content);
  map.pageDrawer.open = true;
}

function searchPlace(olc){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/find_place');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = async function(){
    var response = JSON.parse(xhr.response);
    var image = await decode64(response[0].image, "image/jpg");
    if(response[0].description.length > 100) descr = response[0].description.substring(0,100)+"...";
    else descr = response[0].description;
    var card = new Card (response[0].name, null, descr, image, null,null,'about-card');
    document.querySelector("#content").appendChild(card.root_);
  }
  xhr.send(JSON.stringify({OLC: olc}));

}

function showRoute(path){
    var origin = decodeOlc(path[0]);
    var destination = decodeOlc(path[path.length - 1]);
    var waypoints = [];
    for(var i=1; i<path.length -1; i++){
      var point = {location: decodeOlc(path[i])};
      waypoints.push(point);
    }
    map.directionsService.route({
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: 'WALKING'
      }, function(response, status) {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        if (status == 'OK') {
          map.directionsRenderer.setDirections(response);
          map.pageDrawer.open = false;
          var closeDirection = new IconButton('explore_off','mdc-button--raised mdc-image__circular');
          map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(closeDirection.root_);
          closeDirection.listen('click', () => {
          map.directionsRenderer.setMap(null);
          map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].pop();
          })
        } else {
          var snackbar = new SnackBar('Directions request failed due to ' + status);
          snackbar.open();
          snackbar.listen("MDCSnackbar:closed",() => {
            document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
          });
        }
      });

}

function decodeOlc(olc){
  var decode = OpenLocationCode.decode(olc);
  latLng = {lat: decode.latitudeCenter, lng: decode.longitudeCenter};
  return latLng
}
