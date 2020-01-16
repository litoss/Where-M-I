class Player{
  constructor(){
    var div = document.createElement('div');
    div.className = "mdc-theme--primary-bg mdc-theme--on-secondary";
    var back = new IconButton('arrow_back');
    var play = new IconButton('play_arrow');
    var next = new IconButton('chevron_right');
    var forward = new IconButton('arrow_forward');

    div.appendChild(back.root_)
    div.appendChild(play.root_);
    div.appendChild(next.root_);
    div.appendChild(forward.root_)

    forward.listen('click', () => {
        console.log("ciao");
    });

    play.listen('click', (event) => {
      if(play.getIcon() == 'play_arrow' && !playlistPlace.length){
        start();
      }else if (play.getIcon() == 'play_arrow' && playlistPlace.length){
        pla();
      }else if(play.getIcon() == 'pause'){
        pauseVideo();
      }else if(play.getIcon() == 'replay'){
        playVideo();
      }
    });

    return div;
  }
}
