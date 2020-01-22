// Youtube Data API
// https://developers.google.com/youtube/v3/docs

async function youtubeSearch(part, q, maxResults){
  var query = {};
  query.part = part;
  query.type = "video";
  query.q = q;
  if(maxResults) query.maxResults = maxResults;
  
  let request = await gapi.client.youtube.search.list(query);

  var items = request.result.items;
  while(request.result.nextPageToken){
    query.pageToken = request.result.nextPageToken;
    request = await gapi.client.youtube.search.list(query);
    items = items.concat(request.result.items);
  }

  return items;
}

async function listVideos(){
  let request = await gapi.client.youtube.search.list({
    part: "id",
    forMine: true,
    type: "video",
    maxResults: 50,
    q: "8FPHF800+-"
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
    part: "id, snippet, statistics, status",
    id: videoId
  });

  return request.result.items[0];
}

async function removeVideo(videoId){
  return gapi.client.youtube.videos.delete({
    "id": videoId
  }).then(()=>{
    var snackbar = new SnackBar('Your clip was successfully removed');
    snackbar.open();
  });
}

async function getRating(videoId){
  var request = await gapi.client.youtube.videos.getRating({
    id: videoId
  });

  return request.result.items[0].rating;
}

async function rate(videoId, rating){
  gapi.client.youtube.videos.rate({
    id: videoId,
    rating: rating
  });
}

async function updateVideo(videoId){
  return gapi.client.youtube.videos.update({
         id: videoId,
         part: 'status',
         status: {
             privacyStatus: 'public'
           }
     }).then(()=>{
       var snackbar = new SnackBar('Your clip is siccessfully published');
       snackbar.open();
     });
}

function createPlaylist(name){
  return gapi.client.youtube.playlists.insert({
      "part": "id,snippet,status",
      "resource": {
        "snippet": {
          "title": name
        },
        "status":{
          "privacyStatus":'public'
        }
      }
    });
}

async function insertClip(title, description, privacyStatus, readStream){

  return new Promise((resolve,reject) => {
    var metadata = {
      kind: 'youtube#video',
      snippet: {
      title: title,
      description : description,
      },
      status: {
      privacyStatus: privacyStatus
      }
    }

    var meta = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
    var form = new FormData();
    form.append('dati', meta)
    form.append('video',readStream);

    $.ajax({
      url: 'https://www.googleapis.com/upload/youtube/v3/videos?access_token=' + encodeURIComponent(auth) + '&part=snippet,status',
      data: form,
      cache: false,
      contentType: false,
      processData: false,
      metadata: metadata,
      method: 'POST',
      success: function(data) {
        var snackbar = new SnackBar('Video Added succesfully on youtube');
        snackbar.open();
        resolve(data);
      }
    });
  });
}
