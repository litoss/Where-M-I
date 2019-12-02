class Position{
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

    this.infoWindow = new google.maps.InfoWindow({
          content: new CardTemp(yourPlace.title, yourPlace.description).root_,
          maxWidth: 400,
    });

    this.marker.bindTo("position", this.circle, "center");
    this.marker.addListener("click", () => {
      this.infoWindow.open(map,this.marker);
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
    this.marker.getMap();
  }

  getPosition(){
    return this.marker.getPosition();
  }

  setPosition(latLng){
    this.marker.setMap(map);
    this.marker.setPosition(latLng);
  }

  removePosition(){
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
