var playlist;
var position;

function start(){

  var [marker, distance] = findClosestMarker();

  if(distance < 1000 ){
    var olc = olc.value = OpenLocationCode.encode(marker.position.lat(), marker.position.lng(), OpenLocationCode.CODE_PRECISION_NORMAL)

    playlist.push(search(olc, 'who'));
  }else{
    //Non ci sono luoghi intorno a te!
  }
}

function findClosestMarker(){
  if(map.position.getMap()){
    var lat = map.position.getPosition().lat();
    var lng = map.position.getPosition().lng();

    var minDistance = 10000;
    var marker = null;

    for(var i=0; i<map.places.length; i++){

      var olc = olc.value = OpenLocationCode.encode(map.places[i].getPosition().lat(), map.places[i].getPosition().lng(), OpenLocationCode.CODE_PRECISION_NORMAL)

      //Se il posto non è nella playlist
      if(!playlist.keys().includes(olc)){
        var distance = getDistance(lat, map.places[i].getPosition().lat(), lng, map.places[i].getPosition().lng());

        if(distance < minDistance){
          marker = i;
          distance = distance;
        }
      }
    }

    return [map.places[marker], distance];

  }else{
  } //ERROR
}

function next(){


}

function previous(){

}

function more(){

}

function stop(){

}

function _continue(){

}
