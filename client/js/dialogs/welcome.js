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

  buttonContainer.appendChild(geolocate.root_);
  buttonContainer.appendChild(insert.root_);

  var welcomeDialog = new Dialog(content, buttonContainer, "Welcome to Where M I");

  document.getElementById('map').appendChild(welcomeDialog.root_);
  welcomeDialog.open();
  welcomeDialog.scrimClickAction = '';
  welcomeDialog.escapeKeyAction = '';

  geolocate.listen('click',() => {
    welcomeDialog.close();
    localize();
  });

  insert.listen('click', () => {
    var selectContent = document.createElement('div');
    var name = new TextField('City');
    var road = new TextField('road');
    var num = new TextField ('num');

    selectContent.appendChild(name.root_);
    selectContent.appendChild(road.root_);
    selectContent.appendChild(num.root_);

    var footer = document.createElement('div');
    var selectOnMap = new ActionButton('Select on map');
    var back = new ActionButton('Back');
    var add = new IconButton('add');

    footer.appendChild(add.root_);
    footer.appendChild(selectOnMap.root_);
    footer.appendChild(back.root_);

    welcomeDialog.setContent(selectContent);
    welcomeDialog.setTitle('Add informations');
    welcomeDialog.setFooter(footer);

    add.listen('click', () => {
      var address = name.input.value + ' ' + road.input.value + ' ' + num.input.value;
      var geocoder = new google.maps.Geocoder;
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var latLng = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
          map.position.setPosition(latLng);
          map.setCenter(latLng);
          welcomeDialog.close();
        } else {
          console.log(status);
          alert('Please submit a valid address');
        }
      });
    })

    selectOnMap.listen('click', () => {
      welcomeDialog.close();
      var draggableMarker = new DraggableMarker();
    })

    back.listen('click', () => {
      welcomeDialog.close();
      openWelcome();
    })
  });

  welcomeDialog.listen('MDCDialog:closing', function() {
  document.getElementById('map').removeChild(welcomeDialog.root_);
  });
}
