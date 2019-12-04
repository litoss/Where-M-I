class MenuDrawer {
  constructor(){

  var header = document.createElement('div');

  var browserTag = document.createElement('h6');
  browserTag.className = 'mdc-list-group__subheader';
  browserTag.innerHTML ='Browser';

  var editorTag = document.createElement('h6');
  editorTag.className = 'mdc-list-group__subheader';
  editorTag.innerHTML ='Editor';

  var div1 = document.createElement('hr');
  div1.className = 'mdc-list-divider';

  var div2 = document.createElement('hr');
  div2.className = 'mdc-list-divider';

  this.elements = [];
  this.elements.push(browserTag);
  for(var i in browserElements) this.elements.push(new ElementList(browserElements[i].name,null,browserElements[i].icon));
  this.elements.push(div1);
  this.elements.push(editorTag);
  for(var i in editorElements) this.elements.push(new ElementList(editorElements[i].name,null,editorElements[i].icon));
  this.elements.push(div2);
  for(var i in otherElements) this.elements.push(new ElementList(otherElements[i].name,null,otherElements[i].icon));
  var list = new List(this.elements);
  var drawerContent = new Drawer(header,list.root_);

  var scrim = document.createElement('div');
  scrim.className = 'mdc-drawer-scrim';

  document.querySelector('.main-content').appendChild(drawerContent.root_);
  document.querySelector('.main-content').appendChild(scrim);

  this.Drawer = mdc.drawer.MDCDrawer.attachTo(drawerContent.root_);

  document.body.addEventListener('MDCDrawer:closed', () => {
    document.querySelector('.main-content').focus();
  });

  //listener sugli elementi
    this.elements[1].addEventListener('click', function(){
      map.menuDrawer.openDrawer();
    });
    this.elements[2].addEventListener('click', function(){
      openSearch();
    });
    this.elements[3].addEventListener('click', function(){
      openCharts();
    });
    this.elements[6].addEventListener('click', function(){
      openPlaces();
    });
    this.elements[10].addEventListener('click', function(){
      openCheckListBrowser();
    });
    this.elements[12].addEventListener('click', function(){
      openAbout();
    });

  }


  openDrawer(){
    this.Drawer.open = !this.Drawer.open;
  }
}
