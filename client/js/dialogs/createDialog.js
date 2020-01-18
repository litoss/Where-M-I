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
  }else{
    imgUri = 'content/no_street.png';
    //img64 = await encode64('content/no_street.png');
  }

  if(place.description){
    if(place.description.length > 100) description = place.description.substring(0,100)+"...";
    else description = place.description;
  }

  var exampleCard = new Card(place.name, place.category, place.description, imgUri, null, null, 'about-card');

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

    place.token = token;

    if(nameForm.value.length == 0) {
      var snackbar = new SnackBar('No input on name');
      snackbar.open();
    }else if(nameForm.value.length > 40){
      var snackbar = new SnackBar('name is too long');
      snackbar.open();
    }else if(descrForm.value.length == 0){
      var snackbar = new SnackBar('Please insert a short description');
      snackbar.open();
    }else{

      place.name = nameForm.value;
      place.category = cat.value;
      place.opening = slider1.value;
      place.closing = slider2.value;
      place.description = descrForm.value;

      if(input.files[0]) {
        console.log(input.files[0]);
        place.image = await encode64(input.files[0]);
      }else{
        place.image = img64;
      }
      verify(place);
    }
  });

  dialog.listen('MDCDialog:closing', function() {
    document.getElementById('map').removeChild(dialog.root_);
  });

  dialog.listen('MDCDialog:opened', function() {
    slider1.layout();
    slider2.layout();
  });
}

function verify(place){
  xhr = new XMLHttpRequest();
  xhr.open('POST', '/find_place');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    var response = JSON.parse(xhr.response);
    if(!response[0]) submit(place);
    else if(response[0].user != profile.Eea){
      var snackbar = new SnackBar('Place already added from another User');
      snackbar.open();
    }else {
      var edit = new ActionButton('edit');
      var close = new IconButton('close');
      var snackbar = new SnackBar('You are edit a place already added',[edit.root_,close.root_]);
      snackbar.open();
      edit.listen('click', () => {
        submit(place);
      })
    }
  }
  xhr.send(JSON.stringify({OLC: place.OLC}));
}


function submit(place){

  map.closeAllWindow();
  dialog.close();
  map.pageDrawer.open = false;

  xhr = new XMLHttpRequest();
  xhr.open('POST', '/new_place');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = async function() {
    if (xhr.status ==  200 ) {

      for(var i in markerClips){
        var olc = OpenLocationCode.encode(markerClips[i].getPosition().lat(), markerClips[i].getPosition().lng(), OpenLocationCode.CODE_PRECISION_NORMAL);

        if (olc == place.OLC){
          console.log("ciao");
          markerClips[i].setMap(null);
          markerClips.splice(i, 1);
          break;
        }
      }

      markerPlaces.push(new Place(place));

      markerCluster.clearMarkers();
      markerCluster = new MarkerClusterer(map, markerClips.concat(markerPlaces));

      var snackbar = new SnackBar('Place added Successfully');
      snackbar.open();
    }
    else if (xhr.status !== 200) {
      var snackbar = new SnackBar('Request failed.  Returned status of ' + xhr.status);
      snackbar.open();
    }
  };
  xhr.send(JSON.stringify(place));
}
