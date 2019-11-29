function openPlaces(){
  document.getElementById('content_title').innerHTML = 'Your Places';
  document.getElementById('content_content').innerHTML = '';

  var form = new FormData();
  form.append('user', profile.getId());

  xhr = new XMLHttpRequest();
  xhr.open('POST', '/find');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
  xhr.onload = function(){
    console.log(xhr.response);
  }
}
