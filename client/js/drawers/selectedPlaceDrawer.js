async function selectedPlace(place){

  var audio;

  var content = document.createElement('div');

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
  var star = [];
  for(var i=0;i<5;i++){
    star[i] = document.createElement('div');
    star[i].className = "material-icons";
    star[i].innerHTML = 'star';
    starContainer.appendChild(star[i]);
  }

  var review = new ActionButton('review');
  starContainer.appendChild(review.root_);

  content.appendChild(starContainer);

<<<<<<< HEAD
  var olc = document.createElement('p');
  olc.innerHTML = "Open location code: " + place.OLC;
  content.appendChild(olc);
=======



  review.listen('click', () => {
    reviewDialog(place);
  })
>>>>>>> c576ba0b0b10c00c8879cce26ab3accdece42add

  var separator3 = document.createElement('hr');
  separator3.className = 'mdc-list-divider';
  content.appendChild(separator3);

  var clipTitle = document.createElement('h3');
  clipTitle.innerHTML = "Clip Audio";
  content.appendChild(clipTitle);

  var what = document.createElement('h3');
  what.innerHTML = "What is this?";
  content.appendChild(what);

  if(playlist[place.OLC]){
    search(place.OLC).then((response) => {
      console.log(response);
      for(var i=0;i<response.length;i++){
        var iframe = document.createElement('iframe');
        iframe.width="420";
        iframe.height="315";
        iframe.src="https://www.youtube.com/embed/" +response[i];
        what.insertAdjacentElement('afterend',iframe);
      }
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
