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

function insertClip(title, description, privacyStatus, readStream){

  gapi.client.youtube.videos.insert({
    part: 'id,snippet,status',
    resource: {
      snippet: {
        title: title,
        description: description
      },
      status: {
        privacyStatus: privacyStatus
      }
    },
    media: {
      body: readStream
    }
  }).then(function(response){
    console.log(response);
  });
}
