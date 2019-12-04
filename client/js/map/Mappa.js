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
    this.zoomBo = new Zoom();
    this.geolocation = new Geolocation();
    this.topBar = new TopBar();
<<<<<<< HEAD
    this.menuDrawer = new MenuDrawer();
    this.pageDrawer;
=======
    this.player = new Player();
>>>>>>> cadeddbe940521a39e429c9534a44209bd8c12c3

    //document.body.appendChild(this.player);
    this.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(this.player);
    this.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(this.zoomBo);
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
    if(this.noPlace.getMap()) this.noPlace.removePosition();
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

  addPlace(){
    var response = JSON.parse(this.responseText);
    for(var i in response){
        var decode = OpenLocationCode.decode(response[i].OLC);
        var center = {lat: decode.latitudeCenter, lng: decode.longitudeCenter};

        map.places.push(new Place(response[i].name, null, response[i].description, null, center, map));
    }
  }
}
