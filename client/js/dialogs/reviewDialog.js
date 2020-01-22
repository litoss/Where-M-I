async function reviewDialog(olc){

  var content = document.createElement("div");

  var star = [];
  for(var i=0;i<5;i++){
    star[i] = new IconButton('star_border');
    content.appendChild(star[i].root_);

    (function(i){
      star[i].listen('click', () => {
        for(var j=0;j<5;j++){
          if(j<=i) star[j].setIcon('star');
          else star[j].setIcon('star_border');
        }
      });
    })(i);
  }

  var reviewForm = new TextField(null, "subject", 'mdc-text-field--textarea');
  content.appendChild(reviewForm.root_);

  var footer = document.createElement('div');

  var button = new IconButton('edit',"mdc-button--raised mdc-image__circular");
  footer.appendChild(button.root_);

  var dialog = new Dialog(content,footer,'Add a review for this place');
  document.getElementById('map').appendChild(dialog.root_);
  dialog.open();

  button.listen('click', () => {

    var countStar = 0;
    for(var i=0;i<5;i++) if(star[i].getIcon() == 'star') countStar++;

    if(!countStar){
      var snackbar = new SnackBar('Please add a star rating.');
      snackbar.open();
    }else {
      addReview(olc, countStar, reviewForm.value);
      dialog.close();
      pageDrawer.open = false;
    }
  });
}
