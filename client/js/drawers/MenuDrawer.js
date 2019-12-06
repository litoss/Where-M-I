class MenuDrawer extends Drawer{
  constructor(){

  //Creo la lista di opzioni del menu
  var elements = [];

  //Aggiungo il sottotitolo browser
  var browserTag = document.createElement('h6');
  browserTag.className = 'mdc-list-group__subheader';
  browserTag.innerHTML = 'Browser';
  elements.push(browserTag);

  //Aggiungo gli elementi
  for(var i in browserElements) elements.push(new ElementList(browserElements[i].name,null,browserElements[i].icon));
  elements[1].className += " " + "mdc-list-item--activated";

  var div1 = document.createElement('hr');
  div1.className = 'mdc-list-divider';
  elements.push(div1);

  var editorTag = document.createElement('h6');
  editorTag.className = 'mdc-list-group__subheader';
  editorTag.innerHTML ='Editor';
  elements.push(editorTag);

  for(var i in editorElements) elements.push(new ElementList(editorElements[i].name,null,editorElements[i].icon));

  var div2 = document.createElement('hr');
  div2.className = 'mdc-list-divider';
  elements.push(div2);

  for(var i in otherElements) elements.push(new ElementList(otherElements[i].name,null,otherElements[i].icon));

  var nav = document.createElement('nav');
  nav.className = "mdc-list";
  for(var i in elements) nav.appendChild(elements[i]);

  //fine creazioen lista
  super(null, null, nav);

  this.listen('MDCDrawer:closed', () => {
    document.querySelector('.main-content').focus();
  });
  //listener sugli elementi

  this.listen('MDCList:action', (event) => {
    this.open = false;
    console.log(event.detail.index);
    switch(event.detail.index){
      case 1: openSearch();
        break;
      case 2: openCharts();
        break;
      case 3: openPlaces();
        break;
      case 6: openCheckListBrowser();
        break;
      case 8: openAbout();
        break;
    }
  });
  }
}