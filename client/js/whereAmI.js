var playlistClip = [];
var playlistPlace = [];
var currentClip;
var currentPlace = -1;
var distance;

function findClosestMarker(lat, lng){

    var minDistance = 10000;
    var minMarker;

    for(var i=0; i<map.places.length; i++){
      //Se il posto non è nella playlist
      if(!playlistPlace.includes(map.places[i])){
        var distance = getDistance(lat, map.places[i].getPosition().lat(), lng, map.places[i].getPosition().lng());

        if(distance < minDistance){
          minMarker = i;
          minDistance = distance;
        }
      }
    }

    if(!minMarker) return null;
    return map.places[minMarker];
}

function start(){
  next();
  if(playlistPlace[currentPlace]){
    pla();
  }
}

function next(){
  currentPlace++;
  if(!playlistPlace[currentPlace]){
    var marker = findClosestMarker(map.position.getPosition().lat(), map.position.getPosition().lng());
    if(!marker){
      alert('Non ci sono audio nelle vicinanze');
    }else{
      playlistPlace.push(marker);
      search(playlistPlace[currentPlace]);
    }
  }else{
    search(playlistPlace[currentPlace]);
  }
}

function search(marker){
  var olc = OpenLocationCode.encode(marker.getPosition().lat(), marker.getPosition().lng(), OpenLocationCode.CODE_PRECISION_NORMAL)
  var response = searchClips(olc, null, preferences.language, preferences.category, preferences.audience);

  if(!response.lenght){
    next();
  }else{
    alert("ciao");
    playlistClip = response;
    currentClip = 0;
  }
}

function previous(){
  currentPlace--;
  search(playlistPlace[currentPlace]);
}

function pla(){
  newPlayer(playlistClip[currentClip].id);
}

function more(){
  if(currentClip < playlistClip-1)
    currentClip++;
}
