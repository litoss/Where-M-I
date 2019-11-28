function openSearch(){
  document.getElementById('content_title').innerHTML = 'Search';
  document.getElementById('content_content').innerHTML= '';

  var search = new TextField("Cerca Clip, Luoghi e Percorsi", "search");
  document.getElementById('content_content').appendChild(search.root_);

  var button = new IconButton('search');
  document.getElementById('content_content').appendChild(button.root_);

  var toolbar = document.createElement('div');
  toolbar.className = "mdc-menu-surface--anchor";

  var chip = new ChipButton('categorie');
  var chipSet = new ChipSet([chip.root_], 'mdc-chip-set--choice');

  toolbar.appendChild(chipSet.root_);

  elements = [];
  for(var i in content) elements.push(new ElementList(content[i].name));

  var list = new List(elements);
  var menus = new Menus(list.root_);
  toolbar.appendChild(menus.root_);

  chip.listen("click", () => {
    menus.open = true;
  })
  list.listen('MDCList:action', (event) => {
    chip.setName(content[event.detail.index].name);
    if(event.detail.index) chip.selected = true;
    else chip.selected = false;
  });

  document.getElementById('content_content').appendChild(toolbar);
  mainDrawer.open = false;
  pageDrawer.open = true;
}
