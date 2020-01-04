async function createEditDialog(place){
  var content = document.createElement("div");

  var dialogTitle = 'Edit this place.';
  var dialogIcon = 'edit';
  var imgUri;
  var img64;

  if(place.image) {
    imgUri = decode64(place.image, "image/jpg");
    img64 = place.image;
  }else{
    imgUri = 'content/no_street.png';
  }
  var  exampleCard = new Card(place.name, place.category, place.description, imgUri, null, null, 'about-card');

  exampleCard.id = "place-card";
  content.appendChild(exampleCard.root_);

  var imgUpload = new IconButton('add_a_photo',"mdc-button--raised mdc-image__circular");
  var input = document.createElement('input');
  input.setAttribute('type','file');
  input.id = 'image-input';
  imgUpload.root_.appendChild(input);


  var nameForm = new TextField("Name","emoji_flags");
  nameForm.input.setAttribute('value', place.name);
  content.appendChild(nameForm.root_);
  content.appendChild(imgUpload.root_);

  var descrForm = new TextField(null, "subject", 'mdc-text-field--textarea');
  descrForm.input.value = place.description;
  content.appendChild(descrForm.root_);

  var opHoForm = new TextField("Opening Hours", "schedule");
  content.appendChild(opHoForm.root_);

  var listEl = new List();
  for (var i in categories) listEl.add(new SelectList(categories[i].name,categories[i].id));

  var cat = new Select("Category",listEl.root_,'form-field');
  cat.listContainer.className += ''+ 'cat-list';
  content.appendChild(cat.root_);

  var footer = document.createElement('div');
  var button = new IconButton(dialogIcon,"mdc-button--raised mdc-image__circular");
  footer.appendChild(button.root_);

  var dialog = new Dialog(content,footer,dialogTitle);
  document.getElementById('map').appendChild(dialog.root_);
  dialog.open();
  //descrForm.input.focus();
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

  button.listen("click", async function validate(){
    var form = new FormData();
    form.append('OLC', place.OLC);
    form.append('token', token);

    if(nameForm.value.length == 0) {
      var snackbar = new SnackBar('No input on name');
      snackbar.open();
      snackbar.listen("MDCSnackbar:closed",() => {
        document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
      });
      return;
    }
    else if(nameForm.value.length > 30){
      var snackbar = new SnackBar('name is too long');
      snackbar.open();
      snackbar.listen("MDCSnackbar:closed",() => {
        document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
      });
      return;
    }
    form.append('name',nameForm.value);

    form.append('category', cat.value);

    form.append('opening', opHoForm.value);

    if(descrForm.value.length == 0) {
          if(place.description) form.append('description', place.description);
          else {
            var snackbar = new SnackBar('Please insert a short description');
            snackbar.open();
            snackbar.listen("MDCSnackbar:closed",() => {
              document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
            });
          }
        }
    else form.append('description', descrForm.value);

    if(input.files[0]) {
      var blob= input.files[0];
      img64 = await encode64(blob);
    }
    if(img64) form.append('image', img64);
    else {
      var snackbar = new SnackBar('Select an Image');
      snackbar.open();
      snackbar.listen("MDCSnackbar:closed",() => {
        document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
      });
      return;
    }

    submit(form);
  });

  dialog.listen('MDCDialog:closing', function() {
  document.getElementById('map').removeChild(dialog.root_);
});

function submit(form){
  var place = {};
  form.forEach(function(value, key){
      place[key] = value;
  });

  xhr = new XMLHttpRequest();
  xhr.open('POST', '/new_place');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
      if (xhr.status === 200 ) {
        var snackbar = new SnackBar('Successfully added');
        snackbar.open();
        snackbar.listen("MDCSnackbar:closed",() => {
          document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
        });
          var addedPlace = new Place(place);
          map.places.push(addedPlace);
          map.closeAllWindow();
      }
      else if (xhr.status !== 200) {
          alert('Request failed.  Returned status of ' + xhr.status);
      }
  };


  xhr.send(JSON.stringify(place));
}
}
