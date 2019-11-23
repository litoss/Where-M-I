function openAbout() {

  document.getElementById('content_content').innerHTML = '';
  document.getElementById('content_title').innerHTML = 'About Us';

  var aboutBar = new TabBar(aboutTab.map(o => o['icon']), aboutTab.map(o => o['name']));
  var div = document.createElement('div');

  aboutBar.listen("MDCTabBar:activated", (event) => {

    div.innerHTML = '';

    switch (event.detail.index) {
      case 0: var team = [simone, carlos, stefano, vincenzo];
        for (var i in team){
          var card = new CardTemp(team[i].title, null, team[i].description, team[i].media, null, team[i].contacts);
          card.className += ' about-card';
          div.appendChild(card);
        }
        break;
      case 1:
        for(var i in technologies){
          var card = new CardTemp(technologies[i].title, null, null, technologies[i].media, null, null);
          card.className += ' about-card';
          div.appendChild(card);
        }
        break;
    }
  });

  aboutBar.activateTab(0);

  document.getElementById('content_content').appendChild(aboutBar.root_);
  document.getElementById('content_content').appendChild(div);

  mainDrawer.open = false;
  pageDrawer.open = true;
}
