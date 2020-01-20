async function openSelectPaths() {
  var content = document.createElement('div');

  var list = new List("mdc-list--two-line mdc-list--avatar-list");
  list.add(new ImageList("Free Mode", "Una lista dei luoghi più interessanti nei dintorni"))

  content.appendChild(list.root_);

  var position = map.position.getPosition();

  for(var i  in pathList){
    list.add(new ImageList(pathList[i].namer, "Number of steps :" + pathList[i].route.length));
  }

  var buttonContainer = document.createElement('div');
  var close = new ActionButton('close');
  buttonContainer.appendChild(close.root_);

  var dialog = new Dialog(content, buttonContainer, "Select a Path");

  list.listen('MDCList:action', (event) => {
    if(event.detail.index == 0){
      free = true;
      next();
      dialog.close();
    }else{
      playlist = pathList[event.detail.index - 1].route;
      next();
      dialog.close();
    }
  });

  document.getElementById('map').appendChild(dialog.root_);
  dialog.open();

  close.listen('click',() => {
    dialog.close();
  });

  dialog.listen('MDCDialog:closing', function() {
    document.getElementById('map').removeChild(dialog.root_);
  });
}
function getPaths(olc){
  return new Promise((resolve,reject) => {
    xhr = new XMLHttpRequest();
    xhr.open('POST', '/find_route');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
      resolve(JSON.parse(xhr.response));
    }
    xhr.send(JSON.stringify({OLC: olc}));
  });
}
