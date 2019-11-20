var map;
var marker;
var circle;
var geolocator;

function initMap() {
  language = navigator.language;

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.9, lng: 12.6},
    zoom: 6,
    disableDefaultUI: true,
    styles:[
      {
        "featureType": "poi",
        "stylers": [
          { "visibility": "off" }
        ]
      }
    ]
  });

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(less.root_);
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(more.root_);
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(geolocation.root_);
  //map.controls[google.maps.ControlPosition.TOP_RIGHT].push(login);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(menu.root_);
  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(search);
  //map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(card);
}
