class Place {
  constructor(place){

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
      description = place.description;
      image = decode64(place.image);

    }else{

        var searchButton = new IconButton('search','mdc-elevation--z2 mdc-image__circular mdc-button--raised');
        leftButtonList.push(searchButton.root_);


      name = luogoSconosciuto.title;
      description = luogoSconosciuto.description;
      image = luogoSconosciuto.media;
    }

    var directionButton = new IconButton('navigation','mdc-elevation--z2 mdc-image__circular mdc-button--raised');
    var positionButton = new IconButton('person_pin','mdc-elevation--z2 mdc-image__circular mdc-button--raised');

    rightButtonList.push(directionButton.root_);
    rightButtonList.push(positionButton.root_);

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

    positionButton.listen('click', () => {
      map.position.setPosition(this.marker.getPosition());
      this.removePosition();
    });

    if(place){
      card.primaryAction.addEventListener('click',() => {
        if(!map.pageDrawer) selectedPlace(place);
        else map.pageDrawer.open = false;
      });
      leftButtonList[0].addEventListener('click', () => {
        var card = new Card(name, null, description, image, null, null, 'about-card');
        if(profile) createEditDialog(place);
        else alert('You must be logged in to use this function');
      });
    }else{
      leftButtonList[0].addEventListener('click', () => {
        if(profile) selectPlace(this.marker.getPosition());
        else alert('You must be logged in to use this function');
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
      window.alert('Non hai la geolocalizzazione attiva');
    }
  }

  getPosition(){
    return this.marker.getPosition();
  }

  getMap(){
    return this.marker.getMap();
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

  /*
  var listener = function(j){
    map.places[j].addListener('click', function() {
      if(map.unknownMarker.getMap()) map.unknownMarker.setMap(null);
      var card = new Card(, null, );
      map.placeWindow.setContent(card);
      map.placeWindow.open(map, places[j]);

      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://texttospeech.googleapis.com/v1/text:synthesize');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = this.reproduceImmersiveSound;
      xhr.send(JSON.stringify({
"audioConfig": {
"audioEncoding": "LINEAR16",
"pitch": 0,
"speakingRate": 3.85
},
"input": {
"text": "Google Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variants. It applies DeepMind’s groundbreaking research in WaveNet and Google’s powerful neural networks to deliver the highest fidelity possible. As an easy-to-use API, you can create lifelike interactions with your users, across many applications and devices."
},
"voice": {
"languageCode": "it-IT",
"name": "it-IT-Standard-A"
}
}));
    });
  }

  listener(i);
}
}

reproduceImmersiveSound(){
var response = JSON.parse(this.responseText);
console.log(response);
}
*/
}
