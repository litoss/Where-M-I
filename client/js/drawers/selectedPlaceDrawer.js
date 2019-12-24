function selectedPlace(place){
  var content = document.createElement('div');

  var src = decode64(place.image);
  console.log(place);
  var imgContainer = document.createElement('div');
  imgContainer.className = 'img-container';
  var img = document.createElement('img');
  img.setAttribute('src', src);
  img.className = 'selected-place-img'
  content.appendChild(imgContainer);
  imgContainer.appendChild(img);

  var title = document.createElement('h2');
  title.className = 'selected-place-title';
  title.innerHTML = place.name;
  imgContainer.appendChild(title);


  if (place.opening) {
    var openingHours = document.createElement('h5');
    openingHours.innerHTML = 'Opening Hours: ' + place.opening;
    imgContainer.appendChild(openingHours);
  }

  var separator1 = document.createElement('hr');
  separator1.className = 'mdc-list-divider';
  content.appendChild(separator1);

  var separator2 = document.createElement('hr');
  separator2.className = 'mdc-list-divider';
  content.appendChild(separator2);

  var tabBar = new TabBar(['what','how','why']);
  var list = document.createElement('div');
  list.style.padding = '20px';

  tabBar.listen("MDCTabBar:activated", (event) => {

    list.innerHTML = '';

    switch (event.detail.index) {
      case 0:
        var whatList = new List();
        for (var i in example) whatList.addElement(new ElementList(example[i].primaryText, example[i].secondaryText, 'music_note'));
        list.appendChild(whatList.root_);
        var card = new Card('ciao');
        whatList.addElement(card.root_);
        break;
      case 1:
        var howList = new List();
        for (var i in example) howList.addElement(new ElementList(example[i].primaryText, example[i].secondaryText, 'music_note'));
        list.appendChild(howList.root_);
        break;
      case 2:
        var whyList = new List();
        for (var i in example) whyList.addElement(new ElementList(example[i].primaryText, example[i].secondaryText, 'music_note'));
        list.appendChild(whyList.root_);
        break;
    }
  });

  tabBar.activateTab(0);

  content.appendChild(tabBar.root_);
  content.appendChild(list);







  //What
  var url = 'https://www.googleapis.com/youtube/v3/videos';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function(){

  };
  xhr.send();

  //How
  //Why

  map.pageDrawer  = new PageDrawer(null, content);
  map.pageDrawer.open = true;
}
