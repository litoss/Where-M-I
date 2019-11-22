function openAbout() {

  var tabEl = [
    {icon: "people_alt", name: "Developer Team" },
    {icon: "computer", name: "Technologies"}
  ];

  var aboutBar = new TabBar(tabEl);
  document.getElementById('content_content').innerHTML = '';
  document.getElementById('content_content').appendChild(aboutBar.root_);

  var teamEl = [
    {media: "content/simone.jpg", title: "Simone" , type: "aboutCard", contacts:  {facebook: {url:"https://www.facebook.com/Simo.Ferraguti", icon:"fab fa-facebook"}}},
    {media: "content/carlo.jpg", title: "Carlos" , type: "aboutCard", contacts: {facebook: {url:"https://www.facebook.com/carlos.caramaschi1", icon:"fab fa-facebook"}, github: {url:"https://github.com/litoss", icon:"fab fa-github"}}},
    {media: "content/stefano.jpg", title: "Stefano" , type: "aboutCard",
      contacts: {facebook: {url:"https://www.facebook.com/stefano.propato", icon:"fab fa-facebook"},  github: {url:"https://github.com/elPeroN", icon:"fab fa-github"}, instagram: {url:"https://instagram.com/stefano.propato", icon:"fab fa-instagram"}}},
    {media: "content/vincenzo.jpg", title: "Vincenzo" , type: "aboutCard", contacts: {facebook: {url:"https://www.facebook.com/vincenzo.armandi.5", icon:"fab fa-facebook"}}},
  ];

  var techEl = [
    {media: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png", title: "HTML" , type: "aboutCard"},
    {media: "https://www.lifewire.com/thmb/s9kfBeuaF14VAGgE-SjDB-L0ZDs=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/css3-57b597e85f9b58b5c2b338de.png", title: "CSS" , type: "aboutCard"},
    {media: "https://powerforallats.com/wp-content/uploads/2016/03/js-logo.png", title: "JavaScript" , type: "aboutCard"},
    {media: "https://pbs.twimg.com/profile_images/925576484122779648/ucVTUoPg_400x400.jpg", title: "Material.io" , type: "aboutCard"},
    {media: "https://upload.wikimedia.org/wikipedia/commons/4/48/GoogleMaps_logo.svg", title: "Google Maps" , type: "aboutCard"},
    {media: "https://ortlerskytrails.it/wp-content/uploads/2019/03/Youtube-logo-square.png", title: "YouTube" , type: "aboutCard"}
  ];

  document.getElementById('content_title').innerHTML = 'About Us';

  var div = document.createElement('div');
  document.getElementById('content_content').appendChild(div);

  aboutBar.listen("MDCTabBar:activated", (event) => {

    div.innerHTML = '';
    var actionButtons = [];
    var iconButtons = [];

    switch (event.detail.index) {
      case 0:
        for (var i in teamEl ){
          iconButtons[i] = document.createElement('div');
          for (var j in teamEl[i].contacts){
            iB = new FontAwesomeButton(teamEl[i].contacts[j].url, teamEl[i].contacts[j].icon);
            iconButtons[i].appendChild(iB);
            }
            var card = new Card(teamEl[i].title, teamEl[i].media, teamEl[i].type, actionButtons, iconButtons[i]);
            div.appendChild(card);
        };
        break;
      case 1:
        for (var i in techEl ){
          var card = new Card(techEl[i].title, techEl[i].media, techEl[i].type, actionButtons, iconButtons);
          div.appendChild(card);
        };
        break;
    }
  })
  aboutBar.activateTab(0);



  mainDrawer.open = false;
  pageDrawer.open = true;
}
