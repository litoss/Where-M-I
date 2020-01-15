async function selectPlace(position) {

    if(map.pageDrawer) map.pageDrawer.open = false;

    var div = document.createElement('div');

    setQuery(position,approx);

    fetch(queryUrl).then(function(response){
      return response.json();
    }).then(function(jsonResponse){
      for(var i in jsonResponse.results.bindings){
        var button = new ActionButton('select');

        var addListener = function(index){
          button.listen("click", async () => {
            var place = {};
            place['name'] = jsonResponse.results.bindings[index].name.value;
            place['description'] = jsonResponse.results.bindings[index].abstract.value;
            var lat = jsonResponse.results.bindings[index].lat.value;
            var long = jsonResponse.results.bindings[index].long.value;
            place['OLC'] = OpenLocationCode.encode(lat, long, OpenLocationCode.CODE_PRECISION_NORMAL);
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            var src = await getimageBlob(proxyurl + jsonResponse.results.bindings[index].img.value);
            var image = await encode64(src);
            place['image'] = image ;
            createEditDialog(place);
          });
        }

        addListener(i);

        if(jsonResponse.results.bindings[i].abstract.value.length > 80) descr = jsonResponse.results.bindings[i].abstract.value.substring(0,80)+"...";
        else descr = jsonResponse.results.bindings[i].abstract.value;

        var placeCard = new Card(jsonResponse.results.bindings[i].name.value,null, descr, jsonResponse.results.bindings[i].img.value,[button.root_]).root_;
        placeCard.className += ' about-card';
        div.appendChild(placeCard);
      };

      var notHere = document.createElement('div');
      notHere.className = "notListedPlace";
      notHere.innerHTML = "<h5>Place not listed?</h5>";

      var addBut = new ActionButton('Create It');
      addBut.listen("click", async () =>{
        var place = {};
        place['OLC'] = OpenLocationCode.encode(position.lat(), position.lng(), OpenLocationCode.CODE_PRECISION_NORMAL);
        place['description'] = "Insert description here";
        if(profile) {
          createEditDialog(place);
        }else {
          var snackbar = new SnackBar('You must be logged in to use this function');
          snackbar.open();
          snackbar.listen("MDCSnackbar:closed",() => {
            document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
          });
        }
      });

      notHere.appendChild(addBut.root_);
      div.appendChild(notHere);
    });

    map.pageDrawer = new PageDrawer('Select your Place', div);
    map.pageDrawer.open = true;
}
