function createDialog(card){
  var content = document.createElement("div");

  var lat = placeMarker.getPosition().lat();
  var long =placeMarker.getPosition().lng();

  if (card == null) card = new CardTemp(luogoSconosciuto.title, null, luogoSconosciuto.description, luogoSconosciuto.media);
  card.className += " about-card";
  card.id = "place-card";
  content.appendChild(card);

  var addName = document.createElement("div");
  var name = new TextField("Name","add");
  var submit = new IconButton("add");
  submit.root_.addEventListener("click", function(){
    document.getElementById("place-card").querySelector(".mdc-card__title").innerHTML= name.value;
  })
  addName.appendChild(name.root_);
  addName.appendChild(submit.root_);
  content.appendChild(addName);

  var addDescr = document.createElement("div");
  var descr = new TextField("Description","add");
  var submit = new IconButton("add");
  submit.root_.addEventListener("click", function(){
    document.getElementById("place-card").querySelector(".mdc-typography--body2").innerHTML= descr.value;
  })
  addDescr.appendChild(descr.root_);
  addDescr.appendChild(submit.root_);
  content.appendChild(addDescr);

  var addCat = document.createElement("div");
  var cat = new TextField("Category","add");
  var submit = new IconButton("add");
  submit.root_.addEventListener("click", function(){
  })
  addCat.appendChild(cat.root_);
  addCat.appendChild(submit.root_);
  content.appendChild(addCat);

  var addOpHo = document.createElement("div");
  var opHo = new TextField("Opening Hours","add");
  var submit = new IconButton("add");
  submit.root_.addEventListener("click", function(){
  })
  addOpHo.appendChild(opHo.root_);
  addOpHo.appendChild(submit.root_);
  content.appendChild(addOpHo);

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

    var form = new FormData();
    form.append('OLC', OpenLocationCode.encode(placeMarker.getPosition().lat(), placeMarker.getPosition().lng(), OpenLocationCode.CODE_PRECISION_EXTRA));
    form.append('user', googleUser.ID);
    form.append('name', document.getElementById("place-card").querySelector(".mdc-card__title").innerHTML);
    //form.append('category', ?)
    //form.append('orario', ?);
    form.append('description', document.getElementById("place-card").querySelector(".mdc-typography--body2").innerHTML);

    xhr = new XMLHttpRequest();
    xhr.open('POST', '/new_place');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      console.log(xhr.responseText);
        if (xhr.status === 200) {
            alert('Aggiunto con Successo!');
        }
        else if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };

    var object = {};
    form.forEach(function(value, key){
        object[key] = value;
    });

    xhr.send(JSON.stringify(object));
  });
  footer.appendChild(button);


  var dialog = new Dialog(content,footer,"Add some informations.");
  document.getElementById('map').appendChild(dialog.root_);
  dialog.open();

  dialog.listen('MDCDialog:closing', function() {
  document.getElementById('map').removeChild(dialog.root_);
});
}
