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
      return element.meta.split(':')[1] == purp;
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
