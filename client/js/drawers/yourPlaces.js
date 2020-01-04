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
<<<<<<< HEAD
          var image = decode64(arr[i].image, "image/jpg");
          var card = new Card (arr[i].name, null, arr[i].description, image, null,[editButton.root_],'about-card');
=======
          var image = decode64(response[i].image);
          var card = new Card (response[i].name, null, response[i].description, image, null,[editButton.root_],'about-card');
>>>>>>> 04ea8515edd0f07af7607e0f10bd975ea9e03698
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
