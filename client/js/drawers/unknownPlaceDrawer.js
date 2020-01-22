async function selectPlace(position) {

    var div = document.createElement('div');

    dbpediaSearch(position, 0.001).then(function(results){
      for(var i in results.bindings){
        var button = new ActionButton('select');

        (function(i){
          button.listen("click", async () => {
            var place = {};
            place.name = results.bindings[i].name.value;
            place.description = results.bindings[i].abstract.value;
            place.OLC = OpenLocationCode.encode(results.bindings[i].lat.value, results.bindings[i].long.value, OpenLocationCode.CODE_PRECISION_NORMAL);
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            var src = await getimageBlob(proxyurl + results.bindings[i].img.value);
            place.image = await encode64(src);;
            createEditDialog(place);
          });
        })(i);

        if(results.bindings[i].abstract.value.length > 80) descr = results.bindings[i].abstract.value.substring(0,80)+"...";
        else descr = results.bindings[i].abstract.value;

        var placeCard = new Card(results.bindings[i].name.value,null, descr, results.bindings[i].img.value,[button.root_]).root_;
        placeCard.className += ' about-card';
        div.appendChild(placeCard);
      }

      var notHere = document.createElement('h5');
      notHere.innerHTML = "Place not listed?";
      div.appendChild(notHere);

      var addBut = new ActionButton('Create It');
      div.appendChild(addBut.root_);
      addBut.listen("click", async () =>{
        if(profile) {
          var place = {};
          place.OLC= OpenLocationCode.encode(position.lat(), position.lng(), OpenLocationCode.CODE_PRECISION_NORMAL);
          createEditDialog(place);
        }else {
          var snackbar = new SnackBar('You must be logged in to use this function');
          snackbar.open();
        }
      });
    });

    pageDrawer = new PageDrawer('Select your Place', div);
    pageDrawer.open = true;
}
