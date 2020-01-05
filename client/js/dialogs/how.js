function openHow() {

  var howDialog = new Dialog(new Card("prova","content/background1.jpg","","",""), new ActionButton("person").root_, "ciao");

  document.getElementById('map').appendChild(howDialog.root_);
  howDialog.open();

  howDialog.listen('MDCDialog:closing', function() {
  document.getElementById('map').removeChild(dialog.root_);
  });
}
