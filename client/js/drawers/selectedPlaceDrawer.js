function selectedPlace(card){
  var content = document.createElement('div');
  content.appendChild(card.root_);

  map.pageDrawer  = new PageDrawer(null, content);
  map.pageDrawer.open = true;
}
