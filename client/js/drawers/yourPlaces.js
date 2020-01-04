function openPlaces(){

    var content = document.createElement('div');

    xhr = new XMLHttpRequest();
    xhr.open('POST', '/find_place');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
      var response = JSON.parse(xhr.responseText);
      for(var i in response){
          var editButton = new IconButton('edit');
          editButton.root_.id = i;
          editButton.listen('click', (event) => {
            createEditDialog(response[event.srcElement.id]);
          });
          var image = decode64(response[i].image);
          var card = new Card (response[i].name, null, response[i].description, image, null,[editButton.root_],'about-card');
          content.appendChild(card.root_);

          var addListener = function(index){
            card.primaryAction.addEventListener("click", () => {
              var place = response[index];
              map.pageDrawer.open = false;
              selectedPlace(place);
            });
          }
          addListener(i);
      }
    }

    xhr.send(JSON.stringify({token: token}));

    map.pageDrawer = new PageDrawer('Your Places', content);
    map.pageDrawer.open = true;
}
