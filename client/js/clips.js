var clips = [];

async function init(){
  var list = await youtubeSearch("id", "8FPHF800", 50);
  for(var i in list){
    var clip = await getVideo(list[i].id.videoId);
    clip.meta = clip.snippet.description.split('#')[0];
    clip.start = clip.snippet.description.split('#')[2];
    clip.snippet.description = clip.snippet.description.split('#')[1];
    clips.push(clip);
  }
}

function orderClips(){
  var compare = function(a,b){
    return a.statistics.likeCount - b.statistics.likeCount;
  }

  var orderedClips = clips;
  orderedClips.sort(compare);
  orderedClips.reverse();

  return orderedClips;
}

function searchClips(olc, purp, lang, cont, aud){
  var result = clips;

  if(olc){
    function contains(element){
      return element.meta.split(':')[0].includes(olc);
    }
    result = result.filter(contains);
  }

  if(purp){
    function equals(element){
      return element.meta.split(':')[2] == purp;
    }
    result = result.filter(equals);
  }

  if(lang){
    var language = languages.find(o => o['tag'] == lang).iso;

    function equals(element){
      return element.meta.split(':')[2] == language;
    }
    result = result.filter(equals);
  }

  if(cont && cont != "all"){
    function equals(element){
      return element.meta.split(':')[3] == cont;
    }
    result = result.filter(equals);
  }
  if(aud && aud != "gen"){
    function equals(element){
      return element.meta.split(':')[4] == audience;
    }
    result = result.filter(equals);
  }

  return result;
}
