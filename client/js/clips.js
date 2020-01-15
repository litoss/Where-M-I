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

async function searchClips(olc, purp, lang, cont, aud){
  var result = clips;
  console.log(olc);
  console.log(purp);
  console.log(lang);
  console.log(cont);
  console.log(aud);

  if(olc){
    function contains(element){
      return element.meta.split(':')[0].includes(olc);
    }
    result = result.filter(contains);
    console.log("Takeshi's Castle 1 Prova: " + result.length)
    console.log(result)
  }

  if(purp){

  }

  if(lang){
    var language = languages.find(o => o['tag'] == lang).iso;
    console.log(language);
    function equals(element){
      console.log(element.meta.split(':')[2] == language);
      return element.meta.split(':')[2] == language;
    }
    result = result.filter(equals);
    console.log("Takeshi's Castle 2 Prova: " + result.length)
  }

  if(cont && cont != "all"){
    function equals(element){
      return element.meta.split(':')[3] == cont;
    }
    result = result.filter(equals);
    console.log("Takeshi's Castle 3 Prova: " + result.length)
  }
  if(aud && aud != "gen"){
    function equals(element){
      return element.meta.split(':')[4] == audience;
    }
    result = result.filter(equals);
    console.log("Takeshi's Castle 4 Prova: " + result.length)
  }

  console.log(result);

  return result;
}
