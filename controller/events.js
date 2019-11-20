//funzione che adatta il contenuto alla dimensione della finestra
window.addEventListener("resize", function() {
  if (window.innerWidth > 767){
    document.getElementById('scrim').className = "";
    if(!pageDrawer.open) mainDrawer.open = true;
  } else {
    document.getElementById('scrim').className = "mdc-drawer-scrim";
    mainDrawer.open = false;
  }
});

async function localize(event){

    if(event.detail.isOn){
      if (navigator.geolocation) {
          geolocator = navigator.geolocation.watchPosition(showPosition);
      } else {
          // Browser doesn't support Geolocation
      }
    }
    else{
      navigator.geolocation.clearWatch(geolocator);
      marker.setMap(null);
      circle.setMap(null);
    }
}


async function showPosition(position){

  if(!marker){

    var image = {
      url: 'content/geomarker.svg',
      scaledSize: new google.maps.Size(32, 32),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(16, 16)
    };

    marker = new google.maps.Marker({
      position: {lat: position.coords.latitude, lng: position.coords.longitude},
      map: map,
      icon: image
    });

    circle = new google.maps.Circle({
      center: {lat: position.coords.latitude, lng: position.coords.longitude},
      radius: position.coords.accuracy,
      map: map,
      clickable: false,
      fillColor: '#4285f4',
      fillOpacity: 0.125,
      strokeColor: '#4285f4',
      strokeOpacity: 0.25
    });

    map.setZoom(parseInt(Math.log2(591657550.5 / (circle.getRadius() * 45))) + 1);
    map.setCenter(marker.getPosition());

  }else{
    marker.setPosition({lat: position.coords.latitude, lng: position.coords.longitude});
    circle.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
    marker.setMap(map);
    circle.setMap(map);
  }
}

async function zoomOut(){
  if(map.getZoom() > 0) map.setZoom(map.getZoom()-1);
}

async function zoomIn(){
  if(map.getZoom() < 19) map.setZoom(map.getZoom()+1);
}

async function openMenuDrawer(){
  mainDrawer.open = true;
}
