async function selectedPlace(place){
  var content = document.createElement('div');

  var imgContainer = document.createElement('div');
  imgContainer.className = 'img-container';
  content.appendChild(imgContainer);

  var img = document.createElement('img');
  img.setAttribute('src', decode64(place.image));
  img.className = 'selected-place-img'
  imgContainer.appendChild(img);

  if (place.opening) {
    var openingHours = document.createElement('h5');
    openingHours.innerHTML = 'Opening Hours: ' + place.opening;
    imgContainer.appendChild(openingHours);
  }

  var separator1 = document.createElement('hr');
  separator1.className = 'mdc-list-divider';
  content.appendChild(separator1);

  var description = document.createElement('p');
  description.className = 'descr'
  description.innerHTML = place.description;
  content.appendChild(description);

  var translateButton = new IconButton('translate');
  content.appendChild(translateButton.root_);
  translateButton.listen('click', async() => {
    description.innerHTML = await translate(place.description, 'en', 'it');
  })

  var texttospeechButton = new IconButton('speaker_notes');
  content.appendChild(texttospeechButton.root_);
  texttospeechButton.listen('click', () => {
    texttospeech(document.querySelector('.descr').innerHTML, 'it-IT');
  })

  var separator2 = document.createElement('hr');
  separator2.className = 'mdc-list-divider';
  content.appendChild(separator2);

  var olc = document.createElement('p');
  olc.innerHTML = "Open location code: " + place.OLC;
  content.appendChild(olc);

  var separator3 = document.createElement('hr');
  separator3.className = 'mdc-list-divider';
  content.appendChild(separator3);

  var clipTitle = document.createElement('h3');
  clipTitle.innerHTML = "Clip Audio";
  content.appendChild(clipTitle);

  var tabBar = new TabBar(['what','how','why']);
  var list = document.createElement('div');

  let whatList = await search(place.OLC, "what");
  let howList = await search(place.OLC, "how");
  let whyList = await search(place.OLC, "why");

  tabBar.listen("MDCTabBar:activated", (event) => {

    list.innerHTML = '';

    switch (event.detail.index) {
      case 0: list.appendChild(whatList);
        break;
      case 1: list.appendChild(howList);
        break;
      case 2: list.appendChild(whyList);
        break;
    }
  });

  tabBar.activateTab(0);

  content.appendChild(tabBar.root_);
  content.appendChild(list);

  map.pageDrawer  = new PageDrawer(place.name, content);
  map.pageDrawer.open = true;
}
