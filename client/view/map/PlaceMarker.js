class PlaceMarker extends google.maps.Marker{
  constructor(latLng){
    super({
      position: latLng,
      icon: {
        url: 'content/nearby.svg',
        scaledSize: new google.maps.Size(24, 24),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(12, 12)
    }});
  }
}
