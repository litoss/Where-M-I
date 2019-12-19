function createDialog(position, card){
  var content = document.createElement("div");

  var lat = position.lat();
  var long = position.lng();
  var exampleCard;

  if (card == null)  exampleCard = new Card(luogoSconosciuto.title, null, luogoSconosciuto.description, luogoSconosciuto.media, null, null, 'about-card');
  else exampleCard = card;
  exampleCard.id = "place-card";
  content.appendChild(exampleCard.root_);

  if (card == null){

    var imgUpload = new IconButton('add_a_photo',"mdc-button--raised mdc-image__circular");
    var input = document.createElement('input');
    input.setAttribute('type','file');
    input.id = 'image-input';
    imgUpload.root_.appendChild(input);
    content.appendChild(imgUpload.root_);

    imgUpload.listen('click', async() => {
      input.click();
    });

    input.addEventListener('input', () => {
      var url = URL.createObjectURL(event.target.files[0]);
      exampleCard.setImage(url);
    })

    var nameForm = new TextField("Name",null,true,"emoji_flags");
    content.appendChild(nameForm.root_);

    nameForm.input.addEventListener('input', () => {
      exampleCard.setTitle(nameForm.value);
    })


    var descrForm = new TextField("Description",null,null,"subject");
    content.appendChild(descrForm.root_);

    descrForm.input.addEventListener('input', () => {
    exampleCard.setSecondary(descrForm.value);
    })
  }

  var opHoForm = new TextField("Opening Hours","hh:mm/hh:mm",null,"schedule");
  content.appendChild(opHoForm.root_);

  var elements = [];
  for (var i in categories) elements.push(new SelectList(categories[i].name,categories[i].id));
  var listEl = new List(elements);
  var cat = new Select("Category",listEl.root_,'form-field');
  content.appendChild(cat.root_);

  cat.listen('MDCSelect:change', () => {
  exampleCard.setSubTitle( 'Category: ' + cat.selectedText.innerHTML);
  })

  var footer = document.createElement('div');
  var button = new IconButton("add","mdc-button--raised mdc-image__circular");

  button.root_.addEventListener("click", async function validate(){
    var form = new FormData();
    form.append('OLC', OpenLocationCode.encode(position.lat(), position.lng(), OpenLocationCode.CODE_PRECISION_EXTRA));
    form.append('user', profile.getId());

    //name validation
    if(nameForm) {
      if(nameForm.value.length == 0) {
        alert('No input on name');
        return;
      }
      else if(nameForm.value.length > 20){
        alert("Name is too long");
        return;
      }
      form.append('name',nameForm.value);
    }else{
     form.append('name', document.getElementById("place-card").querySelector(".mdc-card__title").innerHTML);
    }

    if(input) var blob= input.files[0];
    //get img from card
    else{
      var imgUrl = exampleCard.querySelector('.mdc-card__media').style.backgroundImage.slice(4, -1).replace(/["']/g, "");
      var blob = await getimageBlob(imgUrl);
    }
    var b64image = await encode64(blob);
    form.append('image', b64image);

    form.append('category', cat.value);
    form.append('orario', opHoForm.value);

    if(descrForm){
      form.append('description', descrForm.value);
    }else form.append('description', document.getElementById("place-card").querySelector(".mdc-typography--body2").innerHTML);

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
