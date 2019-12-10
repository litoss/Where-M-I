function listClipDrawer(olc, name, description){
  var content = document.createElement('div');

  var card = new Card(name, null, description);
  content.appendChild(card.root_);
  map.pageDrawer = new PageDrawer('', content);
  map.pageDrawer.open = true;
}
