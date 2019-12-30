function openPlaces(){

    var content = document.createElement('div');

    xhr = new XMLHttpRequest();
    xhr.open('POST', '/find_place');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
      var arr = JSON.parse(xhr.responseText);
      for(var i in arr){
          var editButton = new IconButton('edit');
          editButton.root_.id = i;
          editButton.listen('click', (event) => {
            createEditDialog(arr[event.srcElement.id]);
          });
          var image = decode64(arr[i].image);
          var card = new Card (arr[i].name, null, arr[i].description, image, null,[editButton.root_],'about-card');
          content.appendChild(card.root_);
      }
    }

    xhr.send(JSON.stringify({token: token}));

    map.pageDrawer = new PageDrawer('Your Places', content);
    map.pageDrawer.open = true;
}
