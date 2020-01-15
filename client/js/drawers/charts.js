async function openCharts(){

  var content = document.createElement('div');

  var tabBar = new TabBar(chartsTab.map(o => o['name']), chartsTab.map( o => o['icon']));
  var div = document.createElement('div');
  div.style.padding = '20px';

  tabBar.listen("MDCTabBar:activated", (event) => {

    div.innerHTML = '';

    switch (event.detail.index) {
      case 0: getTopClips(div);
        break;
      case 1: getTopVlogger(div);
        break;
      case 2: getTopPaths(div);
        break;
    }
  });

  tabBar.activateTab(0);

  content.appendChild(tabBar.root_);
  content.appendChild(div);

  map.pageDrawer = new PageDrawer('Charts', content);
  map.pageDrawer.open = true;
}

async function getTopPaths(div){
  var paths = new List("mdc-list--two-line");

  for(var i in example) paths.add(new ElementList(example[i].primaryText, example[i].secondaryText, 'music_note'));
  div.appendChild(paths.root_);
}

async function getTopVlogger(div){
  var list = await search("id, snippet", "8FPHF800+:*", 50);

  var channels = [];
  for(var i in list){
    var index;
    if((index = channels.findIndex(o => o.channelId === list[i].snippet.channelId)) != -1){
      channels[index].count++;
    }else{
      channels.push({channelId: list[i].snippet.channelId, count: 1 })
    }
  }

  var compare = function(a, b){
    return a.count - b.count;
  }

  channels.sort(compare);
  channels.reverse();

  var listVloggers = new List("mdc-list--two-line mdc-list--avatar-list")

  for(var i in channels){
    channelInfo = await getChannel(channels[i].channelId)
    listVloggers.add(new ImageList(channelInfo.snippet.title, channels[i].count + " Clips", channelInfo.snippet.thumbnails.default.url));
  }

  listVloggers.listen('MDCList:action', (event) => {
    window.open("https://www.youtube.com/channel/" + channels[event.detail.index].channelId, '_blank');
  });

  div.appendChild(listVloggers.root_);
}

async function getTopClips(div){
  var list = await search("id", "8FPHF800+:*", 50);

  var clips = [];

  for(var i in list){
    var clip = await getVideo(list[i].id.videoId);
    clips.push(clip);
  }
  var compare = function(a,b){
    return a.statistics.likeCount - b.statistics.likeCount;
  }

  clips.sort(compare);
  clips.reverse();

  var listclips = new List("mdc-list--two-line");
  for(var i in clips) listclips.add(new ElementList(clips[i].snippet.title, clips[i].statistics.likeCount + " likes", 'music_note'));

  listclips.listen('MDCList:action',(event) => {
    window.open("https://www.youtube.com/watch?v=" + list[event.detail.index].id.videoId, '_blank');
  });

  div.appendChild(listclips.root_);
}
