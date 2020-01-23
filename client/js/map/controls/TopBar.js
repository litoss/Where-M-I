class TopBar {
  constructor(){
    this.menu = new IconButton('menu',"mdc-top-app-bar__navigation-icon");
    this.icon = new ImageButton('content/photo.png');
    this.authorizeButton = new ActionButton('Accedi');
    this.authorizeButton.root_.style.display = "none";
    this.signoutButton = new ActionButton('Disconnetti');
    this.signoutButton.root_.style.display = "none";
    var settingsButton = new IconButton('settings');

    this.loginCard = new Card("Guest",null,null,"content/photo.png",[this.authorizeButton.root_, this.signoutButton.root_],[settingsButton.root_],'login-card');
    var list = new List();
    list.add(this.loginCard.root_);
    this.menus = new Menu(list.root_, 'login-menu');
    this.menus.setAbsolutePosition(-250,48);

    var anchor = document.createElement('div');
    anchor.className = "mdc-menu-surface--anchor";
    anchor.appendChild(this.icon.root_);
    anchor.appendChild(this.menus.root_);

    this.topBar = new TopAppBar('Where Am I', this.menu.root_, anchor, "mdc-top-app-bar--relative mdc-top-app-bar--dense main-topbar");

    this.icon.listen('click', () => {
      this.menus.open = !this.menus.open;
    })

    this.topBar.listen('MDCTopAppBar:nav', () => {
      menuDrawer.open = true;
    });

    settingsButton.listen('click',openSettings);
  }
}
