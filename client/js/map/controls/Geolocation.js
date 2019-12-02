class Geolocation{
  constructor(){
    this.button = new IconButtonToggle('my_location','location_disabled','mdc-button--raised');
    this.button.unbounded = true;
    this.button.listen('MDCIconButtonToggle:change', (event) => {
      if(event.detail.isOn)
        this.geolocator = navigator.geolocation.watchPosition(watch, error, {enableHighAccuracy: true,timeout: 5000,maximumAge: 0});
      else
        this.clear();
    });

    return this.button.root_;
  }

  setToggle(bool){
    this.button.on = bool;
  }
}
