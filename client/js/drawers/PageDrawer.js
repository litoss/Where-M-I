class PageDrawer extends Drawer{
  constructor(title, content){

  var contentcontent = document.createElement('div');

  var menu = new IconButton('menu');
  var topBarDrawer = new TopAppBar(title, menu.root_, null , 'mdc-top-app-bar--relative');

  menu.listen('click', () => {
    this.open = false;
    map.menuDrawer.open = true;
  })

  contentcontent.appendChild(topBarDrawer.root_);
  contentcontent.appendChild(content);

  super(null, null, contentcontent, 'mdc-drawer-content');
  this.topBarDrawer = topBarDrawer;

  document.querySelector('.mdc-drawer-content').nextElementSibling.id = 'closed-scrim';
  document.querySelector('.mdc-drawer-content').nextElementSibling.className = '';

  this.listen('MDCDrawer:closed', () => {
    document.querySelector('.main-content').removeChild(document.querySelector('.mdc-drawer-content'));
    document.querySelector('.main-content').removeChild(document.querySelector('#closed-scrim'));
  });
  }

  setPageTitle(newTitle){
    this.topBarDrawer.setTitle(newTitle);
  }
}
