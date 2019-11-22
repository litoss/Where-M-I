class Geolocation extends IconButtonToggle{
  constructor(){
    super('my_location','location_disabled');
    this.unbounded = true;
    this.listen('MDCIconButtonToggle:change', (event) => {
      if(event.detail.isOn) this.watch();
      else this.clear();
    });
  }

  watch(){
    this.geolocator = navigator.geolocation.watchPosition(showPosition);
  }

  clear(){
    navigator.geolocation.clearWatch(this.geolocator);
    this.geolocator = null;
    positionMarker.removePosition();
  }


}
