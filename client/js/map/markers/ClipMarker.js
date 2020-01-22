class ClipMarker {
  constructor(videos){
    var searchButton = new IconButton('search','mdc-elevation--z2 mdc-image__circular mdc-button--raised');
    var directionButton = new IconButton('navigation','mdc-elevation--z2 mdc-image__circular mdc-button--raised');

    var card = new Card(videos[0].snippet.title, null, videos.length + " Clips", null, [searchButton.root_], [directionButton.root_], 'infoWindow-card');

    this.infoWindow = new google.maps.InfoWindow({
      content: card.root_,
      maxWidth: 400,
    });

    var latLng = decodeOlc(videos[0].olc);

    this.marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: videos[0].olc,
      icon: {
        url: 'content/music.svg',
        scaledSize: new google.maps.Size(24, 24),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(12, 12)
    }});

    this.marker.addListener('click', () => {
      this.infoWindow.open(map, this.marker);
    });

    directionButton.listen('click', () => {
      this.infoWindow.close();
      if(position.getPosition()){
        drivingDirections(position, this.marker);
      }else{
        var snackbar = new SnackBar('Geolocalization is not active');
        snackbar.open();
      }
    });

    searchButton.listen('click', () => {
        if(profile) {
          selectPlace(this.marker.getPosition());
        }else {
          var snackbar = new SnackBar('You must be logged to use this function');
          snackbar.open();
        }
    });

    card.primaryAction.addEventListener('click',() => {
      clipDrawer(video[0].olc, videos);
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
