class TopBar {
  constructor(){
    this.menu = new IconButton('menu',"mdc-top-app-bar__navigation-icon");
    this.icon = new ImageButton('content/photo.png',);

    this.img = document.createElement('img');
    this.img.className = 'login-img'
    this.img.src = 'content/photo.png';
    this.name = document.createElement('h3');
    this.name.className = 'login-name'
    this.name.innerHTML = 'Guest';
    this.button = document.createElement('div');
    this.button.className = 'login-button';
    this.render(this.button);


    this.menus = new Menu(new List([this.img,this.name,this.button]).root_, ' login-menu');
    this.menus.setAbsolutePosition(-250,48);


  //  this.surf = new mdc.menuSurface.MDCMenuSurface(this.menus.root_);

    var anchor = document.createElement('div');
    anchor.className = "mdc-menu-surface--anchor";
    anchor.appendChild(this.icon.root_);
    anchor.appendChild(this.menus.root_);

    this.topBar = new TopAppBar('Where M I ?', this.menu.root_, anchor, "mdc-top-app-bar--relative mdc-top-app-bar--dense main-topbar");

    this.icon.listen('click', () => {
    //  this.menus.setAnchorCorner(mdc.menu.Corner.TOP_LEFT);
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
    console.log(profile);
    map.topBar.icon.setImage(profile.getImageUrl());
    map.topBar.name.innerHTML = profile.getName();
    map.topBar.img.src = profile.getImageUrl();
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
      map.topBar.name.innerHTML = "Guest";
      map.topBar.img.src = "content/photo.png";

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
