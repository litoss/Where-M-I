class DraggableMarker {
  constructor(){
    var position = {lat: 44.494201, lng: 11.346477};

    var icon = {
      url: "content/confusedTravolta.svg",
      anchor: new google.maps.Point(25,50),
      scaledSize: new google.maps.Size(50,50)
    }

    var marker = new google.maps.Marker({
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: position,
      icon: icon
    });

    google.maps.event.addListener(marker, 'dragend', function(marker) {
      var latLng = marker.latLng;
      map.position.setPosition(latLng);
      map.setCenter(latLng);
    });


    var message = document.createElement('h4');
    message.innerHTML = 'Please drag me to set your position';
    var infowindow = new google.maps.InfoWindow({
      content: message
    });

    setTimeout(function(){
      infowindow.open(map, marker); }, 600);

  google.maps.event.addListener(marker, 'drag', function(marker) {
      infowindow.close();
  });

  this.marker = marker;
}
}
