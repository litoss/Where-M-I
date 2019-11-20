function openImpostazioni(){

  var content = [
    { tag:"none", name:"nessuna"},
    { tag:"nat", name:"natura"},
    { tag:"art", name:"arte"},
    { tag:"his", name:"storia"},
    { tag:"flk", name:"folklore"},
    { tag:"mod", name:"cultura moderna"},
    { tag:"rel", name:"religione"},
    { tag:"cui", name:"cucina e drink"},
    { tag:"spo", name:"sport"},
    { tag:"mus", name:"musica"},
    { tag:"mov", name:"film"},
    { tag:"fas", name:"moda"},
    { tag:"shp", name:"shopping"},
    { tag:"tec", name:"tecnologia"},
    { tag:"pop", name:"cult. pop. e gossip"},
    { tag:"prs", name:"nessuna"},
    { tag:"none", name:"esperienze personali"},
    { tag:"oth", name:"altro"}
  ];

  var audience = [
    { tag:"gen", name:"pubblico generico"},
    { tag:"pre", name:"pre-scuola"},
    { tag:"elm", name:"scuola primaria"},
    { tag:"mid", name:"scuola media"},
    { tag:"scl", name:"specialisti del settore"},
  ];

  document.getElementById('content_title').innerHTML = 'Impostazioni';

  var item = new Switch('dark_mode');
  item.listen('click', switchDarkMode);

  var switch = new FormField(item , 'Dark Mode');
  document.getElementById('content_content').appendChild(switch.root_);

  var listE1 = new List(example, 'music_note');
  var listE2 = new List(example, 'person');
  var listE3 = new List(example, 'compare_arrows');

  var div = document.createElement('div');
  document.getElementById('content_content').appendChild(div);

  tabBar.listen("MDCTabBar:activated", (event) => {

    if(div.hasChildNodes()) div.removeChild(div.firstChild);

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

  pageDrawer.open = true;
}
