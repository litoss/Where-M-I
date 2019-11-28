class Mappa extends google.maps.Map{
  constructor() {

    super(document.getElementById('map'), {
      center: {
        lat: 44.494201,
        lng: 11.346477
      },
      zoom: 15,
      disableDefaultUI: true,
      styles: [{
        "featureType": "poi",
        "stylers": [{
          "visibility": "off"
        }]
      }]
    });

    this.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomLessButton.root_);
    this.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomPlusButton.root_);
    this.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(geolocatorButton.root_);
    this.controls[google.maps.ControlPosition.TOP_LEFT].push(menuButton.root_);
    //this.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.login);
    this.infoWindow = new UnknownPlaceWindow();
    this.addListener('click', function(e) {
      if(placeMarker.getMap()){
        placeMarker.setMap(null);
        pageDrawer.open = false;
      }
      else{
        placeMarker.setPosition(e.latLng);
        placeMarker.setMap(map);
        this.infoWindow.open(map, placeMarker);
      }
    });
  }
}
