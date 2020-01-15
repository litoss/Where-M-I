function openPaths(){

    var content = document.createElement('div');
    var createButton = new FloatingActionButton('add', 'drawer-fab');
    content.appendChild(createButton.root_);

    var pathDiv = document.createElement('div');
    content.appendChild(pathDiv);

    createButton.listen('click', () => {
      map.pageDrawer.open = false;
      createPath();
    })

    xhr = new XMLHttpRequest();
    xhr.open('POST', '/find_route');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = async function(){
      var response = JSON.parse(xhr.responseText);
      if(!response[0]){
        var errorText = document.createElement('h3');
        errorText.innerHTML = 'No results';
        pathDiv.appendChild(errorText);
      }
      for(var i in response) {
        var place = await firstPlace(response[i].route[0]);
        var name = response[i].namer;
        var img = await decode64(place.image);
        var start = "Start from: " + place.name + "";
        var descr = "Number of steps: " + response[i].route.length + ".";
        var deleteButton = new IconButton('delete', 'mdc-button--raised mdc-image__circular');

        var card = new Card(name, null, descr, img, null, [deleteButton.root_], 'about-card');
        card.setSubTitle(start);

        pathDiv.appendChild(card.root_);

        var addListener = function(index){
          card.primaryAction.addEventListener("click", () => {
            var path =  response[index];
            map.pageDrawer.open = false;
            selectedPath(path);
          });
          deleteButton.listen('click', () => {
            var path = response[index];
            var edit = new ActionButton('Delete');
            var close = new IconButton('close');
            var snackbar = new SnackBar('Are you sure?',[edit.root_,close.root_]);
            snackbar.open();
            edit.listen('click', () => {
              deletePath(path.namer);
              map.pageDrawer.open = false;
            })
            snackbar.listen("MDCSnackbar:closed",() => {
              document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
            });
          })
        }
        addListener(i);
      }
    }
    xhr.send(JSON.stringify({token: token}));

    map.pageDrawer = new PageDrawer('Your Paths', content);
    map.pageDrawer.open = true;
}

function firstPlace(olc){
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

function deletePath(namer){
  var xhr = new XMLHttpRequest;
  xhr.open('POST', '/del_route');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    console.log(xhr.response);
  }
  xhr.send(JSON.stringify({namer: namer, token: token}))

}
