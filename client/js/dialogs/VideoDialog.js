function openVideoDialog(audiosrc){

  var content = document.createElement('div');

  //var audio = document.createElement('audio');
  //audio.src = audiosrc;
  //content.appendChild(audio);

  var start = new TextField("Start");
  start.required = true;
  start.pattern = "00:00:00";
  //content.appendChild(start.root_);

  var end = new TextField("End");
  end.required = true;
  end.pattern = "00:00:00";
  content.appendChild(end.root_);

  //var volume = new Slider();
  //content.appendChild(volume.root_);

  var buttonContainer = document.createElement('div');
  var save = new ActionButton('save');
  var del = new ActionButton('delete');

  buttonContainer.appendChild(save.root_);
  buttonContainer.appendChild(del.root_);
  content.appendChild(buttonContainer);

  var dialog = new Dialog(content, buttonContainer, "");

  document.getElementById('map').appendChild(dialog.root_);
  dialog.open();
  dialog.scrimClickAction = '';
  dialog.escapeKeyAction = '';

  dialog.listen('MDCDialog:closing', function() {
    document.getElementById('map').removeChild(welcomeDialog.root_);
  });

  end.input.focus();
}
