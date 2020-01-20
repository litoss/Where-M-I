class Place {
  constructor(place){

    var editButton = new IconButton('edit','mdc-elevation--z2 mdc-image__circular mdc-button--raised');
    var directionButton = new IconButton('navigation','mdc-elevation--z2 mdc-image__circular mdc-button--raised');

    var description;
    if(place.description.length > 80){
      description = place.description.substring(0,80)+"...";
    }else{
      description = place.description;
    }

    var card = new Card(place.name, null, place.description, decode64(place.image, "image/jpg"), [editButton.root_], [directionButton.root_], 'infoWindow-card');

    this.infoWindow = new google.maps.InfoWindow({
      content: card.root_,
      maxWidth: 400,
    });

    if(!place.category) var icon = 'content/location_city.svg';
    else {
      for(var i in categories){
        if(categories[i].id == place.category){
          var icon = categories[i].icon;
        }
      }
    }

    this.marker = new google.maps.Marker({
      position: decodeOlc(place.OLC),
      map: map,
      title: place.name,
      icon: {
        url: icon,
        scaledSize: new google.maps.Size(24, 24),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(12, 12)
    }});

    directionButton.listen('click', () => {
      if(map.position.getPosition()){
        drivingDirections(map.position, this.marker);
      }else{
        var snackbar = new SnackBar('Geolocalization is not active');
        snackbar.open();
      }
    });

    this.marker.addListener('click', () => {
      this.infoWindow.open(map, this.marker);
    });

    card.primaryAction.addEventListener('click',() => {
        selectedPlace(place);
    });

    editButton.listen('click', () => {
      if(profile){
        createEditDialog(place);
      }else{
        var snackbar = new SnackBar('You must be logged to use this function');
        snackbar.open();
      }
    });
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
