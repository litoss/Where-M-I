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

  super(topBarDrawer.root_, contentcontent, 'mdc-drawer--dismissible');
  this.topBarDrawer = topBarDrawer;

  this.listen('MDCDrawer:closed', () => {
    document.querySelector('.mdc-drawer--dismissible').remove();
    map.pageDrawer = null;
  });
  }

  setPageTitle(newTitle){
    this.topBarDrawer.setTitle(newTitle);
  }
}
