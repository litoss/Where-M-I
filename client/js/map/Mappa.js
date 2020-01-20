var area = [];
var places = [];
var pathList = [];
var markerPlaces = [];
var markerClips = [];

var markerCluster;

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
    this.player = new Player();
    this.pageDrawer;

    this.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(this.player.root_);
    this.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(new Zoom(-1).root_);
    this.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(new Zoom(1).root_);
    this.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(this.geolocation.root_);
    this.controls[google.maps.ControlPosition.TOP_LEFT].push(this.topBar.topBar.root_);

    this.marker;

    this.directionsService = new google.maps.DirectionsService;
    this.directionsRenderer = new google.maps.DirectionsRenderer({map: this, preserveViewport: true, suppressMarkers: true});

    this.addListener('click', (event) => {
      this.clickOnMap(event);
    });
    openWelcome();
  }

  clickOnMap(event){
    if(!this.closeAllWindow()) {
    }
  }

  updateMap(position){
    var approx = 0.04;
    for(var i=-1;i<=1;i++){
      for(var j=-1;j<=1;j++){
        var olc = OpenLocationCode.encode(position.lat() + (i*approx) , position.lng() + (j*approx), 6);
        if(!area.includes(olc)){
          area.push(olc);
          this.addPlace(olc);
        }
      }
    }
  }

  closeAllWindow(){
    var close = 0;

    for(var i in markerPlaces) if(markerPlaces[i].isWindowOpen()){
       markerPlaces[i].closeWindow();
       close = 1;
    }

    return close;
  }

  addPlace(olc){
    getPlaces(olc.substring(0,6)).then((response) => {
      for(var i in response){
        places.push(response[i]);
        places[response[i].OLC] = [];
        markerPlaces.push(new Place(response[i]));
      }
      this.addPaths(olc);
      this.addClips(olc);
    });
  }

  addClips(olc){
    getClips(olc).then((clips) => {

      for(var i in clips){
        if(!places[clips[i].olc]){
          places[clips[i].olc] = [];
        }
        places[clips[i].olc].push(clips[i]);
      }

      var filter = filterClips(clips, preferences.language, preferences.category, preferences.audience);

      var array = [];
      for(var i in filter)
        if(!array.includes(filter[i].olc)){
          markerClips.push(new ClipMarker(places[filter[i].olc]));
          array.push(filter[i].olc);
        }
      markerCluster = new MarkerClusterer(this, markerClips.concat(markerPlaces));
    });
  }

  addPaths(olc){
    getPaths(olc.substring(0,6)).then((response) => {
      for(var i in response){
        pathList.push(response[i]);
      }
    });
  }
}
