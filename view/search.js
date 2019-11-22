function openSearch(){
  document.getElementById('content_title').innerHTML = 'Search';
  document.getElementById('content_content').innerHTML= '';

  var search = new FormField( new IconButton("search"), "search");
  document.getElementById('content_content').appendChild(search.root_);

  mainDrawer.open = false;
  pageDrawer.open = true;
}
