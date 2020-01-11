class Drawer extends mdc.drawer.MDCDrawer{

  constructor(topBar, content, options) {

    var div = document.createElement('div');

    var drawer = document.createElement('aside');
    drawer.className = "mdc-drawer";
    if(options) drawer.className += " " + options;

    if(topBar){
      topBar.className += " mdc-drawer__header";
      drawer.appendChild(topBar);
    }

    var drawerContent = document.createElement('div');
    drawerContent.className = "mdc-drawer__content";
    drawerContent.appendChild(content);
    drawer.appendChild(drawerContent);


    var parent = document.querySelector('#map');
    parent.appendChild(drawer);

    if(options && options.includes("mdc-drawer--modal")){
      var scrim = document.createElement('div');
      scrim.className = "mdc-drawer-scrim";
      parent.appendChild(scrim);
    }

    super(drawer);
  }
}
