function openPlaces(){
  
    var content = document.createElement('div');
    var form = new FormData();
    form.append('user', profile.getId());

    xhr = new XMLHttpRequest();
    xhr.open('POST', '/find');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
      var arr = JSON.parse(xhr.responseText);
      for(var i in arr){
          var button = new ActionButton("Edit");
          var card = new Card (arr[i].name,null,arr[i].description,null,[button]).root_;
          content.appendChild(card);
      }
    }

    var object = {};
    form.forEach(function(value, key){
        object[key] = value;
    });
    xhr.send(JSON.stringify(object));

    map.pageDrawer = new PageDrawer('Your Places', content);
    map.pageDrawer.open = true;
}
