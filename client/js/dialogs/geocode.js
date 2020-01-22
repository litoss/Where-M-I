function openGeocode() {

  var selectContent = document.createElement('div');
  var name = new TextField('City');
  var road = new TextField('road');
  var num = new TextField ('num');
  var search = new IconButton('search', 'mdc-button--raised mdc-image__circular');

  selectContent.appendChild(name.root_);
  selectContent.appendChild(road.root_);
  selectContent.appendChild(num.root_);
  selectContent.appendChild(search.root_);

  var other = document.createElement('h2');
  other.className = "mdc-dialog__title";
  other.innerHTML = "Other options: ";

  var footer = document.createElement('div');
  var geolocate = new ActionButton('Geolocate', 'mdc-button--raised');
  var selectOnMap = new ActionButton('Select on map', 'mdc-button--raised');

  footer.appendChild(other);
  footer.appendChild(geolocate.root_);
  footer.appendChild(selectOnMap.root_);

  var geocodeDialog = new Dialog(selectContent, footer, "Insert your location");

  document.getElementById('map').appendChild(geocodeDialog.root_);
  geocodeDialog.open();
  geocodeDialog.scrimClickAction = '';
  geocodeDialog.escapeKeyAction = '';

  search.listen('click', () => {
    var address = name.input.value + ' ' + road.input.value + ' ' + num.input.value;

    geocoder_geocode(address).then((result) => {
      if(!position) position = new Position(result, true);
      else{
        position.setPosition(result);
      }
      map.setCenter(result);
      geocodeDialog.close();
    }).catch(() => {
      var snackbar = new SnackBar('Please submit a valid Address');
      snackbar.open();
    });
  });

  geolocate.listen('click', () => {
    geocodeDialog.close();
    localize();
  });

  selectOnMap.listen('click', () => {
    geocodeDialog.close();
    openMarker();
  });

  geocodeDialog.listen('MDCDialog:closing', function() {
    document.getElementById('map').removeChild(geocodeDialog.root_);
  });
};
