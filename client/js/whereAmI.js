var playlistClip = [];
var playlistPlace = [];
var currentClip;
var currentPlace = -1;
var distance;

function findClosestMarker(marker){

    var minDistance = 10000;
    var minMarker;

    for(var i=0; i<map.places.length; i++){
      //Se il posto non è nella playlist
      if(!playlistPlace.includes(map.places[i])){
        var distance = getDistance(marker, map.places[i]);

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
    var distance = getDistance(map.position, playlistPlace[currentPlace]);
    if(distance < 0.0002){
      play();
    }else {
      drivingDirections(map.position, playlistPlace[currentPlace]);
    }
  }
}

function next(){
  currentPlace++;
  if(!playlistPlace[currentPlace]){
    var marker = findClosestMarker(map.position);
    if(!marker){
      alert('Non ci sono luoghi nelle vicinanze con clip inerenti alle tue preferenze');
    }else{
      playlistPlace.push(marker);
      console.log(playlistPlace[currentPlace]);

      search(playlistPlace[currentPlace]);
    }
  }else{
    console.log(playlistPlace[currentPlace]);
    search(playlistPlace[currentPlace]);
  }
}

function search(marker){
  var olc = OpenLocationCode.encode(marker.getPosition().lat(), marker.getPosition().lng(), OpenLocationCode.CODE_PRECISION_NORMAL)
  var response = searchClips(olc, null, preferences.language, preferences.category, preferences.audience);

  if(!response.lenght){
    next();
  }else{
    playlistClip = response;
    currentClip = 0;
  }
}

function play(){
  newPlayer(playlistClip[currentClip].id);
}

function previous(){
    if(currentPlace > 0){
    currentPlace--;
    search(playlistPlace[currentPlace]);
  }
}

function more(){
  if(currentClip < playlistClip-1)
    currentClip++;
}
