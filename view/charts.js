function openCharts(){

  var example = [];
  for(var i=0;i<10;i++) example.push({primary: "Ciccio Pasticcio", secondary: "2225 Contributi"});

  document.getElementById('content_title').innerHTML = 'Charts';
  document.getElementById('content_content').innerHTML = '';

  var tabBar = new TabBar(classifiche.map(o => o['icon']), classifiche.map( o => o['name']));
  var div = document.createElement('div');
  var listE1 = new List(example, 'music_note');
  var listE2 = new List(example, 'person');
  var listE3 = new List(example, 'compare_arrows');

  tabBar.listen("MDCTabBar:activated", (event) => {

    div.innerHTML = '';

    switch (event.detail.index) {
      case 0: div.appendChild(listE1.root_);
        break;
      case 1: div.appendChild(listE2.root_);
        break;
      case 2: div.appendChild(listE3.root_);
        break;
    }
  })
  tabBar.activateTab(0);

  document.getElementById('content_content').appendChild(tabBar.root_);
  document.getElementById('content_content').appendChild(div);

  mainDrawer.open = false;
  pageDrawer.open = true;
}
