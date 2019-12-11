function openSettings(){

  var div = document.createElement('div');
  div.className = 'mdc-list-group';

  var header = document.createElement('h3');
  header.className = 'mdc-list-group__subheader';

  header.appendChild(document.createTextNode('Filtra le Categorie'));
  div.appendChild(header);

  const contentSelector = new ListCheckBox(categories.map(o => o['id']), categories.map(o => o['name']));
  div.appendChild(contentSelector.root_);

  map.pageDrawer = new PageDrawer('Settings', div);
  map.pageDrawer.open = true;
}
