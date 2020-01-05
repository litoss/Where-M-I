class PageDrawer extends Drawer{
  constructor(title, content){

    var contentcontent = document.createElement('div');

    var menu = new IconButton('menu');
    var clear = new IconButton('clear');
    var topBarDrawer = new TopAppBar(title, menu.root_, clear.root_ , 'mdc-top-app-bar--relative');

    menu.listen('click', () => {
      this.open = false;
      map.menuDrawer.open = true;
    })

    clear.listen('click', () => {
      this.open = false;
    })

    contentcontent.appendChild(topBarDrawer.root_);
    contentcontent.appendChild(content);

  super(null, null, contentcontent, 'mdc-drawer--dismissible');
  this.topBarDrawer = topBarDrawer;

  this.listen('MDCDrawer:closed', () => {
    map.pageDrawer = null;
    document.querySelector('.main-content').removeChild(document.querySelector('.page-drawer-content'));
    document.querySelector('.main-content').removeChild(document.querySelector('#closed-scrim'));
  });

  }

  setPageTitle(newTitle){
    this.topBarDrawer.setTitle(newTitle);
  }
}
