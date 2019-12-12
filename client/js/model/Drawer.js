class Drawer extends mdc.drawer.MDCDrawer{

  constructor(title, subtitle, content, options) {

    var div = document.createElement('div');

    var drawer = document.createElement('aside');
    drawer.className = "mdc-drawer mdc-drawer--modal";
    if(options) drawer.className += " " + options;

    if(title || subtitle){
      var drawerHeader = document.createElement('div');
      drawerHeader.className = "mdc-drawer__header";
      drawer.appendChild(drawerHeader);

      if(title){
        var drawerTitle = document.createElement('h3');
        drawerTitle.className = "mdc-drawer__title";
        drawerTitle.innerHTML = title;
        drawerHeader.appendChild(drawerTitle);
      }

      if(subtitle){
        var drawerSubtitle = document.createElement('h6');
        drawerSubtitle.className = "mdc-drawer__subtitle";
        drawerSubtitle.innerHTML = subtitle;
        drawerHeader.appendChild(drawerSubtitle);
      }
    }

    var drawerContent = document.createElement('div');
    drawerContent.className = "mdc-drawer__content";
    drawerContent.appendChild(content);
    drawer.appendChild(drawerContent);

    var scrim = document.createElement('div');
    scrim.className = "mdc-drawer-scrim";

    var parent = document.querySelector('#map');

    parent.appendChild(drawer);
    parent.appendChild(scrim);

    super(drawer);
  }
}
