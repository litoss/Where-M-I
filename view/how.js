function openHow() {
  var howDialog = new Dialog(new AboutCard("prova","img"), new IconButton("person"));
  document.getElementById('map').appendChild(howDialog.root_);
  howDialog.open(howDialog);
}
