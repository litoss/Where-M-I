var welcomeDialog;

function openWelcome() {
  var content = document.createElement('div');
  var img = document.createElement('img');
  img.src = '../../content/menuheader.svg';
  img.id = 'welcome-img';

  var descr = document.createElement('h3');
  descr.innerHTML = 'Select the localization method';

  content.appendChild(img);
  content.appendChild(descr);

  var buttonContainer = document.createElement('div');
  var geolocate = new ActionButton('geolocate', 'mdc-button--raised');
  var insert = new ActionButton('search');

  buttonContainer.appendChild(geolocate.root_);
  buttonContainer.appendChild(insert.root_);

  welcomeDialog = new Dialog(content, buttonContainer, "");

  document.getElementById('map').appendChild(welcomeDialog.root_);
  welcomeDialog.open();
  welcomeDialog.scrimClickAction = '';
  welcomeDialog.escapeKeyAction = '';

  geolocate.listen('click',() => {
    //welcomeDialog.close();
    localize();
  });

  insert.listen('click', () => {
    welcomeDialog.close();
    openGeocode();
  });

  welcomeDialog.listen('MDCDialog:closing', function() {
    document.getElementById('map').removeChild(welcomeDialog.root_);
  });

}
