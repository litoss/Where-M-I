class Player{
  constructor(){
    var div = document.createElement('div');
    div.className = "mdc-player";
    var play = new IconButton('play_arrow');
    play.unbounded = true;

    var slider = new Slider();

    div.appendChild(play.root_);
    div.appendChild(slider.root_);

    slider.listen('MDCSlider:change', () => console.log(`Value changed to ${slider.value}`));
    play.listen('click', () => {
      slider.disabled = false;
    });
    return div;
  }
}