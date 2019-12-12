function createDialog(position, card){
  var content = document.createElement("div");

  var lat = position.lat();
  var long = position.lng();
  var exampleCard;

  if (card == null)  exampleCard = new Card(luogoSconosciuto.title, null, luogoSconosciuto.description, luogoSconosciuto.media).root_;
  else exampleCard = card;
  exampleCard.className += " about-card";
  exampleCard.id = "place-card";
  content.appendChild(exampleCard);

  var form = document.createElement('form');

  if (card == null){
    var name = new TextField("Name",null,true,"emoji_flags");
    form.appendChild(name.root_);

    var descr = new TextField("Description",null,null,"subject");
    form.appendChild(descr.root_);
  }

  var opHo = new TextField("Opening Hours","hh:mm/hh:mm",null,"schedule");
  form.appendChild(opHo.root_);

  var elements = [];
  for (var i in categories) elements.push(new ElementList(categories[i].name));
  var listEl = new List(elements);
  var cat = new Select("Category",listEl.root_,'form-field');
  form.appendChild(cat.root_);

  content.appendChild(form);

  var footer = document.createElement('div');
  var button = new IconButton("add","mdc-button--raised mdc-image__circular");

  button.root_.addEventListener("click", function(){
    var form = new FormData();
    form.append('OLC', OpenLocationCode.encode(position.lat(), position.lng(), OpenLocationCode.CODE_PRECISION_EXTRA));
    form.append('user', profile.getId());
    form.append('name', document.getElementById("place-card").querySelector(".mdc-card__title").innerHTML);
    //form.append('category', ?)
    //form.append('orario', ?);
    form.append('description', document.getElementById("place-card").querySelector(".mdc-typography--body2").innerHTML);

    xhr = new XMLHttpRequest();
    xhr.open('POST', '/new_place');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200 ) {
            alert('Aggiunto con Successo!');
            //map.places.push(new Place(response[i].name, null, response[i].description, null, center, map)
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
  footer.appendChild(button.root_);


  var dialog = new Dialog(content,footer,"Add some informations.");
  document.getElementById('map').appendChild(dialog.root_);
  dialog.open();

  dialog.listen('MDCDialog:closing', function() {
  document.getElementById('map').removeChild(dialog.root_);
});
}
