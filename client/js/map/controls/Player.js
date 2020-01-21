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

    this.back = new IconButton('arrow_back');
    this.back.root_.disabled = true;
    this.playButton = new IconButton('play_arrow');
    this.navigation = new IconButton('explore_off');
    this.navigation.root_.disabled = true;
    this.nextButton = new IconButton('chevron_right');
    this.nextButton.root_.disabled = true;
    this.forward = new IconButton('arrow_forward');
    this.forward.root_.disabled = true;

    this.root_.appendChild(this.back.root_)
    this.root_.appendChild(this.navigation.root_);
    this.root_.appendChild(this.playButton.root_);
    this.root_.appendChild(this.nextButton.root_);
    this.root_.appendChild(this.forward.root_)

    nav.addEventListener('click', () => {
      openSelectPaths();
    });

    this.forward.listen('click', () => {
      next();
    });

    this.navigation.listen('click', () => {
      stopNavigation();
    });

    this.back.listen('click', () => {
      previous();
    });

    this.nextButton.listen('click', () => {
      more(this.playButton);
    });

    this.playButton.listen('click', () => {
      wheremi(this.playButton);
    });
  }

  setTitle(div){
    this.title.innerHTML = div;
  }

  setImg(img){
    this.img.src = img;
  }
}
