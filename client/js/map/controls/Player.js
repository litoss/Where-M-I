class Player{
  constructor(){
    var div = document.createElement('div');
    div.className = "mdc-theme--primary-bg mdc-theme--on-secondary";
    var back = new IconButton('arrow_back');
    back.disabled = true;
    var play = new IconButtonToggle('pause', 'play_arrow');
    var next = new IconButton('chevron_right');
    var forward = new IconButton('arrow_forward');

    div.appendChild(back.root_)
    div.appendChild(play.root_);
    div.appendChild(next.root_);
    div.appendChild(forward.root_)

    forward.listen('click', () => {
        console.log("ciao");
    });

    play.listen('MDCIconButtonToggle:change', (event) => {
      if(event.detail.isOn){
        whereAmi();
      }else{
        pauseVideo();
      }
    });

    return div;
  }
}
