function openHow() {

  var howDialog = new Dialog(new CardTemp("prova","content/background1.jpg","","",""), new ActionButton("person"));

  document.getElementById('map').appendChild(howDialog.root_);
  howDialog.open();
}