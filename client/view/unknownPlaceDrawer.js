function selectPlace() {

  document.getElementById('content_content').innerHTML = '';
  document.getElementById('footer_content').innerHTML = '';
  document.getElementById('content_title').innerHTML = 'Select your Place';
  var div = document.createElement('div');
  document.getElementById('content_content').appendChild(div);
  setQuery(approx);
  fetch(queryUrl).then(function(response){
    return response.json();
  }).then(function(jsonResponse){
    for(var i in jsonResponse.results.bindings){
      var title = jsonResponse.results.bindings[i].name.value;
      var descr = jsonResponse.results.bindings[i].abstract.value;
      var img = jsonResponse.results.bindings[i].img.value;

      var button = new ActionButton('select');
      button.addEventListener("click", () => {

        var form = new FormData();
        form.append('OLC', OpenLocationCode.encode(placeMarker.getPosition().lat(), placeMarker.getPosition().lng(), OpenLocationCode.CODE_PRECISION_EXTRA));
        form.append('user', googleUser.ID);
        form.append('name', title);
        //form.append('category', ?)
        //form.append('orario', ?);
        form.append('descrizione', descr);

        xhr = new XMLHttpRequest();
        xhr.open('POST', '/new_place');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
          console.log(xhr.responseText);
            if (xhr.status === 200) {
                alert('Aggiunto con Successo!');
            }
            else if (xhr.status !== 200) {
                alert('Request failed.  Returned status of ' + xhr.status);
            }
        };
        console.log(JSON.stringify(form));


        var object = {};
        form.forEach(function(value, key){
            object[key] = value;
        });

        xhr.send(JSON.stringify(object));
      });

      var placeCard = new CardTemp(title,null,descr,img,[button]);
      placeCard.className += ' about-card';
      div.appendChild(placeCard);
    }

    var notHere = document.createElement('div');
    notHere.className = "notListedPlace";
    notHere.innerHTML = "<h5>Place not listed?</h5>";

    var addBut = new ActionButton('Create It');
    addBut.addEventListener("click",function(){
      placeMarker.setMap(null);
      createDialog();
    });

    notHere.appendChild(addBut);
    div.appendChild(notHere);
  })
  mainDrawer.open = false;
  pageDrawer.open = true;
}
