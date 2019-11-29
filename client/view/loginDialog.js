function loginDialog(){
  if (profile == null){
    var content = document.createElement('div');
    var card = new CardTemp('ciao',null);
    content.appendChild(card);
    var footer = document.createElement('div');
    var dialog = new Dialog(content,footer,"To reach Editor you should Log in.");

    document.getElementById('map').appendChild(dialog.root_);
    dialog.open();

    dialog.listen('MDCDialog:closing', function() {
    document.getElementById('map').removeChild(dialog.root_);
  });
  }
}
