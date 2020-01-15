async function reviewDialog(olc){

  var content = document.createElement("div");

  var dialogTitle = 'Add a review for this place.';
  var dialogIcon = 'edit';

  var value = null;
  var star = [];
  star[0] = new IconButton('star_border');
  star[1] = new IconButton('star_border');
  star[2] = new IconButton('star_border');
  star[3] = new IconButton('star_border');
  star[4] = new IconButton('star_border');

  content.appendChild(star[0].root_);
  content.appendChild(star[1].root_);
  content.appendChild(star[2].root_);
  content.appendChild(star[3].root_);
  content.appendChild(star[4].root_);

  var setStar = function(starNumber){
    value = starNumber+1;

    var i = 0;
    for(;i<=starNumber;i++){
      star[i].setIcon('star');
    }
    for(;i<5;i++){
      star[i].setIcon('star_border');
    }
  }

  star[0].listen('click', () => {
      setStar(0);
  });
  star[1].listen('click', () => {
      setStar(1);
  });
  star[2].listen('click', () => {
      setStar(2);
  });
  star[3].listen('click', () => {
      setStar(3);
  });
  star[4].listen('click', () => {
      setStar(4);
  });

  var reviewForm = new TextField(null, "subject", 'mdc-text-field--textarea');
  //reviewForm.input.setAttribute('value', place.name);
  content.appendChild(reviewForm.root_);

  var footer = document.createElement('div');
  var button = new IconButton(dialogIcon,"mdc-button--raised mdc-image__circular");
  footer.appendChild(button.root_);

  button.listen('click', () => {
    if(value == null){
      var snackbar = new SnackBar('Please add a star rating.');
      snackbar.open();
      snackbar.listen("MDCSnackbar:closed",() => {
        document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
      });
      return;
    }else {
      var snackbar = new SnackBar('Review Added succesfully');
      snackbar.open();
      snackbar.listen("MDCSnackbar:closed",() => {
        document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
      });
      dialog.close();
      map.pageDrawer.open = false;
    }

    xhr = new XMLHttpRequest();
    xhr.open('POST', '/new_review');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = async function(){
      for(var i in map.places){
        var olcR = OpenLocationCode.encode(map.places[i].getPosition().lat(), map.places[i].getPosition().lng(), OpenLocationCode.CODE_PRECISION_NORMAL);
        if (olcR == olc){
          map.places[i].place.media_rating = await getRating(olc);
        }
      }
    }
    xhr.send(JSON.stringify({token: token, OLC: olc, rating_place: value, comment:reviewForm.value}))
  })

  var dialog = new Dialog(content,footer,dialogTitle);
  document.getElementById('map').appendChild(dialog.root_);
  dialog.open();

}

function getRating(olc){
  return new Promise((resolve,reject) =>{
    xhr.open('POST', '/find_place');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
      resolve(JSON.parse(xhr.response)[0].media_rating);
    }
    xhr.send(JSON.stringify({OLC: olc}));
  })
}
