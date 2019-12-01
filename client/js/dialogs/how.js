function openHow() {

  var howDialog = new Dialog(new CardTemp("prova","content/background1.jpg","","",""), new ActionButton("person"), "ciao");

  document.getElementById('map').appendChild(howDialog.root_);
  howDialog.open();

  howDialog.listen('MDCDialog:closing', function() {
  document.getElementById('map').removeChild(dialog.root_);
  });
}
