function listClipDrawer(olc, name, description){
  var content = document.createElement('div');

  var img = document.createElement('img');
  img.setAttribute('src',img);

  content.appendChild(img);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.googleapis.com/youtube/v3/videos');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = this.addPlace;
  xhr.send(JSON.stringify({OLC: area}));

  map.pageDrawer = new PageDrawer('', content);
  map.pageDrawer.open = true;
}
