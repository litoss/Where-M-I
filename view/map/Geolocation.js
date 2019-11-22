class Geolocation extends IconButton{
  constructor(){
    super('my_location');
    this.unbounded = true;
    this.listen('click', () => {
      var geolocator = navigator.geolocation.watchPosition(this.showPosition);
    });
  }

  showPosition(position){
    if(!marker){
      marker = new PositionMarker(position);
      map.setZoom(parseInt(Math.log2(591657550.5 / (position.coords.accuracy * 45))) + 1);
      map.setCenter(marker.getPosition());
    }else{
      marker.setPosition({lat: position.coords.latitude, lng: position.coords.longitude});
      marker.setMap(map);
    }
  }

  clearPosition(){
    navigator.geolocation.clearWatch(geolocator);
    marker.setMap(null);
  }
}
