class Marker extends google.maps.Marker{
  constructor(position){
    super({
      position: {lat: position.coords.latitude, lng: position.coords.longitude},
      map: map,
      icon: {
        url: 'content/geomarker.svg',
        scaledSize: new google.maps.Size(32, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 16)
    }});

    this.bindTo("position", new google.maps.Circle({
      center: {lat: position.coords.latitude, lng: position.coords.longitude},
      radius: position.coords.accuracy,
      map: map,
      clickable: false,
      fillColor: '#4285f4',
      fillOpacity: 0.125,
      strokeColor: '#4285f4',
      strokeOpacity: 0.25
    }), "center");
  }
}
