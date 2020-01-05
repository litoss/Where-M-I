function addClipDrawer(olc){
  var audios = [];

  var div = document.createElement('div');

  var newClip = document.createElement('h2');
  newClip.innerHTML = 'Nuova clip';
  div.appendChild(newClip);

  var titolo = new TextField("Name");
  titolo.required = true;
  div.appendChild(titolo.root_);
  div.appendChild(document.createElement('br'));

  var testo = new TextField("Testo", null, "mdc-text-field--textarea");
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

  var recordMult = new IconButton("fiber_manual_record", "mdc-button--raised");
   div.appendChild(recordMult.root_);

   var playMult = new IconButton("play_arrow", "mdc-button--raised");
   div.appendChild(playMult.root_);

  register.listen('click', startRecord);
  cancel.listen('click', clearRecord);
  stop.listen('click', stopRecord);

  salva.listen('click', async () => {
    if(!false){
      var chunks = await getChunks();
      var base64 = await convertBlobToBase64(new Blob(chunks, {type : 'audio/webm'}));

      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/audio_to_video');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = async function(){
        var url = await decode64(this.responseText, "video/webm");
        var video = document.createElement('video');
        video.controls;
        video.src = url;
        document.body.appendChild(video);

        //insertClip("titolo", "descrizione", "private", );
      };
      xhr.send(JSON.stringify({chunks: base64}));
    }else{
      alert("Mancano dati");
    }
  });

  recordMult.listen('click', async () => {
  if(mediaRecorder == null || mediaRecorder.state == 'inactive' ) startRecord();
  else if(mediaRecorder.state == 'recording'){
    stopWithoutClear();
    var chunks = await getChunks();
    // var url = await getURLfromBlob(new Blob(chunks, {type : 'audio/webm'}));
    // var audio = new Audio(url);
     audios = audios.concat(chunks);
  }
});

playMult.listen('click', async () => {
 // var chunks = await getChunks();
 console.log(audios);
  var url = await getURLfromBlob(new Blob(audios, {type : 'audio/webm'}));
  //console.log('funzionante' + url)
  var audio = new Audio(url);
  audio.play();

  // audios.forEach( async (elem) => {
  //   console.log(elem);
  //   var blob = new Blob(elem, {type : 'audio/webm'}));
  //   blobs.push(base64);
   })
//   var xhr = new XMLHttpRequest();
//     xhr.open('POST', '/upload_multiple_input');
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.onload = async function(){
//       var url = await decode64(this.responseText, "video/webm");
//       var video = document.createElement('video');
//       video.controls;
//       video.src = url;
//       document.body.appendChild(video);
//       //insertClip("titolo", "descrizione", "private", );
//     };
//     xhr.send(JSON.stringify({multChunks: base64s}));


// })

  map.pageDrawer = new PageDrawer('New Clip', div);
  map.pageDrawer.open = true;
}
