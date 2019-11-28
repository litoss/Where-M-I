function openSearch(){
  document.getElementById('content_title').innerHTML = 'Search';
  document.getElementById('content_content').innerHTML= '';

  var search = new TextField("Cerca Clip, Luoghi e Percorsi", "search");
  document.getElementById('content_content').appendChild(search.root_);

  var button = new IconButton('search');
  document.getElementById('content_content').appendChild(button.root_);

  var toolbar = document.createElement('div');
  toolbar.className = "mdc-menu-surface--anchor";

  var categoriesButton = new ChipButton('categorie', 'keyboard_arrow_down');

  toolbar.appendChild(categoriesButton.root_);

  elements = [];
  for(var i in content) elements.push(new ElementList(content[i].name));
  var list = new List(elements);
  var categoriesMenu = new Menus(list.root_);
  toolbar.appendChild(categoriesMenu.root_);

  categoriesButton.listen("click", () => {
    categoriesMenu.open = true;
  })
  list.listen('MDCList:action', (event) => {
    categoriesButton.setName(content[event.detail.index].name);
    categoriesButton.selected = true;
  });

  document.getElementById('content_content').appendChild(toolbar);
  mainDrawer.open = false;
  pageDrawer.open = true;
}
