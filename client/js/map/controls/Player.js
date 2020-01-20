class Player{
  constructor(){
    this.root_ = document.createElement('div');
    this.root_.className = "mdc-theme--primary-bg mdc-theme--on-secondary mdc-player";

    var nav = document.createElement('div');
    nav.className = 'mdc-list-item';

    this.img = document.createElement('img');
    this.img.className = 'mdc-list-item__graphic';
    this.img.src = 'content/favicon.ico';
    nav.appendChild(this.img);

    this.title = document.createElement('h3');
    this.title.innerHTML = 'Press play to start navigation';
    nav.appendChild(this.title);

    this.root_.appendChild(nav);

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
      if(playButton.getIcon() == 'play_arrow' && (!playlist.length && !free)){
        start();
      }else if (playButton.getIcon() == 'play_arrow'){
        play(playButton);
      }else if(playButton.getIcon() == 'pause'){
        pauseVideo();
      }else if(playButton.getIcon() == 'replay'){
        playVideo();
      }
    });
  }

  setTitle(div){
    this.title.innerHTML = div;
  }

  setImg(img){
    this.img.src = img;
  }
}
