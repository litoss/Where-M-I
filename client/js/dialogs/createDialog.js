function createDialog(position, card){
  var content = document.createElement("div");

  var lat = position.lat();
  var long = position.lng();
  var exampleCard;

  if (card == null)  exampleCard = new Card(luogoSconosciuto.title, null, luogoSconosciuto.description, luogoSconosciuto.media, null, null, 'about-card').root_;
  else exampleCard = card;
  exampleCard.id = "place-card";
  content.appendChild(exampleCard);

  if (card == null){
    var name = new TextField("Name",null,true,"emoji_flags");
    content.appendChild(name.root_);


    var descr = new TextField("Description",null,null,"subject");
    content.appendChild(descr.root_);
  }

  var opHo = new TextField("Opening Hours","hh:mm/hh:mm",null,"schedule");
  content.appendChild(opHo.root_);

  var elements = [];
  for (var i in categories) elements.push(new ElementList(categories[i].name));
  var listEl = new List(elements);
  var cat = new Select("Category",listEl.root_,'form-field');
  content.appendChild(cat.root_);

  var footer = document.createElement('div');
  var button = new IconButton("add","mdc-button--raised mdc-image__circular");

  button.root_.addEventListener("click", async function validate(){
    var form = new FormData();
    form.append('OLC', OpenLocationCode.encode(position.lat(), position.lng(), OpenLocationCode.CODE_PRECISION_EXTRA));
    form.append('user', profile.getId());

    if(name) nameValidation(name);
    else{
     form.append('name', document.getElementById("place-card").querySelector(".mdc-card__title").innerHTML);
    }

    //get img from card
    var imgUrl = exampleCard.querySelector('.mdc-card__media').style.backgroundImage.slice(4, -1).replace(/["']/g, "");
    var blob = await getimageBlob(imgUrl);
    var b64image = await encode64(blob);
    //form.append('category', ?)
    //form.append('orario', ?);
    form.append('description', document.getElementById("place-card").querySelector(".mdc-typography--body2").innerHTML);
    form.append('image', b64image);
    submit(form);

  });
  footer.appendChild(button.root_);


  var dialog = new Dialog(content,footer,"Add some informations.");
  document.getElementById('map').appendChild(dialog.root_);
  dialog.open();

  dialog.listen('MDCDialog:closing', function() {
  document.getElementById('map').removeChild(dialog.root_);
});

function nameValidation(name){
  console.log(name.value.length);
  if(name.value.length == 0) console.log('no input');
  else if(name.value.length > 20) console.log("long");
  console.log(name.value);
}

async function getimageBlob(url){
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  let response = await fetch(proxyurl + url);
  let result = await response.blob();
  return result;
}


function encode64(file) {
  var to64 = convertBlobToBase64(file);
  return to64;
}

function convertBlobToBase64(blob){
    var convertPromise = new Promise(function(resolve, reject){
      var fileReader = new FileReader();
      fileReader.onload = function() {
          var dataUrl = this.result;
          var base64 = dataUrl.split(',')[1]
          resolve(base64);
      };

      fileReader.readAsDataURL(blob);
    });

    return convertPromise;
  }

function submit(form){
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

  console.log(JSON.stringify(object));
  //xhr.send(JSON.stringify(object));
}
}
