function openHow() {
  
  var howDialog = new Dialog(new Card("prova","content/background1.jpg","","",""), new IconButton("person"));

  document.getElementById('map').appendChild(howDialog.root_);
  howDialog.open(howDialog);
}
