function openSearch(){
  document.getElementById('content_title').innerHTML = 'Search';
  document.getElementById('content_content').innerHTML= '';

  var search = new TextField("Cerca Clip, Luoghi e Percorsi", "search");
  document.getElementById('content_content').appendChild(search.root_);

  var button = new IconButton('search');
  document.getElementById('content_content').appendChild(button.root_);

  var toolbar = document.createElement('div');
  toolbar.className = "mdc-menu-surface--anchor";

  var categoriesButton = new ChipButton('categorie');
  toolbar.appendChild(categoriesButton);

  elements = [];
  for(var i in content) elements.push(new ElementList(content[i].name));
  var categoriesMenu = new Menus(new List(elements));
  toolbar.appendChild(categoriesMenu.root_);
  categoriesButton.addEventListener("click", () => {
    categoriesMenu.open = true;
  })


  document.getElementById('content_content').appendChild(toolbar);
  mainDrawer.open = false;
  pageDrawer.open = true;
}
