class Geolocation extends IconButtonToggle{
  constructor(){
    super('my_location','location_disabled','mdc-button--raised mdc-image__circular');
    this.unbounded = true;
    this.listen('MDCIconButtonToggle:change', (event) => {
      if(event.detail.isOn) openWelcome();
      else clear();
    });
  }

  setToggle(bool){
    this.on = bool;
  }
}
