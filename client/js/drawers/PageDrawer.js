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

  super(null, null, contentcontent);
    this.topBarDrawer = topBarDrawer;
  }

  setPageTitle(newTitle){
    this.topBarDrawer.setTitle(newTitle);
  }
}
