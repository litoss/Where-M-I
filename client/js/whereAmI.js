var playlist = [];
var position = 0;
var distance;

async function start(){
  while(marker){
    playlist.push(marker);
    var marker = await findClosestMarker(marker.getPosition().lat(), marker.getPosition().lng());
  }

  console.log(playlist);
  if(playlist.lenght){} //Non ci sono posti intorno a te!
}

async function findClosestMarker(lat, lng){

    var minDistance = 10000;
    var minMarker = null;

    for(var i=0; i<map.places.length; i++){

      //Se il posto non è nella playlist
      if(!playlist.includes(map.places[i])){

        var distance = getDistance(lat, map.places[i].getPosition().lat(), lng, map.places[i].getPosition().lng());

        if(distance < minDistance){
          minMarker = i;
          minDistance = distance;
        }
      }
    }

    return map.places[minMarker];
}

async function whereAmi(){
  var marker;
  if(!playlist[position]){
    marker = await findClosestMarker(map.position.getPosition().lat(), map.position.getPosition().lng());
    playlist.push(marker);

    var q = olc + "";
    search(olc, "what").then((response) => {
      for(var i in response)
        clips.push(response[i]);
    });
    search(olc, "who").then((response) => {
      for(var i in response)
        clips.push(response[i]);
    });
    search(olc, "why").then((response) => {
      for(var i in response)
        clips.push(response[i]);
    });

  }else{
    marker = playlist[posion];
  }

  var olc = OpenLocationCode.encode(marker.getPosition().lat(), marker.getPosition().lng(), OpenLocationCode.CODE_PRECISION_NORMAL)


}

async function next(){

}

function previous(){

}

function more(){

}

function stop(){

}

function _continue(){

}
