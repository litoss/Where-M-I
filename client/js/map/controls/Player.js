class Player{
  constructor(){
    this.root_ = document.createElement('div');
    this.root_.className = "mdc-theme--primary-bg mdc-theme--on-secondary";
    var back = new IconButton('arrow_back');
    var play = new IconButton('play_arrow');
    this.navigation = new IconButton('explore_off');
    this.navigation.root_.style.display = "none";
    var next = new IconButton('chevron_right');
    var forward = new IconButton('arrow_forward');

    this.root_.appendChild(back.root_)
    this.root_.appendChild(play.root_);
    this.root_.appendChild(this.navigation.root_);
    this.root_.appendChild(next.root_);
    this.root_.appendChild(forward.root_)

    forward.listen('click', () => {
      next();
    });

    this.navigation.listen('click', () => {
      stopNavigation();
    })

    back.listen('click', () => {
      previous();
    })

    next.listen('click', () => {
      more();
    })

    play.listen('click', (event) => {
      if(play.getIcon() == 'play_arrow' && !playlistPlace.lenght){
        start();
      }else if (play.getIcon() == 'play_arrow' && playlistPlace.lenght){
        play();
      }else if(play.getIcon() == 'pause'){
        pauseVideo();
      }else if(play.getIcon() == 'replay'){
        playVideo();
      }
    });
  }
}
