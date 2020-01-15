var clips = [];

async function init(){
  var list = await search("id", "8FPHF800+:*", 50);
  for(var i in list){
    var clip = await getVideo(list[i].id.videoId);
    clip.meta = clip.snippet.description.split('#')[0];
    clip.start = clip.snippet.description.split('#')[2];
    clip.snippet.description = clip.snippet.description.split('#')[1];
    clips.push(clip);
  }
}

async function orderClips(){
  var compare = async function(a,b){
    return a.statistics.likeCount - b.statistics.likeCount;
  }

  var orderedClips = clips;
  orderedClips.sort(compare);
  orderedClips.reverse();

  return orderedClips;
}

async function searchClips(olc, purp, lang, cont, aud, det){
  var result = clips;

  if(olc){
    async function contains(element){
      return element.meta.split(':')[0].includes(olc);
    }

    result = result.filter(contains);
  }

  if(purp){

  }

  if(lang){
    async function equals(element){
      return element.meta.split(':')[2] == lang;
    }
    result = result.filter(equals);
  }

  if(cont){
    async function equals(element){
      return element.meta.split(':')[3] == cont;
    }
    result = result.filter(equals);
  }
  if(audience){
    async function equals(element){
      return element.meta.split(':')[4] == audience;
    }
    result = result.filter(equals);
  }

  console.log(result);

  return result;
}
