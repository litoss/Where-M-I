class Mappa extends google.maps.Map{
  constructor() {

    super(document.getElementById('map'), {
      center: {
        lat: 41.9,
        lng: 12.6
      },
      zoom: 6,
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

    this.addListener('click', function(e) {
      if(placeMarker.getMap()){
        placeMarker.setMap(null);
        pageDrawer.open = false;
      }
      else{
        placeMarker.setPosition(e.latLng);
        placeMarker.setMap(map);
        var info = new InfoFinestra();
        info.open(map, placeMarker);
      }
    });
  }
}
