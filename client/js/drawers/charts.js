async function openCharts(){

  var content = document.createElement('div');

  var tabBar = new TabBar(chartsTab.map(o => o['name']), chartsTab.map( o => o['icon']));
  var list = document.createElement('div');
  list.style.padding = '20px';

  //var paths = await getTopPaths();
  tabBar.listen("MDCTabBar:activated", (event) => {

    list.innerHTML = '';

    switch (event.detail.index) {
      case 0: getTopClips(list);
        break;
      case 1: getTopVlogger(list);
        break;
      case 2: getTopPaths(list);
        break;
    }
  });

  tabBar.activateTab(0);



  content.appendChild(tabBar.root_);
  content.appendChild(list);

  map.pageDrawer = new PageDrawer('Charts', content);
  map.pageDrawer.open = true;

}

async function getTopPaths(list){
  var paths = new List("mdc-list--two-line");
  for(var i in example) paths.add(new ElementList(example[i].primaryText, example[i].secondaryText, 'music_note'));
  list.appendChild(paths.root_);
}

async function getTopVlogger(list){
  var clips = await search("id, snippet", "8FPHF800+:*", null, 50);

  var channels = [];
  for(var i in clips){
    var index;
    if((index = channels.findIndex(o => o.channelId === clips[i].snippet.channelId)) != -1){
      channels[index].count++;
    }else{
      channels.push({channelId: clips[i].snippet.channelId, count: 1 })
    }
  }

  var compare = function(a, b){
    return a.count - b.count;
  }

  channels.sort(compare);
  channels.reverse();

  var listVloggers = new List("mdc-list--two-line mdc-list--avatar-list")

  for(var i in channels){
    channelInfo = await getChannelInfo(channels[i].channelId)
    console.log(channelInfo);
    listVloggers.add(new ImageList(channelInfo.title, channels[i].count + " Clips", channelInfo.thumbnails.default.url));
  }
  list.appendChild(listVloggers.root_);
}

async function getTopClips(list){
  // var clips = await search("id, snippet", "8FPHF800+:*", "relevance", 10)
  // var listclips = new List("mdc-list--two-line");
  // for(var i in clips) listclips.add(new ElementList(clips[i].snippet.title, clips[i].snippet.description, 'music_note'));
  // list.appendChild(listclips.root_);
  // list.listen('click',(event) => {
  //
  // })
}
