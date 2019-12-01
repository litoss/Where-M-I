class UnknownPlaceWindow extends google.maps.InfoWindow{
  constructor(){

    var addButton = new ActionButton("find");
    var discardButton = new ActionButton("discard");
    addButton.addEventListener('click', function(){
      selectPlace();
    });

    discardButton.addEventListener('click', function(){
      pageDrawer.open = false;
      placeMarker.setMap(null);
    });

    var card = new CardTemp(luogoSconosciuto.title, null, luogoSconosciuto.description, luogoSconosciuto.media, [addButton, discardButton], null);
    card.className += " about-card";

    super({
      content: card,
      maxWidth: 400,
    });
  }
}
