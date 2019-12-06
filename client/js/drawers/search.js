function openSearch(){

  var content = document.createElement('div');

  var search = new TextField("Cerca Clip, Luoghi e Percorsi", "search");
  content.appendChild(search.root_);

  var button = new IconButton('search');
  content.appendChild(button.root_);

  var toolbar = document.createElement('div');
  toolbar.className = "mdc-menu-surface--anchor";

  var chip = new ChipButton('categorie');
  var chipSet = new ChipSet([chip.root_], 'mdc-chip-set--choice');

  toolbar.appendChild(chipSet.root_);

  var elements = [];
  for(var i in categories) elements.push(new ElementList(categories[i].name));

  var list = new List(elements);
  var menu = new Menu(list.root_);

  toolbar.appendChild(menu.root_);

  chip.listen("click", () => {
    menu.open = true;
  })

  list.listen('MDCList:action', (event) => {
    chip.setName(content[event.detail.index].name);
    if(event.detail.index) chip.selected = true;
    else chip.selected = false;
  });

  content.appendChild(toolbar);

  map.pageDrawer = new PageDrawer('Search', content);
  map.pageDrawer.open = true;
}
