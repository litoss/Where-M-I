function openSettings(){

  var content = document.createElement('div');

//categories
  var catAnchor = document.createElement('div');
  catAnchor.className = 'mdc-menu-surface--anchor';
  var catButton = new ActionButton('Add Categories');
  catButton.root_.addEventListener('click', () => {
    menuCat.open = true;
  })
  const contentSelector = new ListCheckBox(categories.map(o => o['id']), categories.map(o => o['name']));
  var menuCat = new Menu(contentSelector.root_);
  catAnchor.appendChild(catButton.root_);
  catAnchor.appendChild(menuCat.root_);
  content.appendChild(catAnchor);

  map.pageDrawer = new PageDrawer('Settings', content);
  map.pageDrawer.open = true;
}
