function openHow() {
  var howDialog = new Dialog();
  document.getElementById('map').appendChild(howDialog.root_);
  howDialog.open(howDialog);
}
