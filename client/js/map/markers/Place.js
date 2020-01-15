class Place {
  constructor(place){

    this.place = place;
    var rightButtonList = [];
    var leftButtonList = [];
    var latLng = null;
    var name;
    var description;
    var image;

    if(place){
      var editButton = new IconButton('edit','mdc-elevation--z2 mdc-image__circular mdc-button--raised');
      leftButtonList.push(editButton.root_);

      var decode = OpenLocationCode.decode(place.OLC);
      latLng = {lat: decode.latitudeCenter, lng: decode.longitudeCenter};
      name = place.name;
      if(place.description.length > 80) description = place.description.substring(0,80)+"...";
      else description = place.description;
      image = decode64(place.image, "image/jpg");

    }else{

        var searchButton = new IconButton('search','mdc-elevation--z2 mdc-image__circular mdc-button--raised');
        leftButtonList.push(searchButton.root_);


      name = luogoSconosciuto.title;
      description = luogoSconosciuto.description;
      image = luogoSconosciuto.media;
    }

    var directionButton = new IconButton('navigation','mdc-elevation--z2 mdc-image__circular mdc-button--raised');

    rightButtonList.push(directionButton.root_);

    var card = new Card(name, null, description, image, leftButtonList, rightButtonList, 'infoWindow-card');

    this.infoWindow = new google.maps.InfoWindow({
      content: card.root_,
      maxWidth: 400,
    });

    this.marker = new google.maps.Marker({
      position: latLng,
      map: map,
      icon: {
        url: 'content/nearby.svg',
        scaledSize: new google.maps.Size(24, 24),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(12, 12)
    }});

    directionButton.listen('click', () => {
      this.showDirection();
    });

    this.marker.addListener('click', () => {
      this.infoWindow.open(map, this.marker);
    });

    if(place){
      card.primaryAction.addEventListener('click',() => {
          selectedPlace(place);
      });
      leftButtonList[0].addEventListener('click', () => {
        var card = new Card(name, null, description, image, null, null, 'about-card');
        if(profile) createEditDialog(place);
        else {
          var snackbar = new SnackBar('You must be logged to use this function');
          snackbar.open();
          snackbar.listen("MDCSnackbar:closed",() => {
            document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
          });
        }
      });
    }else{
      leftButtonList[0].addEventListener('click', () => {
        if(profile) {selectPlace(this.marker.getPosition())}
        else {
          var snackbar = new SnackBar('You must be logged to use this function');
          snackbar.open();
          snackbar.listen("MDCSnackbar:closed",() => {
            document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
          });
        }
      });
    }
  }


  showDirection(){
    if(map.position.getPosition()){
        map.directionsService.route({
          origin: map.position.getPosition(),
          destination: this.marker.getPosition(),
          travelMode: 'WALKING'
        }, function(response, status) {
          // Route the directions and pass the response to a function to create
          // markers for each step.
          if (status === 'OK') {
            map.directionsRenderer.setDirections(response);
            console.log(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
    }else{
      //Non hai la geolocalizzazione attiva!
      var snackbar = new SnackBar('Geolocalization is not active');
      snackbar.open();
      snackbar.listen("MDCSnackbar:closed",() => {
        document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
      });
    }
  }

  getPosition(){
    return this.marker.getPosition();
  }

  getMap(){
    return this.marker.getMap();
  }

  setMap(map){
    this.marker.setMap(map);
  }

  setPosition(position){
    this.marker.setPosition(position);
    this.marker.setMap(map);
  }

  removePosition(){
    this.marker.setMap(null);
    this.infoWindow.setMap(null);
  }

  isWindowOpen(){
    if(this.infoWindow.getMap()) return true;
    else return false;
  }

  closeWindow(){
    this.infoWindow.close();
  }

  openWindow(){
    this.infoWindow.open(map, this.marker);
  }
}
