function openMarker() {

  var content = document.createElement('div');
  var descr = document.createElement('h3');
  descr.innerHTML = 'You can set your position by moving the appropriate marker created on the map';

  var alert = document.createElement('h4');
  alert.innerHTML = 'You can always return to other methods by clicking the geolocation button in right-bottom corner';

  content.appendChild(descr);
  content.appendChild(alert);

  var buttonContainer = document.createElement('div');
  var geolocate = new ActionButton('Agree', 'mdc-button--raised');
  buttonContainer.appendChild(geolocate.root_);

  var markerDialog = new Dialog(content, buttonContainer, "Attention!");

  document.getElementById('map').appendChild(markerDialog.root_);
  markerDialog.open();
  markerDialog.scrimClickAction = '';
  markerDialog.escapeKeyAction = '';

  geolocate.listen('click',() => {
    markerDialog.close();
    position = new Position({lat: 44.494201, lng: 11.346477}, true);
    map.setCenter({lat: 44.494201, lng: 11.346477});
  });

  markerDialog.listen('MDCDialog:closing', function() {
  document.getElementById('map').removeChild(markerDialog.root_);
  });
}
