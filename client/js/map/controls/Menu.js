class Menu extends TopAppBar{
  constructor(){

    var menu = new IconButton('menu');
    var icon = new ImageButton('content/photo.png');

    super('Where M I', menu.root_, icon.root_, "mdc-top-app-bar--relative mdc-top-app-bar--dense");

    this.icon = icon;
    loginDialog();

    icon.listen('click', () => {
      document.getElementById('map').appendChild(dialog.root_);
      dialog.open();
    })

    this.listen('MDCTopAppBar:nav', () => {
      mainDrawer.open = !mainDrawer.open;
    });
  }
}
