var places = [];

async function getClips(area){
  var list = await youtubeSearch("id, snippet", area + '-', 50);
  var clips = [];
  for(var i in list){
    list[i].olc = list[i].snippet.description.split('#')[0].split(':')[0].split('-')[2];
    list[i].purpose = list[i].snippet.description.split('#')[0].split(':')[1];
    list[i].language = list[i].snippet.description.split('#')[0].split(':')[2];
    list[i].content = list[i].snippet.description.split('#')[0].split(':')[3];
    list[i].audience = list[i].snippet.description.split('#')[0].split(':')[4];;
    list[i].detail = list[i].snippet.description.split('#')[0].split(':')[5];
    list[i].description = list[i].snippet.description.split('#')[1];

    if(list[i].olc && list[i].purpose && list[i].language && list[i].content) clips.push(list[i]);
  }
  return clips;
}

function orderClips(clips){
  var compare = function(a,b){
    return a.statistics.likeCount - b.statistics.likeCount;
  }

  clips.sort(compare);
  clips.reverse();

  return clips;
}

function filterClips(clips, language, content, audience){
  var result = clips;

  language = languages.find(o => o.tag == language).iso;
  result = result.filter(o => o.language == language);

  if(content && content != "all"){
    result = result.filter(o => o.content == content);
  }

  if(audience && audience != "gen"){
    result = result.filter(o => o.audience == audience);
  }

  return result;
}
