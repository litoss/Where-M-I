async function reviewDialog(){
  var content = document.createElement("div");

  var dialogTitle = 'Add a review for this place.';
  var dialogIcon = 'edit';

  var sliderContainer = document.createElement('div');
  sliderContainer.id = 'slider_container';
  content.appendChild(sliderContainer);

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

  var slider = new Slider('mdc-slider--discrete');
  sliderContainer.appendChild(slider.root_);
  slider.min = '0';
  slider.max = '5';

  slider.listen('MDCSlider:change', () => console.log(`Value changed to ${slider.value}`));

  var reviewForm = new TextField(null, "subject", 'mdc-text-field--textarea');
  //reviewForm.input.setAttribute('value', place.name);
  content.appendChild(reviewForm.root_);

  var footer = document.createElement('div');
  var button = new IconButton(dialogIcon,"mdc-button--raised mdc-image__circular");
  footer.appendChild(button.root_);

  var dialog = new Dialog(content,footer,dialogTitle);
  document.getElementById('map').appendChild(dialog.root_);
  dialog.open();

  dialog.listen('MDCDialog:opened', () => {
  slider.layout();
  });

  slider.value ="3";
}
