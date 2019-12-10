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

<<<<<<< HEAD
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
=======
  super(null, null, contentcontent, 'page-drawer-content');
  this.topBarDrawer = topBarDrawer;

  document.querySelector('.page-drawer-content').nextElementSibling.id = 'closed-scrim';
  document.querySelector('.page-drawer-content').nextElementSibling.className = '';

  this.listen('MDCDrawer:closed', () => {
    document.querySelector('.main-content').removeChild(document.querySelector('.page-drawer-content'));
    document.querySelector('.main-content').removeChild(document.querySelector('#closed-scrim'));
  });
>>>>>>> 714db1975723a2d91d3cf1033c58982146d9ab15
  }

  setPageTitle(newTitle){
    this.topBarDrawer.setTitle(newTitle);
  }
}
