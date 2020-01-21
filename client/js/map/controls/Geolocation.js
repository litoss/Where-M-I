class Geolocation extends IconButton{
  constructor(){
    super('my_location','mdc-button--raised mdc-image__circular');
    this.unbounded = true;
    this.listen('click', () => {
      //toglie la geolocalizzazione
      if(geolocator != null) clear();
      //rimuove marker se cambio metodo di localizzazione
      if(map.position){
        map.position.remove();
        map.position = null;
      }
      openWelcome();
    });
  }
}
