function openPlaces(){
  document.getElementById('content_title').innerHTML = 'Your Places';
  document.getElementById('content_content').innerHTML = '';

  var form = new FormData();
  form.append('user', profile.getId());

  xhr = new XMLHttpRequest();
  xhr.open('POST', '/find');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function(){
    var arr = JSON.parse(xhr.responseText);
    var elements = [];
    for(var i in arr){
        elements.push(new ElementList(arr[i].name));
    }
    var list = new List(elements);

    document.getElementById('content_content').appendChild(list.root_);
  }


  var object = {};
  form.forEach(function(value, key){
      object[key] = value;
  });
  xhr.send(JSON.stringify(object));

  mainDrawer.open = false;
  pageDrawer.open = true;
}
