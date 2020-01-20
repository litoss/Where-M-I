var playlist = [];
var clip;
var place = -1;
var free = false;

function findClosestMarker(position){

    var nextLocation;
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

    var nextLocation = {
      marker: null,
      olc: null
    }

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

  if(playlist[place+1]){
    place++;
    clip=0;
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

function play(){
  var nextLocation = findClosestMarker(map.position);
  if(getDistance(map.position, nextLocation.marker) < 0.002){
    newPlayer(places[playlist[place]][clip].id.videoId);
  }else{
    alert('Non ci sono luoghi nelle vicinanze su cui riprodurre clip');
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
