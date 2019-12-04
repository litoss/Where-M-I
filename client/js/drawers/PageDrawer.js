class PageDrawer {
  constructor(content){

  var topBarDrawer = document.createElement('header');
  topBarDrawer.className = 'mdc-top-app-bar mdc-top-app-bar--relative';

  var div = document.createElement('div');
  div.className = 'mdc-top-app-bar__row';

  var startSection = document.createElement('section');
  startSection.className = 'mdc-top-app-bar__section mdc-top-app-bar__section--align-start';

  var homeButton = document.createElement('button');
  homeButton.className = 'material-icons mdc-top-app-bar__navigation-icon mdc-icon-button';
  homeButton.innerHTML = 'menu';

  homeButton.addEventListener('click',function(){
    map.pageDrawer.openPageDrawer();
    map.menuDrawer.openDrawer();
  })

  this.pageName = document.createElement ('span');
  this.pageName.className = 'mdc-top-app-bar__title';

  startSection.appendChild(homeButton);
  startSection.appendChild(this.pageName);
  div.appendChild(startSection);
  topBarDrawer.appendChild(div);

  var drawerContent = new Drawer(topBarDrawer,content);
  document.querySelector('.main-content').appendChild(drawerContent.root_);
  this.PageDrawer = mdc.drawer.MDCDrawer.attachTo(drawerContent.root_);
  }

  openPageDrawer(){
    this.PageDrawer.open = !this.PageDrawer.open;
  }

  setPageTitle(newTitle){
    this.pageName.innerHTML= newTitle;
  }
}
