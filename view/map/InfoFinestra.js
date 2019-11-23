class InfoFinestra extends google.maps.InfoWindow{
  constructor(){

    var positionCard = new CardTemp(luogoSconosciuto.title, null, luogoSconosciuto.description, luogoSconosciuto.media, null, luogoSconosciuto.contacts);

    console.log(positionCard);
    super({
      content: positionCard,
      maxWidth: 400
    });
  }
}
