var welcomeDialog;

function openWelcome() {
  var content = document.createElement('div');
  var img = document.createElement('img');
  img.src = '../../content/menuheader.svg';
  img.id = 'welcome-img';

  var descr = document.createElement('p');
  descr.innerHTML = 'The audio guide of the future: navigate, listen and record the clips of your favourite places in the world';

  content.appendChild(img);
  content.appendChild(descr);

  var buttonContainer = document.createElement('div');
  var start = new ActionButton('start', 'mdc-button--raised');

  buttonContainer.appendChild(start.root_);

  welcomeDialog = new Dialog(content, buttonContainer, "Where Am I");

  document.getElementById('map').appendChild(welcomeDialog.root_);
  welcomeDialog.open();
  welcomeDialog.scrimClickAction = '';
  welcomeDialog.escapeKeyAction = '';

  start.listen('click',() => {
    if(preferences){
      welcomeDialog.close();
      openGeocode();
    }else{
      var snackbar = new SnackBar('Wait until page is loaded');
      snackbar.open();
    }
  });

  welcomeDialog.listen('MDCDialog:closing', function() {
    document.getElementById('map').removeChild(welcomeDialog.root_);
  });
}
