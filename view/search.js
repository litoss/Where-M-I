function openSearch(){
  document.getElementById('content_title').innerHTML = 'Search';
  document.getElementById('content_content').innerHTML= '';

  var search = new TextField("Cerca Clip, Luoghi e Percorsi", "search");
  document.getElementById('content_content').appendChild(search.root_);

  var button = new IconButton('search');
  document.appendChild(button);

  var categories = new ChipMenu('Categorie', content.map(o => o['name']));
  document.appendChild(categories);

  var audienceMenu = new ChipMenu('Audience', audience.map(o => o['name']));
  document.appendChild(audienceMenu);

  mainDrawer.open = false;
  pageDrawer.open = true;
}
