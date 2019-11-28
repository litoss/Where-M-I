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

      var button = new ActionButton('select');
      button.id = i;
      button.addEventListener("click", (event) => {

        var form = new FormData();
        form.append('OLC', OpenLocationCode.encode(placeMarker.getPosition().lat(), placeMarker.getPosition().lng(), OpenLocationCode.CODE_PRECISION_EXTRA));
        form.append('user', googleUser.ID);
        form.append('name', jsonResponse.results.bindings[event.srcElement.id].name.value);
        //form.append('category', ?)
        //form.append('orario', ?);
        form.append('descrizione', jsonResponse.results.bindings[event.srcElement.id].abstract.value);

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

        var object = {};
        form.forEach(function(value, key){
            object[key] = value;
        });

        xhr.send(JSON.stringify(object));
      });

      var placeCard = new CardTemp(jsonResponse.results.bindings[i].name.value,null,jsonResponse.results.bindings[i].abstract.value,jsonResponse.results.bindings[i].img.value,[button]);
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
