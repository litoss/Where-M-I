function openPlaces(){

    var content = document.createElement('div');

    xhr = new XMLHttpRequest();
    xhr.open('POST', '/find');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
      var arr = JSON.parse(xhr.responseText);
      console.log(arr);
      for(var i in arr){
        console.log(arr[i].image);
          var button = new ActionButton("Edit");
          var image = decode64(arr[i].image);
          console.log(image);
          var card = new Card (arr[i].name, null, arr[i].description, image, [button], null,'about-card');
          content.appendChild(card.root_);
      }
    }

    xhr.send(JSON.stringify({token: token}));

    map.pageDrawer = new PageDrawer('Your Places', content);
    map.pageDrawer.open = true;
}
