class PositionMarker{
  constructor(){
    this.point = new google.maps.Marker({
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

    this.infoWindow = new YourPosition();
    this.point.bindTo("position", this.circle, "center");
    this.point.addListener("click", () => {
      this.infoWindow.open(map,this.point);
    })
  }

  setAccuracy(accuracy){
    this.circle.setMap(map);
    this.circle.setRadius(accuracy);
  }

  removeAccuracy(){
    this.circle.setMap(null);
  }

  setPosition(latLng){
    this.point.setMap(map);
    this.point.setPosition(latLng);
  }

  removePosition(){
    this.point.setMap(null);
    this.circle.setMap(null);
  }
}
