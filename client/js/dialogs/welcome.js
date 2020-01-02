function openWelcome() {

  var content = document.createElement('div');
  var img = document.createElement('img');
  img.src = '../../content/menuheader.svg';
  img.id = 'welcome-img';

  var descr = document.createElement('h3');
  descr.innerHTML = 'Select how you want  to set your location';

  content.appendChild(img);
  content.appendChild(descr);

  var buttonContainer = document.createElement('div');
  var geolocate = new ActionButton('geolocate');
  var insert = new ActionButton('insert');
  var select = new ActionButton('Select on map');

  buttonContainer.appendChild(geolocate.root_);
  buttonContainer.appendChild(insert.root_);
  buttonContainer.appendChild(select.root_);

  var welcomeDialog = new Dialog(content, buttonContainer, "Welcome to Where M I");

  document.getElementById('map').appendChild(welcomeDialog.root_);
  welcomeDialog.open();

  insert.listen('click', () => {
    var selectContent = document.createElement('div');
    var name = new TextField('City');
    var road = new TextField('road');
    var num = new TextField ('num');

    selectContent.appendChild(name.root_);
    selectContent.appendChild(road.root_);
    selectContent.appendChild(num.root_);

    welcomeDialog.setContent(selectContent);
  });

  welcomeDialog.listen('MDCDialog:closing', function() {
  document.getElementById('map').removeChild(dialog.root_);
  });
}
