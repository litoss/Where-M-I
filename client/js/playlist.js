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
  player.forward.root_.disabled = false;
  playlist = [];
  place = -1;
  next();
}

function next(){
  place++;

  if(!playlist[place] && free){
    var location = searchNextPlace(position);
    if(location.marker){
      playlist.push(location.olc);
    }else{
      place--;
      var snackbar = new SnackBar('There are no places nearby');
      snackbar.open();
      return;
    }
  }

  if(place == 0){
    player.back.root_.disabled = true;
  }else{
    player.back.root_.disabled = false;
  }
  if(place == playlist.length-1 && !free){
    player.forward.root_.disabled = true;
  }
  drivingDirections(position, getMarkerByOlc(playlist[place]));
}


function previous(){
  place--;
  player.forward.root_.disabled = false;
  if(place == 0){
    player.back.root_.disabled = true;
  }
  drivingDirections(position, getMarkerByOlc(playlist[place]));
}

function wheremi(button){
  var marker = findClosestMarker(position);
  if(marker.olc && places[marker.olc].length){
    clipList = places[marker.olc];

    if(marker.olc != currentPlace){
      clip = 0;
      currentPlace = marker.olc;
    }

    if(clip != clipList.length-1){
      player.nextButton.root_.disabled = false;
    }

    if(getCurrentPlayer() != clipList[clip].id.videoId){
      newPlayer(clipList[clip].id.videoId);
      addButton(button);
    }else{
      playPause();
    }
  }else{
    var snackbar = new SnackBar('There are no clips nearby.');
    snackbar.open();
  }
}

function more(button){
  clip++;
  if(clip == clipList.length-1){
    player.nextButton.root_.disabled = true;
  }
  newPlayer(clipList[clip].id.videoId, button);
}
