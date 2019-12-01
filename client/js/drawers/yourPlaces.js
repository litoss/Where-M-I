function openPlaces(){
  
  if(profile != null){
    document.getElementById('content_title').innerHTML = 'Your Places';
    document.getElementById('content_content').innerHTML = '';

    var form = new FormData();
    form.append('user', profile.getId());

    xhr = new XMLHttpRequest();
    xhr.open('POST', '/find');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
      var arr = JSON.parse(xhr.responseText);
      for(var i in arr){
          var button = new ActionButton("Edit");
          var card = new CardTemp (arr[i].name,null,arr[i].description,null,[button]);
          document.getElementById('content_content').appendChild(card);
      }
    }


    var object = {};
    form.forEach(function(value, key){
        object[key] = value;
    });
    xhr.send(JSON.stringify(object));

    mainDrawer.open = false;
    pageDrawer.open = true;
  }else loginDialog();
}
