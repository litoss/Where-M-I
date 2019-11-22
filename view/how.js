function openHow() {
<<<<<<< HEAD
  var howDialog = new Dialog(new Card("prova","content/confusedTravolta.svg","dialogCard","",""), new IconButton("person"));
=======
  var howDialog = new Dialog(new Card("prova","content/background1.jpg","","",""), new IconButton("person"));
>>>>>>> 59ba5b640afb27b75f77b65908ed0cbfd125ec75
  document.getElementById('map').appendChild(howDialog.root_);
  howDialog.open(howDialog);
}
