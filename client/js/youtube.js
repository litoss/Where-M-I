// Youtube Data API
// https://developers.google.com/youtube/v3/docs

async function search(part, q, maxResults){

  var query = {};
  query.part = part;
  query.type = "video";
  query.q = q;
  if(maxResults) query.maxResults = maxResults;
  console.log(query);
  let request = await gapi.client.youtube.search.list(query);
  return request.result.items;
}

async function listVideos(){
  let request = await gapi.client.youtube.search.list({
    part: "id, snippet",
    forMine: true,
    type: "video",
    q: "8FPHF800+:*"
  });
  return request.result.items;
}

async function getChannel(channelId){
  var request = await gapi.client.youtube.channels.list({
    part: "id, snippet",
    id: channelId
  });

  return request.result.items[0];
}

async function getVideo(videoId){
  var request = await gapi.client.youtube.videos.list({
    part: "id, snippet, statistics",
    id: videoId
  });

  return request.result.items[0];
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
