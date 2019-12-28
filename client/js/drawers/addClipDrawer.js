function addClipDrawer(){

  var content = document.createElement('div');

  var h1 = document.createElement('h1');
  h1.innerHTML = 'Nuova clip';
  content.appendChild(h1);

  var titolo = new TextField("Name",null,true,"emoji_flags");
  content.appendChild(titolo.root_);

  var testo = new TextField("Testo",null, true);
  content.appendChild(testo.root_);

  var what = new FormField(new Radio('radio1'), 'What');
  content.appendChild(what.root_);

  var how = new FormField(new Radio('radio2'), 'How');
  content.appendChild(how.root_);

  var why = new FormField(new Radio('radio3'), 'Why');
  content.appendChild(why.root_);

  var categoria = new List();
  content.appendChild(categoria.root_);


  map.pageDrawer = new PageDrawer('New Clip', content);
  map.pageDrawer.open = true;
}
