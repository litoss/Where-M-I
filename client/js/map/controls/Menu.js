class Menu extends TopAppBar{
  constructor(){

    var menu = new IconButton('menu');
    var icon = new ImageButton('content/photo.png');

    var toolbar = document.createElement('div');
    var card = new CardTemp("Guest",null,null,"content/photo.png");
    card.className = "about-card";
    var loginButton = document.createElement('div');
    render(loginButton);
    var menuList = new List([card,loginButton]);
    var menus = new Menus(menuList.root_);
    toolbar.appendChild(menus.root_);

    super('Where M I', menu.root_, icon.root_, toolbar, "mdc-top-app-bar--relative mdc-top-app-bar--dense");

    this.icon = icon;
    this.menus = menus;
    
    icon.listen('click', () => {
      menus.open= !menus.open;
    })

    this.listen('MDCTopAppBar:nav', () => {
      mainDrawer.open = !mainDrawer.open;
    });
  }
}
