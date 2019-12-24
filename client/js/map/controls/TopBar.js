class TopBar {
  constructor(){
    this.menu = new IconButton('menu',"mdc-top-app-bar__navigation-icon");
    this.icon = new ImageButton('content/photo.png');

    var settingsButton = new IconButton('settings');
    settingsButton.listen('click',openSettings);
    this.loginCard = new Card("Guest",null,null,"content/photo.png",null,[settingsButton.root_],'login-card');

    this.authorizeButton = new ActionButton('Accedi');
    this.signoutButton = new ActionButton('Disconnetti');

    var list = new List();
    list.addElement(this.loginCard.root_);
    list.addElement(this.authorizeButton);
    list.addElement(this.signoutButton);
    this.menus = new Menu(list.root_, 'login-menu');
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
      //map.menuDrawer.elements[1].focus();
    });
  }
}
