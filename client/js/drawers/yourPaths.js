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
      console.log(response);
      if(!response[0]){
        var errorText = document.createElement('h3');
        errorText.innerHTML = 'No results';
        pathDiv.appendChild(errorText);
      }
      for(var i in response){
        console.log(response[i].route);
      //     var editButton = new IconButton('edit');
      //     editButton.root_.id = i;
      //     editButton.listen('click', (event) => {
      //       createEditDialog(response[event.srcElement.id]);
      //     });
      //     var image = decode64(response[i].image, "image/jpg");
      //     var card = new Card (response[i].name, null, response[i].description, image, null,[editButton.root_],'about-card');
      //     content.appendChild(card.root_);
      //
      //     var addListener = function(index){
      //       card.primaryAction.addEventListener("click", () => {
      //         var place = response[index];
      //         map.pageDrawer.open = false;
      //         //selectedPlace(place);
      //       });
      //     }
      //     addListener(i);
       }
    }
    xhr.send(JSON.stringify({token: token}));

    map.pageDrawer = new PageDrawer('Your Paths', content);
    map.pageDrawer.open = true;
}
