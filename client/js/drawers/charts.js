function openCharts(){

  var content = document.createElement('div');

  var tabBar = new TabBar(chartsTab.map(o => o['name']), chartsTab.map( o => o['icon']));
  var list = document.createElement('div');
  list.style.padding = '20px';

  tabBar.listen("MDCTabBar:activated", (event) => {

    list.innerHTML = '';

    switch (event.detail.index) {
      case 0:
        var clips = new List();
        for(var i in example) clips.add(new ElementList(example[i].primaryText, example[i].secondaryText, 'music_note'));
        list.appendChild(clips.root_);
        break;
      case 1:
        var vloggers = new List();
        for(var i in example) vloggers.add(new ElementList(example[i].primaryText, example[i].secondaryText, 'music_note'));
        list.appendChild(vloggers.root_);
        break;
      case 2:
        var paths = new List();
        for(var i in example) paths.add(new ElementList(example[i].primaryText, example[i].secondaryText, 'music_note'));
        list.appendChild(paths.root_);
        break;
    }
  });

  tabBar.activateTab(0);

  content.appendChild(tabBar.root_);
  content.appendChild(list);

  map.pageDrawer = new PageDrawer('Charts', content);
  map.pageDrawer.open = true;

}
