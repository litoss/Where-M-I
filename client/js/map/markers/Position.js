class Position {
  constructor(position, draggable){

    var icon = {
      url: "content/confusedTravolta.svg",
      anchor: new google.maps.Point(25,50),
      scaledSize: new google.maps.Size(50,50)
    }

    this.marker = new google.maps.Marker({
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: position,
      icon: icon
    });

    this.circle = new google.maps.Circle({
      clickable: false,
      fillColor: '#4285f4',
      fillOpacity: 0.125,
      strokeColor: '#4285f4',
      strokeOpacity: 0.25
    });

    var addPlace = new IconButton('add');
    var addClip = new IconButton('mic');

    this.infoWindow = new google.maps.InfoWindow({
        content: new Card(yourPlace.title, null, yourPlace.description, null, [addPlace.root_, addClip.root_], null, 'infoWindow-card').root_,
        maxWidth: 600
    });

    this.circle.bindTo("position", this.marker, "center");

    updateMap(this.marker.position);
    updateAfterTimeOut();

    this.marker.addListener("click", () => {
      this.infoWindow.open(map,this.marker);
    })

    addPlace.listen('click', () => {
      if(profile){
        var latLng = new google.maps.LatLng({lat: this.marker.getPosition().lat(), lng: this.marker.getPosition().lng()});
        selectPlace(latLng);
      }else{
        var snackbar = new SnackBar('You must be logged to use this function');
        snackbar.open();
      }
    });

    addClip.listen('click', () => {
      if(profile){
        var olc = OpenLocationCode.encode(this.marker.getPosition().lat(), this.marker.getPosition().lng(), OpenLocationCode.CODE_PRECISION_NORMAL);
        addClipDrawer(olc);
      }else{
        var snackbar = new SnackBar('You must be logged to use this function');
        snackbar.open();
      }
    });

    google.maps.event.addListener(this.marker, 'dragend', function(marker) {
      map.setCenter(marker.latLng);
      updateMap(marker.latLng);
    });
  }

  setAccuracy(accuracy){
    this.circle.setMap(map);
    this.circle.setRadius(accuracy);
  }

  removeAccuracy(){
    this.circle.setMap(null);
  }

  getMap(){
    return this.marker.getMap();
  }

  getPosition(){
    return this.marker.getPosition();
  }

  setPosition(latLng){
    this.marker.setMap(map);
    this.marker.setPosition(latLng);
    updateMap(latLng);
  }

  remove(){
    this.marker.setMap(null);
    this.circle.setMap(null);
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
