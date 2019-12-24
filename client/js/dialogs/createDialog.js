function createEditDialog(position, card, type){
  var content = document.createElement("div");

  if (type == 'edit'){
    var dialogTitle = 'Edit this place.';
    var dialogIcon = 'edit';
  }else{
    var dialogTitle = 'Add some informations.';
    var dialogIcon = 'add';
  }

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

  var listEl = new List();
  for (var i in categories) listEl.addElement(new SelectList(categories[i].name,categories[i].id));

  var cat = new Select("Category",listEl.root_,'form-field');
  cat.listContainer.className += ''+ 'cat-list';
  content.appendChild(cat.root_);

  cat.listen('MDCSelect:change', () => {
  exampleCard.setSubTitle( 'Category: ' + cat.selectedText.innerHTML);
  })

  var footer = document.createElement('div');
  var button = new IconButton(dialogIcon,"mdc-button--raised mdc-image__circular");

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
     form.append('name', exampleCard.getTitle());
    }

    form.append('category', cat.value);
    form.append('opening', opHoForm.value);

    if(descrForm){
      form.append('description', descrForm.value);
    }else form.append('description', exampleCard.getSecondary());

    if(input) var blob= input.files[0];
    //get img from card
    else{
      var imgUrl = exampleCard.getImage();
      var blob = await getimageBlob(imgUrl);
    }
    var b64image = await encode64(blob);
    form.append('image', b64image);



    submit(form, type);

  });
  footer.appendChild(button.root_);


  var dialog = new Dialog(content,footer,dialogTitle);
  document.getElementById('map').appendChild(dialog.root_);
  dialog.open();

  dialog.listen('MDCDialog:closing', function() {
  document.getElementById('map').removeChild(dialog.root_);
});

function submit(form, type){
  if (type == 'create') var uri = '/new_place';
  //else var uri = ''
  xhr = new XMLHttpRequest();
  xhr.open('POST', '/new_place');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
      if (xhr.status === 200 ) {
          alert('Aggiunto con Successo!');

          var decode = OpenLocationCode.decode(form.get('OLC'));
          var center = {lat: decode.latitudeCenter, lng: decode.longitudeCenter};
          var image = decode64(form.get('image'));

          //var addedPlace = new Place(form.get('name'), image, form.get('description'), null, center);
          //map.places.push(addedPlace);
          map.noPlace.removePosition();
          //addedPlace.openWindow();
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
  xhr.send(JSON.stringify(object));
}
}
