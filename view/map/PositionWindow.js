class YourPosition extends google.maps.InfoWindow{
  constructor(){
    super({
      content: new CardTemp(yourPlace.title, yourPlace.description),
      maxWidth: 400,
    });
  }
}
