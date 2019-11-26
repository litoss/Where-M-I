class InfoFinestra extends google.maps.InfoWindow{
  constructor(){

    var addButton = new ActionButton("find");
    var discardButton = new ActionButton("discard");
    var buttons = document.createElement("div");
    buttons.className = "mdc-card__action-buttons"
    buttons.appendChild(addButton);
    buttons.appendChild(discardButton);
    var positionCard = new CardTemp(luogoSconosciuto.title, null, luogoSconosciuto.description, luogoSconosciuto.media, buttons, null);

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
