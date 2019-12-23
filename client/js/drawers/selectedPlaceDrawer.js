function selectedPlace(place){
  var content = document.createElement('div');
  var src = decode64(place.image);
  var img = document.createElement('img');
  img.setAttribute('src', src);
  content.appendChild(img);

  var title = document.createElement('h2');
  title.innerHTML = place.name;
  content.appendChild(title);

  var separator1 = document.createElement('hr');
  separator1.className = 'mdc-list-divider';
  content.appendChild(separator1);

  var separator2 = document.createElement('hr');
  separator2.className = 'mdc-list-divider';
  content.appendChild(separator2);

  var tabBar = new TabBar(['what','how','why']);
  var list = document.createElement('div');
  list.style.padding = '20px';

  var clips = [];
  for(var i in example) clips.push(new ElementList(example[i].primaryText, example[i].secondaryText, 'music_note'));

  var vloggers = [];
  for(var i in example) vloggers.push(new ElementList(example[i].primaryText, example[i].secondaryText, 'music_note'));

  var paths = [];
  for(var i in example) paths.push(new ElementList(example[i].primaryText, example[i].secondaryText, 'music_note'));

  tabBar.listen("MDCTabBar:activated", (event) => {

    list.innerHTML = '';

    switch (event.detail.index) {
      case 0: list.appendChild(new List(clips).root_);
        break;
      case 1: list.appendChild(new List(vloggers).root_);
        break;
      case 2: list.appendChild(new List(paths).root_);
        break;
    }
  });

  tabBar.activateTab(0);

  content.appendChild(tabBar.root_);
  content.appendChild(list);







  //What
  search();

  //How
  //Why

  map.pageDrawer  = new PageDrawer(null, content);
  map.pageDrawer.open = true;
}
