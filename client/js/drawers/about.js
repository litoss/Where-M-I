function openAbout() {

  var content = document.createElement('div');
  var aboutBar = new TabBar(aboutTab.map(o => o['name']), aboutTab.map(o => o['icon']));
  var div = document.createElement('div');

  aboutBar.listen("MDCTabBar:activated", (event) => {

    div.innerHTML = '';

    switch (event.detail.index) {
      case 0:
        var team = [simone, carlos, stefano, vincenzo];
        for (var i in team){
          var actionsIcons = [];
          for(var j in team[i].contacts) actionsIcons.push(new FontAwesomeButton(team[i].contacts[j].url, team[i].contacts[j].icon));
          div.appendChild(new Card(team[i].title, null, team[i].description, team[i].media, null, actionsIcons, 'about-card').root_);
        }
        break;
      case 1:
        for(var i in technologies){
          div.appendChild(new Card(technologies[i].title, null, null, technologies[i].media, null, null, 'about-card').root_);
        }
        break;
    }
  });

  aboutBar.activateTab(0);

  content.appendChild(aboutBar.root_);
  content.appendChild(div);

  map.pageDrawer = new PageDrawer('About Us',content);
  map.pageDrawer.open = true;

}
