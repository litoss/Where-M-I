var visited = false;

async function selectedPlace(place){

  if(pageDrawer) pageDrawer.open = false;

  var review = [];

  var audio;

  var content = document.createElement('div');

  var clipButton = new FloatingActionButton('queue_music', 'drawer-fab');
  content.appendChild(clipButton.root_);

  clipButton.listen('click', () => {
    clipDrawer(place.OLC, places[place.OLC]);
  });

  var imgContainer = document.createElement('div');
  imgContainer.className = 'img-container';
  content.appendChild(imgContainer);

  var img = document.createElement('img');
  img.setAttribute('src', decode64(place.image, "image/jpg"));
  img.className = 'selected-place-img'
  imgContainer.appendChild(img);

  var infoContainer =  document.createElement('div');
  content.appendChild(infoContainer);

  var openingHours = document.createElement('h4');
  openingHours.innerHTML = 'Opening hours: ' + place.opening + ":00/" + place.closing + ":00";
  infoContainer.appendChild(openingHours);

  getMediaRating(place.OLC).then( function(mediaRating){
    var stars = setStar(mediaRating, infoContainer);
    infoContainer.appendChild(stars);
  });

  var buttonDiv =  document.createElement('div');
  content.appendChild(buttonDiv);

  var reviewButton = new IconButton('rate_review','mdc-button--raised mdc-image__circular');
  buttonDiv.appendChild(reviewButton.root_);

  if(profile){
    var visited = new IconButton('check_circle_outline', 'mdc-button--raised mdc-image__circular');

    buttonDiv.appendChild(visited.root_);
    checkVisited(place.OLC, visited);

    visited.listen('click', () => {
      setVisited(place.OLC, visited);
    });
  }

  var separator1 = document.createElement('hr');
  separator1.className = 'mdc-list-divider';
  content.appendChild(separator1);

  var description = document.createElement('p');
  description.className = 'descr';
  description.innerHTML = place.description;
  content.appendChild(description);

  if(gapi.client.language){
    detect(place.description).then((src) => {
      if(src != preferences.language){
        translate(place.description, src, preferences.language).then((translation) => {
          description.innerHTML = translation;
        });
      }
    });
  }else{
    var snackbar = new SnackBar('Translation is not Available');
    snackbar.open();
  }

  var texttospeechButton = new IconButton('audiotrack', 'mdc-button--raised mdc-image__circular');
  content.appendChild(texttospeechButton.root_);
  texttospeechButton.listen('click', async() => {
    if(gapi.texttospeech){
      if(!audio) {
        var speech = await texttospeech(document.querySelector('.descr').innerHTML, preferences.language);
        audio = new Audio("data:audio/mp3;base64," + speech);
        audio.play();
      }else {
        audio.pause();
        audio = null;
      }
    }else{
      var snackbar = new SnackBar('Text-To-Speech is not Available');
      snackbar.open();
    }
  });

  reviewButton.listen("click", () => {
    pageDrawer.open = false;
    reviewDrawer(place.OLC);
  })

  var separator3 = document.createElement('hr');
  separator3.className = 'mdc-list-divider';
  content.appendChild(separator3);

  getUser(place.user).then((creator) => {
    var creatorList = new List("mdc-list--two-line mdc-list--avatar-list");
    creatorList.add(new ImageList(creator.name, "Creator", creator.picture ));
    separator3.insertAdjacentElement('afterend',creatorList.root_);
  })

  pageDrawer  = new PageDrawer(place.name, content);
  pageDrawer.open = true;

  pageDrawer.listen('MDCDrawer:closed', () => {
    if(audio){
      audio.pause();
      audio = null;
    }
    visited = false;
  });
}

function checkVisited(olc, but){
  xhr = new XMLHttpRequest();
  xhr.open('POST', '/find_review');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function(){
    var response =JSON.parse(xhr.response);
    if (!response[0]) return;
    else if (!response[0].visit_tag) return;
    else but.setIcon('check_circle');
    visited = true;
  }
  xhr.send(JSON.stringify({OLC: olc, token: token}));
}

function setVisited(olc, but){
  visited = !visited;
  xhr = new XMLHttpRequest();
  xhr.open('POST', '/new_review');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function(){
    if(visited) but.setIcon('check_circle');
    else{
       but.setIcon('check_circle_outline');
    }
  };
  xhr.send(JSON.stringify({OLC: olc, token: token, visit_tag: visited}));
}

function getUser(id) {
  return new Promise((resolve,reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/find_preference');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      resolve(JSON.parse(xhr.response)[0]);
    };
    xhr.send(JSON.stringify({id: id}));
  });
}

function getMediaRating(olc){
  return new Promise((resolve,reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/find_place');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      resolve(JSON.parse(xhr.response)[0].media_rating);
    };
    xhr.send(JSON.stringify({OLC: olc}));
  });
}
