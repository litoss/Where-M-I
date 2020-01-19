class Player{
  constructor(){
    this.root_ = document.createElement('div');
    this.root_.className = "mdc-theme--primary-bg mdc-theme--on-secondary";
    var back = new IconButton('arrow_back');
    var playButton = new IconButton('play_arrow');
    this.navigation = new IconButton('explore_off');
    this.navigation.root_.style.display = "none";
    var nextButton = new IconButton('chevron_right');
    var forward = new IconButton('arrow_forward');

    this.root_.appendChild(back.root_)
    this.root_.appendChild(playButton.root_);
    this.root_.appendChild(this.navigation.root_);
    this.root_.appendChild(nextButton.root_);
    this.root_.appendChild(forward.root_)

    forward.listen('click', () => {
      console.log("ciao");
      next();
    });

    this.navigation.listen('click', () => {
      stopNavigation();
    })

    back.listen('click', () => {
      previous();
    })

    nextButton.listen('click', () => {
      more();
    })

    playButton.listen('click', (event) => {
      if(playButton.getIcon() == 'play_arrow' && (!playlist.lenght && !free)){
        start();
      }else if (playButton.getIcon() == 'play_arrow'){
        play();
      }else if(playButton.getIcon() == 'pause'){
        pauseVideo();
      }else if(playButton.getIcon() == 'replay'){
        playVideo();
      }
    });
  }
}
