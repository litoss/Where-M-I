class UnknownPlaceWindow extends google.maps.InfoWindow{
  constructor(){

    var addButton = new ActionButton("find");
    var discardButton = new ActionButton("discard");
    var positionCard = new CardTemp(luogoSconosciuto.title, null, luogoSconosciuto.description, luogoSconosciuto.media, [addButton, discardButton], null);
    positionCard.className += " about-card";

    addButton.addEventListener('click', function(){
      selectPlace();
    });

    discardButton.addEventListener('click', function(){
      pageDrawer.open = false;
      placeMarker.setMap(null);
    });

    super({
      content: positionCard,
      maxWidth: 400,
    });
  }
}
