class Geolocation{
  constructor(){
    this.button = new IconButtonToggle('my_location','location_disabled','mdc-button--raised');
    this.button.unbounded = true;
    this.button.listen('MDCIconButtonToggle:change', (event) => {
      if(event.detail.isOn)
        this.geolocator = navigator.geolocation.watchPosition((position) => {
          this.watch(position);
        }, (err) => {
          this.error(err);
        }, {
          enableHighAccuracy: true,timeout: 5000,maximumAge: 0}
        );

      else this.clear();
    });

    return this.button.root_;
  }

  watch(position){
    if(position.coords.accuracy > 100){
      map.position.setPosition({lat: position.coords.latitude, lng: position.coords.longitude});
      map.position.setAccuracy(position.coords.accuracy);
    }else error();
  }

  clear(){
    navigator.geolocation.clearWatch(this.geolocator);
    this.geolocator = null;
    this.removePosition();
  }

  error(err) {
    this.clear();
    this.geolocation.setToggle(false);
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }

  setToggle(bool){
    this.button.on = bool;
  }
}
