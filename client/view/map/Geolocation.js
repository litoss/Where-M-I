class Geolocation extends IconButtonToggle{
  constructor(){
    super('my_location','location_disabled','mdc-button--raised');

    this.unbounded = true;
    this.listen('MDCIconButtonToggle:change', (event) => {
      if(event.detail.isOn) this.geolocator = navigator.geolocation.watchPosition(this.watch, this.error, {enableHighAccuracy: true,timeout: 5000,maximumAge: 0});
      else this.clear();
    });
  }

  watch(position){
    console.log("bau");
    if(position.coords.accuracy > 100){
      positionMarker.setPosition({lat: position.coords.latitude, lng: position.coords.longitude});
      positionMarker.setAccuracy(position.coords.accuracy);

    }else{
      clear();
      this.on = false;
      //Popup di errore
    }
  }

  clear(){
    navigator.geolocation.clearWatch(this.geolocator);
    this.geolocator = null;
    positionMarker.removePosition();
  }

  error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }

}
