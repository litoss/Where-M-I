function openHow() {
  var howDialog = new Dialog(new Card("prova","content/confusedTravolta.svg","dialogCard","",""), new IconButton("person"));
  document.getElementById('map').appendChild(howDialog.root_);
  howDialog.open(howDialog);
}
