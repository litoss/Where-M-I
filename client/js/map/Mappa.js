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
    this.geolocation = new Geolocation();
    this.topBar = new TopBar();
    this.menuDrawer = new MenuDrawer();
    this.audio = new Player();
    this.pageDrawer;


    this.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(this.audio);
    this.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(new Zoom(-1).root_);
    this.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(new Zoom(1).root_);
    this.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(this.geolocation.root_);
    this.controls[google.maps.ControlPosition.TOP_LEFT].push(this.topBar.topBar.root_);

    this.places = [];
    this.noPlace;
    this.position = new Position();
    this.draggableMarker;

    this.directionsService = new google.maps.DirectionsService;
    this.directionsRenderer = new google.maps.DirectionsRenderer({map: this});

    this.addListener('click', (event) => {
      this.clickOnMap(event);
    });
    openWelcome();
    this.updateMap(position);
  }

  clickOnMap(event){
    if(!this.closeAllWindow()) {
      this.noPlace = new Place();
      this.noPlace.setPosition(event.latLng);
      this.noPlace.openWindow();
    }
  }

  updateMap(position){
    var olc = OpenLocationCode.encode(position.lat, position.lng, OpenLocationCode.CODE_PRECISION_NORMAL);
    var area = olc.substring(0, 4);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/find_place');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = this.addPlace;
    xhr.send(JSON.stringify({OLC: area}));
  }

  closeAllWindow(){
    var close = 0;

    if(this.noPlace) {
      this.noPlace.removePosition();
      this.noPlace = null;
      close = 1;
    }

    for(var i in this.places) if(this.places[i].isWindowOpen()){
       this.places[i].closeWindow();
       close = 1;
    }

    return close;
  }

  addPlace(){
    var response = JSON.parse(this.responseText);
    for(var i in response){
       map.places.push(new Place(response[i]));
     }
  }
}
