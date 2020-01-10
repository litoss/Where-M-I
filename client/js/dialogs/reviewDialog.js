async function reviewDialog(){
  var content = document.createElement("div");

  var dialogTitle = 'Add a review for this place.';
  var dialogIcon = 'edit';

  var sliderContainer = document.createElement('div');
  sliderContainer.id = 'slider_container';
  content.appendChild(sliderContainer);

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
