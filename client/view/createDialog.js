function createDialog(){
  var content = document.createElement("div");

  var lat = placeMarker.getPosition().lat();
  var long =placeMarker.getPosition().lng();

  var exampleCard = new CardTemp(luogoSconosciuto.title, null, luogoSconosciuto.description, luogoSconosciuto.media);
  exampleCard.className += " about-card";
  content.appendChild(exampleCard);

  var addName = document.createElement("div");
  var name = new TextField("Name","add");
  var submit = new IconButton("add");
  submit.root_.addEventListener("click", function(){
    document.querySelector(".mdc-card__title").innerHTML= name.value;
  })
  addName.appendChild(name.root_);
  addName.appendChild(submit.root_);
  content.appendChild(addName);


  var addImage = document.createElement("div");
  var input = document.createElement('input');
  input.type = 'file';
  input.id = 'file';
  addImage.appendChild(input);
  var submit = new IconButton("add");
  submit.root_.addEventListener("click", function(){

  })
  addImage.appendChild(submit.root_);
  content.appendChild(addImage);

  var footer = document.createElement('div');
  var button = new ActionButton("add");
  button.addEventListener("click", function(){

  });
  footer.appendChild(button);


  var dialog = new Dialog(content,footer);
  document.getElementById('map').appendChild(dialog.root_);
  dialog.open();
}
