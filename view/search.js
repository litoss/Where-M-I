function openSearch(){
  document.getElementById('content_title').innerHTML = 'Search';
  document.getElementById('content_content').innerHTML= '';

  var search = new TextField("Cerca Clip, Luoghi e Percorsi", "search");
  document.getElementById('content_content').appendChild(search.root_);

  mainDrawer.open = false;
  pageDrawer.open = true;
}
