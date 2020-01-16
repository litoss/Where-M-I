function openVideoDialog(audiosrc){

  var content = document.createElement('div');

  var audio = document.createElement('audio');
  audio.src = audiosrc;
  audio.controls = 'controls';
  audio.type = 'audio/webm';
  content.appendChild(audio);

  var start = new TextField("Start");
  start.required = true;
  //start.value = "0";
  content.appendChild(start.root_);

  var end = new TextField("End");
  end.required = true;

  content.appendChild(end.root_);

  var volume = new Slider();
  content.appendChild(volume.root_);

  var buttonContainer = document.createElement('div');
  var save = new ActionButton('save');
  var del = new ActionButton('delete');

  buttonContainer.appendChild(save.root_);
  buttonContainer.appendChild(del.root_);
  content.appendChild(buttonContainer);

  var dialog = new Dialog(content, buttonContainer, "");

  document.getElementById('map').appendChild(dialog.root_);
  dialog.scrimClickAction = '';
  dialog.escapeKeyAction = '';
  dialog.open();
  volume.layout();

  del.listen('click',()=>{
    dialog.close();
  })
  return new Promise((resolve, reject) => {
    save.listen('click', async () => {
      if((start.value) && (end.value) && volume.value){
        if(!isNaN(start.value) || !isNaN(end.value)){
          var snackbar = new SnackBar('Insert numbers please');
          snackbar.open();
          snackbar.listen("MDCSnackbar:closed",() => {
            document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
            });
          }
      dialog.close();
      var blob = await getimageBlob(audio.src);
      var base64 = await convertBlobToBase64(blob);
      console.log(base64);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/modify_video');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = async function(){
        var url = decode64(this.responseText, "video/webm");
        resolve(url);
      };
      xhr.send(JSON.stringify({chunks: base64,start: start.value,end:end.value,volume:volume.value}));
      }
      else {
        var snackbar = new SnackBar('Missing data');
        snackbar.open();
        snackbar.listen("MDCSnackbar:closed",() => {
          document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
          });
        }
    });
  });
}
