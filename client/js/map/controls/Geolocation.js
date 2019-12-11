class Geolocation{
  constructor(){
    this.button = new IconButtonToggle('my_location','location_disabled','mdc-button--raised mdc-image__circular');
    this.button.unbounded = true;
    this.button.listen('MDCIconButtonToggle:change', (event) => {
      if(event.detail.isOn) localize();
      else clear();
    });

    return this.button.root_;
  }

  setToggle(bool){
    this.button.on = bool;
  }
}
