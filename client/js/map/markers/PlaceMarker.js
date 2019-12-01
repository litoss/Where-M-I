class PlaceMarker extends google.maps.Marker{
  constructor(marker, latLng, map){
    super({
      position: latLng,
      map: map,
      icon: {
        url: marker,
        scaledSize: new google.maps.Size(24, 24),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(12, 12)
    }});
  }
}
