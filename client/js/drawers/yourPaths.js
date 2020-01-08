function openPaths(){

    var content = document.createElement('div');
    var addButton = new ActionButton('Add new Path');
    content.appendChild(addButton.root_);

    addButton.listen('click', () => {
      map.pageDrawer.open = false;
      createPath();
    })

    var pathDiv = document.createElement('div');
    content.appendChild(pathDiv);


    xhr = new XMLHttpRequest();
    xhr.open('POST', '/find_route');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
      var response = JSON.parse(xhr.responseText);
      if(!response[0]){
        var errorText = document.createElement('h3');
        errorText.innerHTML = 'No results';
        pathDiv.appendChild(errorText);
      }
      for(var i in response) {

        var route = response [i];
        var name = route.namer;
        var img = null;

        var card = new Card(name,null,null, img,null,null,'about-card');
        pathDiv.appendChild(card.root_);

        var addListener = function(index){
          card.primaryAction.addEventListener("click", () => {
            var path =  response[index];
            map.pageDrawer.open = false;
            selectedPath(path);
          });
        }
        addListener(i);
      }
    }
    xhr.send(JSON.stringify({token: token}));

    map.pageDrawer = new PageDrawer('Your Paths', content);
    map.pageDrawer.open = true;
}
