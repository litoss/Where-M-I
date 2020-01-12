async function selectedPlace(place){

  if(map.pageDrawer) map.pageDrawer.open = false;

  var review = [];

  var audio;

  var content = document.createElement('div');

  var addButton = new FloatingActionButton('audiotrack', 'drawer-fab');
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

  if (place.opening) {
    var openingHours = document.createElement('h5');
    openingHours.innerHTML = 'Opening Hours: ' + place.opening;
    imgContainer.appendChild(openingHours);
  }

  var visited = new IconButton('check_box_ouline_blank');
  content.appendChild(visited.root_);

  var separator1 = document.createElement('hr');
  separator1.className = 'mdc-list-divider';
  content.appendChild(separator1);

  var description = document.createElement('p');
  description.className = 'descr';
  if(preferences.language != 'en') description.innerHTML = await translate(place.description, 'en', preferences.language );
  else description.innerHTML = place.description;
  content.appendChild(description);

  var texttospeechButton = new IconButton('speaker_notes');
  content.appendChild(texttospeechButton.root_);
  texttospeechButton.listen('click', async() => {
    if(audio) {
      audio.pause();
      audio = null;
    }else {
      var speech = await texttospeech(document.querySelector('.descr').innerHTML, preferences.language);
      audio = new Audio("data:audio/mp3;base64," + speech);
      audio.play();
    }
  });

  var separator2 = document.createElement('hr');
  separator2.className = 'mdc-list-divider';
  content.appendChild(separator2);


  var starContainer =  document.createElement('div');
  content.appendChild(starContainer);

  starContainer.addEventListener("click", () => {
    map.pageDrawer.open = false;
    reviewDrawer(place.OLC);
  })
  setStar(place.media_rating, starContainer);

  var separator3 = document.createElement('hr');
  separator3.className = 'mdc-list-divider';
  content.appendChild(separator3);

  var clipTitle = document.createElement('h3');
  clipTitle.innerHTML = "Clip Audio";
  content.appendChild(clipTitle);

  var what = document.createElement('h3');
  what.innerHTML = "What is this?";
  content.appendChild(what);

  if(!playlist[place.OLC]){
    search(place.OLC, "what").then((response) => {
        var player = new YoutubePlayer(response);
        what.insertAdjacentElement('afterend',player);
    });
  }

  var how = document.createElement('h3');
  how.innerHTML = "How to get in?";
  content.appendChild(how);

  var why = document.createElement('h3');
  why.innerHTML = "What about this?";
  content.appendChild(why);

  map.pageDrawer  = new PageDrawer(place.name, content);
  map.pageDrawer.open = true;

  map.pageDrawer.listen('MDCDrawer:closed', () => {
    if(audio){
      audio.pause();
      audio = null;
    }
  });
}

function loadReview(olc){
  console.log(olc);
  xhr = new XMLHttpRequest();
  xhr.open('POST', '/find_route');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function(){
    console.log(xhr.response);
  }
  xhr.send(JSON.stringify({OLC: olc}));
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
