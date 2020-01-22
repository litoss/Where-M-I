var area = [];
var places = [];
var pathList = [];
var markerPlaces = [];
var markerClips = [];
var markerCluster;
var timeout;
var map;

var geolocation, position, topBar, menuDrawer, player, pageDrawer;
function initMap(){

  var position = {lat: 44.494201, lng: 11.346477};

  map = new google.maps.Map(document.getElementById('map'), {
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
  geolocation = new Geolocation();
  topBar = new TopBar();
  menuDrawer = new MenuDrawer();
  player = new Player();

  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(player.root_);
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(new ZoomL().root_);
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(new ZoomP().root_);
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(geolocation.root_);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(topBar.topBar.root_);

  openWelcome();
  geocoder_init();
  directions_init();
}

function clickOnMap(event){
  if(!closeAllWindow()) {
  }
}

function updateMap(position){
  var approx = 0.04;
  for(var i=-1;i<=1;i++){
    for(var j=-1;j<=1;j++){
      var olc = OpenLocationCode.encode(position.lat() + (i*approx) , position.lng() + (j*approx), 6);
      if(!area.includes(olc)){
        area.push(olc);
        addPlace(olc);
      }
    }
  }
}

function closeAllWindow(){
  var close = 0;

  for(var i in markerPlaces) if(markerPlaces[i].isWindowOpen()){
     markerPlaces[i].closeWindow();
     close = 1;
  }

  return close;
}

function addPlace(olc){
  getPlaces(olc.substring(0,6)).then((response) => {
    for(var i in response){
      places[response[i].OLC] = [];
      markerPlaces.push(new Place(response[i]));
    }
    addPaths(olc);
    addClips(olc);
  });
}

function addClips(olc){
  getClips(olc).then((clips) => {
    var filter = filterClips(clips, preferences.language, preferences.category, preferences.audience);

    var array = [];
    for(var i in filter){
      if(!places[filter[i].olc]){
        places[filter[i].olc] = [];
        array.push(filter[i].olc);
      }
      places[filter[i].olc].push(filter[i]);
    }

    for(var i in array){
      markerClips.push(new ClipMarker(places[array[i]]));
    }

    markerCluster = new MarkerClusterer(map, markerClips.concat(markerPlaces));
  });
}

function addPaths(olc){
  getPaths(olc.substring(0,6)).then((response) => {
    for(var i in response){
      pathList.push(response[i]);
    }
  });
}

function updateAfterTimeOut(){
  var timer = (preferences.refreshTime*60)*1000;
  timeout = setTimeout(function(){
    clear();
    updateMap(position.marker.position);
    clearTimeout(timeout);
    updateAfterTimeOut();
  }, timer);
}

function clear(){
  area = [];
  places = [];

  for(var i in markerPlaces){
    markerPlaces[i].setMap(null);
  }
  markerPlaces = [];

  for(var i in markerClips){
    markerClips[i].setMap(null);
  }
  markerClips = [];
  pathList = [];

  markerCluster.clearMarkers();
}
