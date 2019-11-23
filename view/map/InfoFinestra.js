class InfoFinestra extends google.maps.InfoWindow{
  constructor(){

    var positionCard = new CardTemp(luogoSconosciuto.title, null, luogoSconosciuto.description, luogoSconosciuto.media, null, luogoSconosciuto.contacts);

    super({
      content: positionCard,
      maxWidth: 400,
    });
  }
}
