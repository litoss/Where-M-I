// Youtube Data API
// https://developers.google.com/youtube/v3/docs

async function search(olc, purpose){
  q = olc + ":" + purpose + ":ita:*";

  let request = gapi.client.youtube.search.list({
    q: q,
    part: 'id'
  });

  console.log(request);
  var div = document.createElement('div');
  //for(var item in response.result.items){
  //  div.appendChild(new Player(response.result.items[item].id.videoId));
  //}
  return div;

}

async function getTopClips(){
  let response = await gapi.client.youtube.search.list({
    q: '8FPHF800+:*',
    order: 'relevance',
    maxResults: 10,
    part: 'id, snippet'
  });

  return response.result.items;
}

async function getTopVlogger(){

  let response = await gapi.client.youtube.search.list({
    q: '8FPHF800+:*',
    order: 'rating',
    maxResults: 10,
    part: 'id'
  });

  console.log(response);
}

async function search(olc, purpose){
  q = olc + ":" + purpose + ":ita:*";

  let request = gapi.client.youtube.search.list({
    q: q,
    part: 'id'
  });

  console.log(request);
  var div = document.createElement('div');
  //for(var item in response.result.items){
  //  div.appendChild(new Player(response.result.items[item].id.videoId));
  //}
  return div;

}

async function listVideos(){
  let response = await gapi.client.youtube.search.list({
    part: "id, snippet",
    forMine: true,
    type: "video",
    q: "8FPHF800+:*"
  });
  return response.result.items;
}

async function insertClip(title, description, privacyStatus, readStream){

  //console.log(gapi.client.youtube.videos.insert);
  var request = gapi.client.youtube.videos.insert({
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
  });

  console.log(request);
}
