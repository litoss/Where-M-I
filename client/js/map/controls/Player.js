class Player{
  constructor(){
    var div = document.createElement('div');
    div.className = "mdc-theme--primary-bg";
    var back = new IconButton('arrow_back_ios');
    var play = new IconButtonToggle('pause-circle_filled', 'play_arrow');
    var slider = new Slider();
    var forward = new IconButton('arrow_forward_ios');

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
