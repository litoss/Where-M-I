var dialog;

async function createEditDialog(place){

  var content = document.createElement("div");

  var dialogTitle = 'Edit this place.';
  var dialogIcon = 'edit';
  var imgUri;
  var img64;

  if(place.image) {
    imgUri = decode64(place.image, "image/jpg");
    img64 = place.image;
  }else imgUri = 'content/no_street.png';

  if(place.description.length > 100) description = place.description.substring(0,100)+"...";
  else description = place.description;

  var  exampleCard = new Card(place.name, place.category, description, imgUri, null, null, 'about-card');

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

  var listEl = new List();
  for (var i in categories) listEl.add(new SelectList(categories[i].name,categories[i].id));

  var cat = new Select("Category",listEl.root_,'form-field');
  cat.listContainer.className += ''+ 'cat-list';
  content.appendChild(cat.root_);

  var footer = document.createElement('div');
  var button = new IconButton(dialogIcon,"mdc-button--raised mdc-image__circular");
  footer.appendChild(button.root_);

  dialog = new Dialog(content,footer,dialogTitle);
  document.getElementById('map').appendChild(dialog.root_);
  dialog.open();
  nameForm.input.focus();

  var opening =  document.createElement('div');
  var open = document.createElement('h4');
  open.innerHTML = 'Open at : '
  opening.appendChild(open);
  var slider1 = new Slider();
  slider1.min = 0;
  slider1.max = 24;
  slider1.value = 0;
  opening.appendChild(slider1.root_);
  content.appendChild(opening);

  var closing =  document.createElement('div');
  var close = document.createElement('h4');
  close.innerHTML = 'Close at : '
  closing.appendChild(close);
  var slider2 =  new Slider();
  slider2.min = 0;
  slider2.max = 24;
  slider2.value = 24;
  closing.appendChild(slider2.root_);
  content.appendChild(closing);

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
    var descr;
    if(descrForm.value.length > 100) descr = descrForm.value.substring(0,100)+"...";
    else descr = descrForm.value;
    exampleCard.setSecondary(descr);
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
    else if(nameForm.value.length > 40){
      var snackbar = new SnackBar('name is too long');
      snackbar.open();
      snackbar.listen("MDCSnackbar:closed",() => {
        document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
      });
      return;
    }
    form.append('name',nameForm.value);

    form.append('category', cat.value);

    var opening = slider1.value;
    form.append('opening', opening);

    var closing = slider2.value;
    form.append('closing', closing);

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
    if(img64)form.append('image', img64);
    else {
      var snackbar = new SnackBar('Select an Image');
      snackbar.open();
      snackbar.listen("MDCSnackbar:closed",() => {
        document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
      });
      return;
    }
    verify(form, place);
  });

  dialog.listen('MDCDialog:closing', function() {
    document.getElementById('map').removeChild(dialog.root_);
  });

  dialog.listen('MDCDialog:opened', function() {
    slider1.layout();
    slider2.layout();
  });
}

function verify(form, place){
  xhr = new XMLHttpRequest();
  xhr.open('POST', '/find_place');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    var response = JSON.parse(xhr.response);
    if(!response[0]) submit(form);
    else if(response[0].user != profile.Eea){
      var snackbar = new SnackBar('Place already added from another User');
      snackbar.open();
      snackbar.listen("MDCSnackbar:closed",() => {
        document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
      });
    }else {
      var edit = new ActionButton('edit');
      var close = new IconButton('close');
      var snackbar = new SnackBar('You are edit a place already added',[edit.root_,close.root_]);
      snackbar.open();
      edit.listen('click', () => {
        submit(form);
      })
      snackbar.listen("MDCSnackbar:closed",() => {
        document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
      });
    }
  }
  xhr.send(JSON.stringify({OLC: place.OLC}));
}


function submit(form, place){
  var object = {};
  form.forEach(function(value, key){
      object[key] = value;
  });

  console.log(object);

  xhr = new XMLHttpRequest();
  xhr.open('POST', '/new_place');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = async function() {
      if (xhr.status ==  200 ) {
          var addedPlace = new Place(object);

          addedPlace.place.media_rating = await getRating(addedPlace.place.OLC);
          map.places.push(addedPlace);

          map.closeAllWindow();
          dialog.close();
          if(map.pageDrawer) map.pageDrawer.open = false;
          var snackbar = new SnackBar('Place added Successfully');
          snackbar.open();
          snackbar.listen("MDCSnackbar:closed",() => {
            document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
          });

      }
      else if (xhr.status !== 200) {
          alert('Request failed.  Returned status of ' + xhr.status);
      }
  };
  xhr.send(JSON.stringify(object));
}
