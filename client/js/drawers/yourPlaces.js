function openPlaces(){

    var content = document.createElement('div');

    xhr = new XMLHttpRequest();
    xhr.open('POST', '/find_place');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
      var response = JSON.parse(xhr.responseText);
      for(var i in response){
          var editButton = new IconButton('edit', 'mdc-button--raised mdc-image__circular');
          var deleteButton = new IconButton('delete');
          var image = decode64(response[i].image, "image/jpg");

          if(response[i].description.length > 100) descr = response[i].description.substring(0,100)+"...";
          else descr = response[i].description;

          var card = new Card (response[i].name, null, descr, image, null,[editButton.root_,deleteButton.root_],'about-card');
          content.appendChild(card.root_);

          var addListener = function(index){
            var place = response[index];
            card.primaryAction.addEventListener("click", () => {
              pageDrawer.open = false;
              selectedPlace(place);
            });
            editButton.listen('click', (event) => {
              createEditDialog(place);
            });
            deleteButton.listen('click', (event) => {
              var edit = new ActionButton('Delete');
              var close = new IconButton('close');
              var snackbar = new SnackBar('You will delete paths deleting this place, Are you sure?',[edit.root_,close.root_]);
              snackbar.open();
              edit.listen('click', () => {
                deletePlace(place);
                pageDrawer.open = false;
              })
            });
          }
          addListener(i);
      }
    }

    xhr.send(JSON.stringify({token: token}));

    pageDrawer = new PageDrawer('Your Places', content);
    pageDrawer.open = true;
}

function deletePlace(place){
  var xhr = new XMLHttpRequest;
  xhr.open('POST', '/del_place');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    deleteRoutes(place.OLC);
    for(var i in markerPlaces){
      var olc = OpenLocationCode.encode(markerPlaces[i].getPosition().lat(), markerPlaces[i].getPosition().lng(), OpenLocationCode.CODE_PRECISION_NORMAL);
      if (olc == place.OLC){
        markerPlaces[i].setMap(null);
        markerPlaces.splice(i, 1);
        break;
      }
    }
  }

  xhr.send(JSON.stringify({OLC: place.OLC, token: token}))

}

function deleteRoutes(olc){
  xhr = new XMLHttpRequest();
  xhr.open('POST', '/find_route');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function(){
    var response = JSON.parse(xhr.response);
    for(var i in response){
      for(var j in response[i].route){
        if (olc == response[i].route[j]) deletePath(response[i].namer);
      }
    }
  }
  xhr.send(JSON.stringify({OLC: ''}));
}
