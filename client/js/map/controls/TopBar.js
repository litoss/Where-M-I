class TopBar {
  constructor(){
    this.menu = new IconButton('menu',"mdc-top-app-bar__navigation-icon");
    this.icon = new ImageButton('content/photo.png',);
    this.card = new Card("Guest",null,null,"content/photo.png");
    this.card.root_.className += " about-card";
    this.button = document.createElement('div');
    this.render(this.button);


    this.menus = new Menu(new List([this.card.root_,this.button]).root_);
    this.menus.setAnchorCorner(mdc.menu.Corner.TOP_RIGHT);
    console.log(mdc.menu.Corner.TOP_RIGHT);
    this.menus.setAnchorCorner(mdc.menu.Corner.TOP_RIGHT);

  //  this.surf = new mdc.menuSurface.MDCMenuSurface(this.menus.root_);

    var anchor = document.createElement('div');
    anchor.className = "mdc-menu-surface--anchor";
    anchor.appendChild(this.icon.root_);
    anchor.appendChild(this.menus.root_);

    this.topBar = new TopAppBar('Where M I', this.menu.root_, anchor, "mdc-top-app-bar--relative mdc-top-app-bar--dense");

    this.icon.listen('click', () => {
    //  this.menus.setAnchorCorner(mdc.menu.Corner.TOP_LEFT);
      this.menus.open= !this.menus.open;
    })

    this.topBar.listen('MDCTopAppBar:nav', () => {
      map.menuDrawer.open = true;
    });
    console.log(this.topBar.root_);
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
    console.log('user logged in');


    map.topBar.card.setTitle(profile.getName());
    map.topBar.card.setImage(profile.getImageUrl());

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

      map.topBar.card.setTitle("Guest");
      map.topBar.card.setImage("content/photo.png");

      map.topBar.button.innerHTML = '';
      map.topBar.render(map.topBar.button);
    });
  }

  onFailure(error) {
    console.log(error);
  }
}
