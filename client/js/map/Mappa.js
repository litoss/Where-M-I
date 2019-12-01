class Mappa extends google.maps.Map{
  constructor() {

    var position = {lat: 44.494201, lng: 11.346477};

    super(document.getElementById('map'), {
      center: position,
      zoom: 15,
      disableDefaultUI: true,
      styles: [{
        "featureType": "poi",
        "stylers": [{
          "visibility": "off"
        }]
      }]
    });

    this.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomLessButton.root_);
    this.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomPlusButton.root_);
    this.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(geolocatorButton.root_);
    this.controls[google.maps.ControlPosition.TOP_LEFT].push(menuButton.root_);

    this.placeWindow = new PlaceWindow();
    this.unknownPlaceWindow = new UnknownPlaceWindow();
    this.unknownMarker = new PlaceMarker('content/nearby.svg');

    this.addListener('click', function(e) {

      if(this.unknownMarker.getMap()) this.unknownMarker.setMap(null);
      else if(this.placeWindow.getMap()) this.placeWindow.setMap(null);
      else if(this.unknownPlaceWindow.getMap()) this.placeWindow.setMap(null);
      else{
         this.unknownMarker.setMap(map);
         this.unknownMarker.setPosition(e.latLng);
         this.unknownPlaceWindow.open(map, this.unknownMarker);
      }
    });

    this.updateMap(position);
  }

  updateMap(position){
    var olc = OpenLocationCode.encode(position.lat, position.lng, OpenLocationCode.CODE_PRECISION_EXTRA);
    var area = olc.substring(0, 4);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/find');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = this.addPlace;
    xhr.send(JSON.stringify({OLC: area}));
  }

  addPlace(){
    var response = JSON.parse(this.responseText);
    var places = [];
    for(var i in response){
        var decode = OpenLocationCode.decode(response[i].OLC);
        var center = {lat: decode.latitudeCenter, lng: decode.longitudeCenter};

        places.push(new PlaceMarker('content/nearby.svg', center, map));

        var listener = function(j){
          places[j].addListener('click', function() {
            if(map.unknownMarker.getMap()) map.unknownMarker.setMap(null);
            var card = new CardTemp(response[j].name, null, response[j].description);
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


}
