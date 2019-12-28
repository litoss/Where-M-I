function selectPlace(position) {

  if(!map.pageDrawer){

  var div = document.createElement('div');
  setQuery(position,approx);
  fetch(queryUrl).then(function(response){
    return response.json();
  }).then(function(jsonResponse){
    for(var i in jsonResponse.results.bindings){
      var button = new ActionButton('select');
      button.id = i;
      button.addEventListener("click", async (event) => {

        var place = {};
        place['name'] = jsonResponse.results.bindings[event.srcElement.id].name.value;
        place['description'] = jsonResponse.results.bindings[event.srcElement.id].abstract.value;
        var lat = jsonResponse.results.bindings[event.srcElement.id].lat.value;
        var long = jsonResponse.results.bindings[event.srcElement.id].long.value;
        place['OLC'] = OpenLocationCode.encode(lat, long, OpenLocationCode.CODE_PRECISION_NORMAL);
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        var src = await getimageBlob(proxyurl + jsonResponse.results.bindings[event.srcElement.id].img.value);
        var image = await encode64(src);
        place['image'] = image ;
        createEditDialog(place);
      });

      var placeCard = new Card(jsonResponse.results.bindings[i].name.value,null,jsonResponse.results.bindings[i].abstract.value,jsonResponse.results.bindings[i].img.value,[button]).root_;
      placeCard.className += ' about-card';
      div.appendChild(placeCard);
    };

    var notHere = document.createElement('div');
    notHere.className = "notListedPlace";
    notHere.innerHTML = "<h5>Place not listed?</h5>";

    var addBut = new ActionButton('Create It');
    addBut.addEventListener("click", async () =>{
      var place = {};
      place['OLC'] = OpenLocationCode.encode(position.lat(), position.lng(), OpenLocationCode.CODE_PRECISION_NORMAL);
      if(profile) createEditDialog(place);
      else alert('You must be logged in to use this function');
    });

    notHere.appendChild(addBut);
    div.appendChild(notHere);
  });

  map.pageDrawer = new PageDrawer('Select your Place', div);
  map.pageDrawer.open = true;
  }
}
