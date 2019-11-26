class UnknownPlaceWindow extends google.maps.InfoWindow{
  constructor(){
    super({
      content: new CardTemp(luogoSconosciuto.title, null, luogoSconosciuto.description, luogoSconosciuto.media),
      maxWidth: 400,
    });
  }
}
