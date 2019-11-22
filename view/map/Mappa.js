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

    this.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(new ZoomLess().root_);
    this.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(new ZoomPlus().root_);
    this.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(new Geolocation().root_);
    this.controls[google.maps.ControlPosition.TOP_LEFT].push(new Menu().root_);
    this.controls[google.maps.ControlPosition.TOP_RIGHT].push(login.root_);

    this.addListener('dblclick', function(e) {
      marker.setMap(null);
      marker = new MarkerNoArea(e.latLng);
    });
  }
}
