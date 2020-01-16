// Youtube Data API
// https://developers.google.com/youtube/v3/docs

async function youtubeSearch(part, q, maxResults){

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
    part: "id,snippet",
    forMine: true,
    type: "video",

    //maxResults: 50
    //q: "8FPHF800+:*"
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

async function removeVideo(videoId){
  return gapi.client.youtube.videos.delete({
      "id": videoId
    }).then(()=>{
      console.log('Il tuo video è stato correttamente rimosso')
    });;
}

async function updateVideo(videoId){
  return gapi.client.youtube.videos.update({
         id: videoId,
         part: 'status',
         status: {
             privacyStatus: 'public'
           }
     }).then(()=>{
       console.log('Il tuo video è stato correttamente pubblicato')
     });
}
function insertClip(title, description, privacyStatus, readStream){

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
    //metadata:metadata,
    method: 'POST',
    success:function(data) {
      alert("Il video è stato inserito sul tuo canale Youtube!!!");
    }
  });
}
