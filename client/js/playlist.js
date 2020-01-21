var playlist = [];
var place;
var free = false;
var clipList = [];
var clip;
var currentPlace;

function searchNextPlace(position){

    var nextLocation = {};
    var distance = 1000;

    for(var i in markerPlaces){
      var olc = OpenLocationCode.encode(markerPlaces[i].getPosition().lat(), markerPlaces[i].getPosition().lng(), OpenLocationCode.CODE_PRECISION_NORMAL)
      if(!playlist.includes(olc)){
        var newDistance = getDistance(position.getPosition(), markerPlaces[i].getPosition());
        if(newDistance < distance){
          nextLocation.olc = olc;
          nextLocation.marker = markerPlaces[i];
          distance = newDistance;
        }
      }
    }

    return nextLocation;
}

function findClosestMarker(position){

    var closest = {};
    var distance = 0.0004;

    for(var i in markerPlaces){
      var olc = OpenLocationCode.encode(markerPlaces[i].getPosition().lat(), markerPlaces[i].getPosition().lng(), OpenLocationCode.CODE_PRECISION_NORMAL)
      var newDistance = getDistance(position.getPosition(), markerPlaces[i].getPosition());
      if(newDistance < distance){
        closest.olc = olc;
        closest.marker = markerPlaces[i];
        distance = newDistance;
      }
    }

    for(var i in markerClips){
      var olc = OpenLocationCode.encode(markerClips[i].getPosition().lat(), markerClips[i].getPosition().lng(), OpenLocationCode.CODE_PRECISION_NORMAL)
      var newDistance = getDistance(position.getPosition(), markerClips[i].getPosition());
      if(newDistance < distance){
        closest.olc = olc;
        closest.marker = markerClips[i];
        distance = newDistance;
      }
    }

    return closest;
}

function start(){
  map.player.forward.root_.disabled = false;
  playlist = [];
  place = -1;
  next();
}

function next(){
  place++;

  if(!playlist[place] && free){
    var location = searchNextPlace(map.position);
    if(location.marker){
      playlist.push(location.olc);
    }else{
      alert('Non ci sono luoghi da visitare in modalità libera');
    }
  }

  if(place == 0){
    map.player.back.root_.disabled = true;
  }else{
    map.player.back.root_.disabled = false;
  }
  if(place == playlist.length-1 && !free){
    map.player.forward.root_.disabled = true;
  }

  drivingDirections(map.position, getMarkerByOlc(playlist[place]));
}


function previous(){
  place--;
  map.player.forward.root_.disabled = false;
  if(place == 0){
    map.player.back.root_.disabled = true;
  }
  drivingDirections(map.position, getMarkerByOlc(playlist[place]));
}

function wheremi(button){
  var marker = findClosestMarker(map.position);
  if(marker && places[marker.olc]){
    clipList = places[marker.olc];
    //clipList = orderClips(places[location.olc])
    if(marker.olc != currentPlace){
      clip = 0;
      currentPlace = marker.olc;
    }

    if(clip != clipList.length-1){
      map.player.nextButton.root_.disabled = false;
    }

    if(getCurrentPlayer() != clipList[clip].id.videoId){
      newPlayer(clipList[clip].id.videoId, button);
    }else{
      playPause();
    }
  }else{
    alert("terrore");
  }
}

function more(button){
  clip++;
  if(clip == clipList.length-1){
    map.player.nextButton.root_.disabled = true;
  }
  newPlayer(clipList[clip].id.videoId, button);
}
