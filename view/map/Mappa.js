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

    this.zoomLessButton = new ZoomLess();
    this.zoomPlusButton = new ZoomPlus();
    this.geolocatorButton = new Geolocation();
    this.menuButton = new Menu();

    this.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(this.zoomLessButton.root_);
    this.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(this.zoomPlusButton.root_);
    this.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(this.geolocatorButton.root_);
    this.controls[google.maps.ControlPosition.TOP_LEFT].push(this.menuButton.root_);
    this.controls[google.maps.ControlPosition.TOP_RIGHT].push(login.root_);

    this.addListener('click', function(e) {
      if(placeMarker.getMap()) placeMarker.setMap(null);
      else{
        placeMarker.setMap(map);
        placeMarker.setPosition(e.latLng);
        var info = new InfoFinestra();
        info.open(map, placeMarker);
      }
    });
  }
}
