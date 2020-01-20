var playlist = [];
var clip;
var place = -1;
var free = false;

function findClosestMarker(position){

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

function start(){
  openSelectPaths();
}

function next(){
  console.log(playlist);
  
  if(playlist[place+1]){
    place++;
    clip=0;
    drivingDirections(map.position, getMarkerByOlc(playlist[place]));
  }else if(free){
    var location = findClosestMarker(map.position);
    if(location.marker){
      playlist.push(location.olc);
      place++;
      clip=0;
    }else{
      alert('Non ci sono luoghi nelle vicinanze con clip inerenti alle tue preferenze');
    }
  }else{
    alert('Non ci sono altri luoghi in questa playlist');
  }
}

function play(button){

  if(!isNavigating()){
    if(places[playlist[place]].length){
      newPlayer(places[playlist[place]][clip].id.videoId, button);
    }else{
      alert('Non ci sono clip in questo punto di interesse');
    }
  }else{
    alert('Devi arrivare al tuo prossimo punto per ascoltare clip');
  }
}

function previous(){
  if(place > 0){
    place--;
  }else{
    alert('Non hai più altri posti indietro');
  }
}

function more(){
  if(clip < places[playlist[place]].length-1){
    clip++;
  }else{
    alert('Non ci sono più clip da riprodurre per questo luogo');
  }
}
