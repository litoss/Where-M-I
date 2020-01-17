var visited = false;

async function selectedPlace(place){

  if(map.pageDrawer) map.pageDrawer.open = false;

  var review = [];

  var audio;

  var content = document.createElement('div');

  var addButton = new FloatingActionButton('keyboard_voice', 'drawer-fab');
  content.appendChild(addButton.root_);

  addButton.listen('click', () => {
    addClipDrawer(place);
  })

  var imgContainer = document.createElement('div');
  imgContainer.className = 'img-container';
  content.appendChild(imgContainer);

  var img = document.createElement('img');
  img.setAttribute('src', decode64(place.image, "image/jpg"));
  img.className = 'selected-place-img'
  imgContainer.appendChild(img);

  var openingHours = document.createElement('h5');
  openingHours.innerHTML = 'Opening hours: ' + place.opening + ":00/" + place.closing + ":00";
  content.appendChild(openingHours);

  var visitedDiv =  document.createElement('div');
  visitedDiv.innerHTML = "Visited :"
  var visited = new IconButton('check_circle_outline', 'mdc-button--raised mdc-image__circular');
  content.appendChild(visitedDiv);
  visitedDiv.appendChild(visited.root_);
  checkVisited(place.OLC, visited);

  visited.listen('click', () => {
    setVisited(place.OLC, visited);
  })


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
        description.innerHTML = await translate(place.description, src, preferences.language);
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

  var separator2 = document.createElement('hr');
  separator2.className = 'mdc-list-divider';
  content.appendChild(separator2);


  var starContainer =  document.createElement('div');
  content.appendChild(starContainer);

  var stars = setStar(place.media_rating, starContainer);
  var reviewButton = new IconButton('rate_review','mdc-button--raised mdc-image__circular');
  starContainer.appendChild(stars);
  starContainer.appendChild(reviewButton.root_);

  reviewButton.listen("click", () => {
    map.pageDrawer.open = false;
    reviewDrawer(place.OLC);
  })

  var separator3 = document.createElement('hr');
  separator3.className = 'mdc-list-divider';
  content.appendChild(separator3);

  var creator = await getUser(place.user);
  var creatorList = new List("mdc-list--two-line mdc-list--avatar-list");
  creatorList.add(new ImageList(creator.name, "Creator", creator.picture ));
  content.appendChild(creatorList.root_);

  var clipTitle = document.createElement('h3');
  clipTitle.innerHTML = "Clip Audio";
  content.appendChild(clipTitle);

  var what = document.createElement('h3');
  what.innerHTML = "What is this?";
  content.appendChild(what);

  response = searchClips(place.OLC, "what", preferences.language, preferences.category, preferences.audience)
  if(!response.length){
    var empty = document.createElement('p');
    empty.innerHTML = "Non ci sono clip su questo luogo o che corrispondono alle tue preferenze."
    what.insertAdjacentElement('afterend',empty);
  }else{
    var player = new YoutubePlayer(response);
    what.insertAdjacentElement('afterend',player);
  }

  var how = document.createElement('h3');
  how.innerHTML = "How to get in?";
  content.appendChild(how);

  response = searchClips(place.OLC, "how", preferences.language, preferences.category, preferences.audience)
  if(!response.length){
    var empty = document.createElement('p');
    empty.innerHTML = "Non ci sono clip su questo luogo o che corrispondono alle tue preferenze."
    how.insertAdjacentElement('afterend',empty);
  }else{
    var player = new YoutubePlayer(response);
    how.insertAdjacentElement('afterend',player);
  }

  var why = document.createElement('h3');
  why.innerHTML = "What about this?";
  content.appendChild(why);

  response = searchClips(place.OLC, "why", preferences.language, preferences.category, preferences.audience)
  if(!response.length){
    var empty = document.createElement('p');
    empty.innerHTML = "Non ci sono clip su questo luogo o che corrispondono alle tue preferenze."
    why.insertAdjacentElement('afterend',empty);
  }else{
    var player = new YoutubePlayer(response);
    why.insertAdjacentElement('afterend',player);
  }

  map.pageDrawer  = new PageDrawer(place.name, content);
  map.pageDrawer.open = true;

  map.pageDrawer.listen('MDCDrawer:closed', () => {
    if(audio){
      audio.pause();
      audio = null;
    }
    visited = false;
  });
}

function setStar(rating, div){

  var star = [];
  for(var i=0;i<5;i++){
    if((rating >= (i + 0.33)) && (rating <= (i + 0.66))){
      star[i] = document.createElement('div');
      star[i].className = "material-icons";
      star[i].innerHTML = 'star_half';
      div.appendChild(star[i]);
    }
    else if(rating > i){
      star[i] = document.createElement('div');
      star[i].className = "material-icons";
      star[i].innerHTML = 'star';
      div.appendChild(star[i]);
    }
    else {
      star[i] = document.createElement('div');
      star[i].className = "material-icons";
      star[i].innerHTML = 'star_border';
      div.appendChild(star[i]);
    }
  }
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
