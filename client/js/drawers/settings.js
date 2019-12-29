function openSettings(){

  var content = document.createElement('div');

  var catAnchor = document.createElement('div');
  catAnchor.className = 'mdc-menu-surface--anchor';
  var catButton = new ActionButton('Categories');
  catButton.addEventListener('click', () => {
    menuCat.open = true;
  })
  var div = document.createElement('div');

  const contentSelector = new ListCheckBox(categories.map(o => o['id']), categories.map(o => o['name']));
  div.appendChild(contentSelector.root_);
  var menuCat = new Menu(div);
  catAnchor.appendChild(catButton);
  catAnchor.appendChild(menuCat.root_);
  content.appendChild(catAnchor);

  map.pageDrawer = new PageDrawer('Settings', content);
  map.pageDrawer.open = true;
}
