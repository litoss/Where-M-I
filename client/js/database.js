function getRating(olc){
  return new Promise((resolve,reject) =>{
    xhr.open('POST', '/find_place');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
      if(!xhr.response.lenght)
        resolve(JSON.parse(xhr.response)[0].media_rating);
      else {
        resolve('0');
      }
    }
    xhr.send(JSON.stringify({OLC: olc}));
  })
}

function addReview(olc, value, comment){
  xhr = new XMLHttpRequest();
  xhr.open('POST', '/new_review');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = async function(){
    for(var i in markerPlaces){
      var olcR = OpenLocationCode.encode(markerPlaces[i].getPosition().lat(), markerPlaces[i].getPosition().lng(), OpenLocationCode.CODE_PRECISION_NORMAL);
      if (olcR == olc){
        markerPlaces[i].place.media_rating = await getRating(olc);
      }
    }
    var snackbar = new SnackBar('Review Added succesfully');
    snackbar.open();
  }
  xhr.send(JSON.stringify({token: token, OLC: olc, rating_place: value, comment: comment}))
}
