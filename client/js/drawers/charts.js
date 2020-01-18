async function openCharts(){

  var content = document.createElement('div');

  var tabBar = new TabBar(chartsTab.map(o => o['name']), chartsTab.map( o => o['icon']));
  content.appendChild(tabBar.root_);

  var tab1 = document.createElement('div');
  tab1.style.display = 'none';
  content.appendChild(tab1);

  var tab2 = document.createElement('div');
  tab2.style.display = 'none';
  content.appendChild(tab2);

  var tab3 = document.createElement('div');
  tab3.style.display = 'none';
  content.appendChild(tab3);

  getTopClips(tab1);
  getTopVlogger(tab2);
  getTopPaths(tab3);

  tabBar.listen("MDCTabBar:activated", (event) => {
    switch (event.detail.index) {
      case 0:tab2.style.display = 'none';
        tab3.style.display = 'none';
        tab1.style.display = 'block';
        break;
      case 1:tab1.style.display = 'none';
        tab3.style.display = 'none';
        tab2.style.display = 'block';
        break;
      case 2:tab1.style.display = 'none';
        tab2.style.display = 'none';
        tab3.style.display = 'block';
        break;
    }
  });
  tabBar.activateTab(0);


  map.pageDrawer = new PageDrawer('Charts', content);
  map.pageDrawer.open = true;
}

async function getTopPaths(div){

  xhr = new XMLHttpRequest();
  xhr.open('POST', '/find_route');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = async function(){
    var response = JSON.parse(xhr.response);
    var path = [];
    for(var i in response){
      var sum = 0;
      for (var j in response[i].route){
        place = await getPlace(response[i].route[j]);;
        sum += place.media_rating;
        if(j == 0) {
          var image = decode64(place.image);
        }
      }

      path[i] = {  route: response[i], rating: sum /response[i].route.length, image: image};
    }

    var comp = function(a, b){
      return a.rating - b.rating;
    }

    path.sort(comp);
    path.reverse();

    var paths = new List("mdc-list--two-line mdc-list--avatar-list");

    for(var i in path) paths.add(new ImageList(path[i].route.namer, "Media Rating: " + path[i].rating, path[i].image ));

    paths.listen('MDCList:action', (event) => {
      map.pageDrawer.open = false;
      selectedPath(path[event.detail.index].route);
    });

    div.appendChild(paths.root_);
  }
  xhr.send(JSON.stringify({namer: ''}));
}

async function getTopVlogger(div){

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
    channelInfo = await getChannel(channels[i].channelId)
    listVloggers.add(new ImageList(channelInfo.snippet.title, channels[i].count + " Clips", channelInfo.snippet.thumbnails.default.url));
  }

  listVloggers.listen('MDCList:action', (event) => {
    window.open("https://www.youtube.com/channel/" + channels[event.detail.index].channelId, '_blank');
  });

  div.appendChild(listVloggers.root_);
}

async function getTopClips(div){

  var orderedClips = await orderClips();
  var listclips = new List("mdc-list--two-line");
  for(var i in orderedClips) listclips.add(new ElementList(orderedClips[i].snippet.title, orderedClips[i].statistics.likeCount + " likes", 'music_note'));

  listclips.listen('MDCList:action',(event) => {
    window.open("https://www.youtube.com/watch?v=" + orderedClips[event.detail.index].id, '_blank');
  });

  div.appendChild(listclips.root_);
}

function getPlace(olc){
  return new Promise((resolve,reject) =>{
    var xhr = new XMLHttpRequest;
    xhr.open('POST', '/find_place');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
      resolve(JSON.parse(xhr.response)[0]);
    }
    xhr.send(JSON.stringify({OLC: olc}));
  })
}
