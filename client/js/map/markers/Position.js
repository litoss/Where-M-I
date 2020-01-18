class Position {
  constructor(){
    this.marker = new google.maps.Marker({
      icon: {
        url: 'content/geomarker.svg',
        scaledSize: new google.maps.Size(32, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 16)
    }});

    this.circle = new google.maps.Circle({
      clickable: false,
      fillColor: '#4285f4',
      fillOpacity: 0.125,
      strokeColor: '#4285f4',
      strokeOpacity: 0.25
    });

    var search = new IconButton('search');

    this.infoWindow = new google.maps.InfoWindow({
        content: new Card(yourPlace.title, null, yourPlace.description, null, [search.root_]).root_,
        maxWidth: 600
    });

    this.marker.bindTo("position", this.circle, "center");
    this.marker.addListener("click", () => {
      this.infoWindow.open(map,this.marker);
    })

    search.listen('click', () => {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/find_place');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = this.addPlace;
      xhr.send(JSON.stringify({OLC: area}));
    })
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
    map.updateMap(latLng);
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
