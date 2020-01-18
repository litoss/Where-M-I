function openMarker() {

  var content = document.createElement('div');
  var descr = document.createElement('h3');
  descr.innerHTML = 'You can set your position by moving the appropriate marker created on the map';

  var alert = document.createElement('h4');
  alert.innerHTML = 'You can always return to other methods by clicking the geolocation button in right-bottom corner';

  content.appendChild(descr);
  content.appendChild(alert);

  var buttonContainer = document.createElement('div');
  var geolocate = new ActionButton('Insert Marker', 'mdc-button--raised');
  var back = new ActionButton('back');

  buttonContainer.appendChild(back.root_);
  buttonContainer.appendChild(geolocate.root_);

  var markerDialog = new Dialog(content, buttonContainer, "Attention!");

  document.getElementById('map').appendChild(markerDialog.root_);
  markerDialog.open();
  markerDialog.scrimClickAction = '';
  markerDialog.escapeKeyAction = '';

  geolocate.listen('click',() => {
    markerDialog.close();
    map.draggableMarker = new DraggableMarker();
  });

  back.listen('click', () => {
    markerDialog.close();
    openGeocode();
  });

  markerDialog.listen('MDCDialog:closing', function() {
  document.getElementById('map').removeChild(markerDialog.root_);
  });
}
