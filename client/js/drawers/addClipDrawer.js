function addClipDrawer(){

  var div = document.createElement('div');

  var newClip = document.createElement('h2');
  newClip.innerHTML = 'Nuova clip';
  div.appendChild(newClip);

  var titolo = new TextField("Name");
  titolo.required = true;
  div.appendChild(titolo.root_);
  div.appendChild(document.createElement('br'));

  var testo = new TextField("Testo",null, null, null, "mdc-text-field--textarea");
  testo.required = true;
  div.appendChild(testo.root_);
  div.appendChild(document.createElement('br'));

  var what = new FormField(new Radio('radio1'), 'What');
  div.appendChild(what.root_);

  var how = new FormField(new Radio('radio2'), 'How');
  div.appendChild(how.root_);

  var why = new FormField(new Radio('radio3'), 'Why');
  div.appendChild(why.root_);

  var listE1 = new List();
  for (var i in categories) listE1.add(new SelectList(categories[i].name,categories[i].id));

  var selectE1 = new Select("Content", listE1.root_);
  div.appendChild(selectE1.root_);

  var listE2 = new List();
  for (var i in audience) listE2.add(new SelectList(categories[i].name,categories[i].id));

  var selectE2 = new Select("Audience", listE2.root_);
  div.appendChild(selectE2.root_);

  var registerClip = document.createElement('h2');
  registerClip.innerHTML = 'Registra clip';
  div.appendChild(registerClip);

  var register = new IconButton("fiber_manual_record","mdc-button--raised");
  div.appendChild(register.root_);

  var stop = new IconButton("stop", "mdc-button--raised");
  div.appendChild(stop.root_);

  var play = new IconButton("play_arrow", "mdc-button--raised");
  div.appendChild(play.root_);

  var label = document.createElement('label');
  label.innerHTML = "00:00:00";
  div.appendChild(label);

  var cancel = new IconButton('delete');
  div.appendChild(cancel.root_);
  div.appendChild(document.createElement('br'));

  var bozza = new ActionButton('Salva come bozza');
  div.appendChild(bozza.root_);

  var salva = new ActionButton('Carica su Where M I');
  div.appendChild(salva.root_);

  register.listen('click', startRecord);
  stop.listen('click', stopRecord);
  play.listen('click', async () => {
    var stream = await getRecord();
    var audio = new Audio(stream);
    audio.play();
  });
  cancel.listen('click', clearRecord);

  salva.listen('click', async () => {
    if(titolo.value && testo.value){
      var stream = await getRecord();
      insertClip(titolo.value, testo.value, 'private', stream);
    }else{
      alert("Mancano dati");
    }
  })

  map.pageDrawer = new PageDrawer('New Clip', div);
  map.pageDrawer.open = true;
}
