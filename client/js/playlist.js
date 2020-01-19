var playlist = [];
var clip;
var place = -1;
var free = false;

function findClosestMarker(position){

    var distance = 10000;
    var marker;

    for(var i in markerPlaces){
      var olc = OpenLocationCode.encode(markerPlaces[i].getPosition().lat(), markerPlaces[o].getPosition().lng(), OpenLocationCode.CODE_PRECISION_NORMAL)
      if(!playlist.includes(olc)){
        if(getDistance(position.getPosition(), markerPlaces[i].getPosition()) < distance){
          marker = markerPlaces[i];
          distance = distance;
        }
      }
    }

    if(!marker) return null;
    else return OpenLocationCode.encode(marker.getPosition().lat(), marker.getPosition().lng(), OpenLocationCode.CODE_PRECISION_NORMAL);
}

function start(){
  openSelectPaths();
}

function next(){

  if(playlist[place+1]){
    place++;
    clip=0;
  }else if(free){
    var olc = findClosestMarker(map.position);
    if(olc){
      playlist.push(olc);
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
  console.log(places[playlist[place]]);
  newPlayer(places[playlist[place]][clip].id.videoId);
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
