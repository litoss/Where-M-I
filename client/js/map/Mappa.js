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

    //Controls inizialize
    this.zoomControl = new Zoom();
    this.geolocation = new Geolocation();
    this.topBar = new TopBar();
    this.player = new Player();

    this.menuDrawer = new MenuDrawer();
    this.pageDrawer;

    this.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(this.player);
    this.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(this.zoomControl.root_);
    this.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(this.geolocation);
    this.controls[google.maps.ControlPosition.TOP_LEFT].push(this.topBar.topBar.root_);
    this.noPlace = new Place(luogoSconosciuto.title, luogoSconosciuto.media, luogoSconosciuto.description);
    this.places = [];
    this.position = new Position();

    this.directionsService = new google.maps.DirectionsService;
    this.directionsRenderer = new google.maps.DirectionsRenderer({map: this});

    this.addListener('click', (event) => {
      this.clickOnMap(event);
    });
    this.updateMap(position);
  }

  clickOnMap(event){
    if(this.noPlace.getMap()) {
      this.noPlace.removePosition();
      if(map.pageDrawer) map.pageDrawer.open = false;
    }
    else if(this.noPlace.isWindowOpen()) this.noPlace.closeWindow();
    else{
      for(var i in this.places) if(this.places[i].isWindowOpen()){
           this.places[i].closeWindow();
           return;
      }
       this.noPlace.setPosition(event.latLng);
       this.noPlace.openWindow();
    }
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

  closeAllWindow(){

  }

  async addPlace(){
    var response = JSON.parse(this.responseText);
    for(var i in response){

        var decode = OpenLocationCode.decode(response[i].OLC);
        var center = {lat: decode.latitudeCenter, lng: decode.longitudeCenter};

        //image decoding from base64
        var image = decode64(response[i].image);
        
        map.places.push(new Place(response[i].name, image, response[i].description, null, center));
    }
  }

  getDistance(x1,x2,y1,y2){
    var deltaX = Math.abs(x1 - x2);
    var deltaY = Math.abs(y1 - y2)
    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  }

  findClosestMarker(){
    if(this.position.getMap()){
      var lat = this.position.getPosition().lat();
      var lng = this.position.getPosition().lng();

      var minDistance = this.getDistance(lat, this.places[0].getPosition().lat(), lng, this.places[0].getPosition().lng());
      var marker = 0;

      for(var i=1; i<this.places.length; i++){

        var distance = this.getDistance(lat, this.places[i].getPosition().lat(), lng, this.places[i].getPosition().lng());

        if(distance < minDistance){
          marker = i;
          distance = distance;
        }
      }

      if(minDistance) return this.places[marker];
      else return -1;

    }else{
    } //ERROR
  }
}
