function openImpostazioni(){
  document.getElementById('content_title').innerHTML = 'Impostazioni';
  document.getElementById('content_content').innerHTML = '';

  var div = document.createElement('div');
  div.className = 'mdc-list-group';

  var header = document.createElement('h3');
  header.className = 'mdc-list-group__subheader';

  header.appendChild(document.createTextNode('Filtra le Categorie'));
  div.appendChild(header);

  const contentSelector = new ListCheckBox(content.map(o => o['id']), content.map(o => o['name']));
  div.appendChild(contentSelector.root_);

  document.getElementById('content_content').appendChild(div);
  pageDrawer.open = true;
}
