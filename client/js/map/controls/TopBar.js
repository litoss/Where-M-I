class TopBar {
  constructor(){
    this.menu = new IconButton('menu',"mdc-top-app-bar__navigation-icon");
    this.icon = new ImageButton('content/photo.png');

    var settingsButton = new IconButton('settings');
    settingsButton.listen('click',openSettings);
    this.loginCard = new Card("Guest",null,null,"content/photo.png",null,[settingsButton.root_],'login-card');

    this.button = document.createElement('div');
    this.button.className = 'login-button';
    this.render(this.button);


    this.menus = new Menu(new List([this.loginCard.root_,this.button]).root_, ' login-menu');
    this.menus.setAbsolutePosition(-250,48);

    var anchor = document.createElement('div');
    anchor.className = "mdc-menu-surface--anchor";
    anchor.appendChild(this.icon.root_);
    anchor.appendChild(this.menus.root_);

    this.topBar = new TopAppBar('Where M I ?', this.menu.root_, anchor, "mdc-top-app-bar--relative mdc-top-app-bar--dense main-topbar");

    this.icon.listen('click', () => {
      this.menus.open= !this.menus.open;
    })

    this.topBar.listen('MDCTopAppBar:nav', () => {
      map.menuDrawer.open = true;
      map.menuDrawer.elements[2].focus();
    });
  }

  render(button){
    gapi.signin2.render(button, {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': false,
        'theme': 'dark',
        'onsuccess': this.onSuccess,
        'onfailure': this.onFailure
    });
  }

  onSuccess(googleUser) {
    profile = googleUser.getBasicProfile();
    map.topBar.icon.setImage(profile.getImageUrl());

    map.topBar.loginCard.setTitle(profile.getName());
    map.topBar.loginCard.setImage(profile.getImageUrl());
    for(var i=6; i<9; i++) {
      map.menuDrawer.elements[i].className = "mdc-list-item";
    }
    var action = new ActionButton('signout');
    map.topBar.button.innerHTML = '';
    map.topBar.button.appendChild(action);

    map.topBar.button.addEventListener('click', function(){
      map.topBar.signOut();
    });
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      profile = null;

      map.topBar.icon.setImage("content/photo.png");
      map.topBar.loginCard.setTitle("Guest");
      map.topBar.loginCard.setImage("content/photo.png");

      map.topBar.button.innerHTML = '';
      map.topBar.render(map.topBar.button);

      for(var i=6; i<9; i++) {
        map.menuDrawer.elements[i].className += " mdc-list-item--disabled";
      }
    });
  }

  onFailure(error) {
    console.log(error);
  }
}
