function openAbout() {

  var content = document.createElement('div');
  var aboutBar = new TabBar(aboutTab.map(o => o['name']), aboutTab.map(o => o['icon']));
  content.appendChild(aboutBar.root_);

  var tab1 = document.createElement('div');
  var team = [simone, carlos, stefano, vincenzo];
  for (var i in team){
    var actionsIcons = [];
    for(var j in team[i].contacts) actionsIcons.push(new FontAwesomeButton(team[i].contacts[j].url, team[i].contacts[j].icon));
    tab1.appendChild(new Card(team[i].title, null, team[i].description, team[i].media, null, actionsIcons, 'about-card').root_);
  }
  tab1.style.display = "none";
  content.appendChild(tab1);

  var tab2 = document.createElement('div');
  for(var i in technologies){
    tab2.appendChild(new Card(technologies[i].title, null, null, technologies[i].media, null, null, 'about-card').root_);
  }
  tab2.style.display = "none";
  content.appendChild(tab2);


  aboutBar.listen("MDCTabBar:activated", (event) => {
    switch (event.detail.index) {
      case 0: tab2.style.display = "none";
        tab1.style.display = "block";
        break;
      case 1:tab1.style.display = "none";
        tab2.style.display = "block";
        break;
    }
  });
  aboutBar.activateTab(0);

  map.pageDrawer = new PageDrawer('About Us',content);
  map.pageDrawer.open = true;
}
