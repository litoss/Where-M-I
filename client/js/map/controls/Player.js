class Player{
  constructor(){
    var div = document.createElement('div');
    div.className = "mdc-theme--primary-bg mdc-theme--on-secondary";
    var back = new IconButton('chevron_left');
    var play = new IconButtonToggle('pause', 'play_arrow');
    var slider = new Slider();
    var forward = new IconButton('chevron_right');

    div.appendChild(back.root_)
    div.appendChild(play.root_);
    div.appendChild(slider.root_)
    div.appendChild(forward.root_)


    return div;

    play.listen('MDCIconButtonToggle:change', (event) => {
      if(event.detail.isOn){
        if(playlist) start();
        else _continue();
      }else{
        stop();
      }
    });
  }
}
