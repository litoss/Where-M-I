function openCharts(){

  var elements = [
    { icon: "queue_music", name: "Clip"},
    { icon: "person", name: "Vloggers"},
    { icon: "navigation", name: "Percorsi"}
  ];

  var example = [];
  for(var i=0;i<10;i++) example.push({primary: "Ciccio Pasticcio", secondary: "2225 Contributi"});

  document.getElementById('content_title').innerHTML = 'Charts';

  var tabBar = new TabBar(elements);
  document.getElementById('content_content').innerHTML = '';
  document.getElementById('content_content').appendChild(tabBar.root_);

  var listE1 = new List(example, 'music_note');
  var listE2 = new List(example, 'person');
  var listE3 = new List(example, 'compare_arrows');

  var div = document.createElement('div');
  document.getElementById('content_content').appendChild(div);

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

  mainDrawer.open = false;
  pageDrawer.open = true;
}
