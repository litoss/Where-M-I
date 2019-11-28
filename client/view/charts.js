function openCharts(){
  document.getElementById('content_title').innerHTML = 'Charts';
  document.getElementById('content_content').innerHTML = '';

  var tabBar = new TabBar(chartsTab.map(o => o['icon']), chartsTab.map( o => o['name']));
  var list = document.createElement('div');
  list.style.padding = '20px';

  var clips = [];
  for(var i in example) clips.push(new ElementList(example[i].primaryText, example[i].secondaryText, 'music_note'));

  var vloggers = [];
  for(var i in example) vloggers.push(new ElementList(example[i].primaryText, example[i].secondaryText, 'music_note'));

  var paths = [];
  for(var i in example) paths.push(new ElementList(example[i].primaryText,example[i].secondaryText, 'music_note'));

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

  document.getElementById('content_content').appendChild(tabBar.root_);
  document.getElementById('content_content').appendChild(list);

  mainDrawer.open = false;
  pageDrawer.open = true;
}
