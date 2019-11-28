function openCharts(){
  document.getElementById('content_title').innerHTML = 'Charts';
  document.getElementById('content_content').innerHTML = '';

  var tabBar = new TabBar(chartsTab.map(o => o['icon']), chartsTab.map( o => o['name']));
  var list = document.createElement('div');
  list.style.padding = '20px';
  
  tabBar.listen("MDCTabBar:activated", (event) => {

    list.innerHTML = '';

    switch (event.detail.index) {
      case 0: list.appendChild(new List(example, 'music_note').root_);
        break;
      case 1: list.appendChild(new List(example, 'person').root_);
        break;
      case 2: list.appendChild(new List(example, 'compare_arrows').root_);
        break;
    }
  });

  tabBar.activateTab(0);

  document.getElementById('content_content').appendChild(tabBar.root_);
  document.getElementById('content_content').appendChild(list);

  mainDrawer.open = false;
  pageDrawer.open = true;
}
