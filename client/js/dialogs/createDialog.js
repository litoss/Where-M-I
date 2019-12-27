async function createEditDialog(place){
  var content = document.createElement("div");

  var dialogTitle = 'Edit this place.';
  var dialogIcon = 'edit';
  var imgUri;
  var img64;

  if(place.image) {
    imgUri = decode64(place.image);
    img64 = place.image;
  }else{
    imgUri = 'content/no_street.png';
  }
  var  exampleCard = new Card(place.name, null, null, imgUri, null, null, 'about-card');

  exampleCard.id = "place-card";
  content.appendChild(exampleCard.root_);

  var imgUpload = new IconButton('add_a_photo',"mdc-button--raised mdc-image__circular");
  var input = document.createElement('input');
  input.setAttribute('type','file');
  input.id = 'image-input';
  imgUpload.root_.appendChild(input);
  content.appendChild(imgUpload.root_);

  var nameForm = new TextField("Name",null,true,"emoji_flags");
  nameForm.input.setAttribute('value', place.name);
  content.appendChild(nameForm.root_);

  var descrForm = new TextField("Description",null,null,"subject");
  content.appendChild(descrForm.root_);

  var opHoForm = new TextField("Opening Hours","hh:mm/hh:mm",null,"schedule");
  content.appendChild(opHoForm.root_);

  var listEl = new List();
  for (var i in categories) listEl.addElement(new SelectList(categories[i].name,categories[i].id));

  var cat = new Select("Category",listEl.root_,'form-field');
  cat.listContainer.className += ''+ 'cat-list';
  content.appendChild(cat.root_);

  var footer = document.createElement('div');
  var button = new IconButton(dialogIcon,"mdc-button--raised mdc-image__circular");

  var dialog = new Dialog(content,footer,dialogTitle);
  document.getElementById('map').appendChild(dialog.root_);
  dialog.open();
  nameForm.input.focus();

  imgUpload.listen('click', () => {
    input.click();
  });

  input.addEventListener('input', () => {
    var url = URL.createObjectURL(event.target.files[0]);
    exampleCard.setImage(url);
  })


  nameForm.input.addEventListener('input', () => {
    exampleCard.setTitle(nameForm.value);
  })


  descrForm.input.addEventListener('input', () => {
  exampleCard.setSecondary(descrForm.value);
  })

  cat.listen('MDCSelect:change', () => {
  exampleCard.setSubTitle( 'Category: ' + cat.selectedText.innerHTML);
  })

  button.root_.addEventListener("click", async function validate(){
    var form = new FormData();
    form.append('OLC', place.OLC);
    form.append('token', token);

    if(nameForm.value.length == 0) {
      alert('No input on name');
      return;
    }
    else if(nameForm.value.length > 25){
      alert("Name is too long");
      return;
    }
    form.append('name',nameForm.value);


    form.append('category', cat.value);
    form.append('opening', opHoForm.value);

    if(descrForm){
      form.append('description', descrForm.value);
    }else form.append('description', exampleCard.getSecondary());

    if(input.files[0]) {
      var blob= input.files[0];
      img64 = await encode64(blob);
    }
    if(img64) form.append('image', img64);
    else {
      alert('Select an Image');
      return;
    }

    submit(form);
  });
  footer.appendChild(button.root_);

  dialog.listen('MDCDialog:closing', function() {
  document.getElementById('map').removeChild(dialog.root_);
});

function submit(form){
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
          //map.noPlace.removePosition();
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
