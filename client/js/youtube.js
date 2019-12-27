function search(olc, purpose){
  q = olc + ":" + purpose + ":ita:*";

  return gapi.client.youtube.search.list({
    q: q,
    part: 'id'
  }).then(function(response){

    var div = document.createElement('div');
    for(var item in response.result.items){
      div.appendChild(new Player(response.result.items[item].id.videoId));
    }
    console.log(div);
    return div;
  });
}
