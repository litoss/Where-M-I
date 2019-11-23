class Menu extends mdc.topAppBar.MDCTopAppBar{
  constructor(){
    var header = document.createElement('header');
    header.className = "mdc-top-app-bar mdc-top-app-bar--relative mdc-top-app-bar--dense";
    header.id = "content_header";
    header.style.margin = '8px';
    header.style.border = '1px solid rgba(0,0,0,.12)';
    header.style.borderRadius = '8px';

    var div = document.createElement('div');
    div.className = "mdc-top-app-bar__row";
    header.appendChild(div);

    var start = document.createElement('section');
    start.className = "mdc-top-app-bar__section mdc-top-app-bar__section--align-start";
    div.appendChild(start);

    var menu = new IconButton('menu');
    menu.root_.className += "material-icons mdc-top-app-bar__navigation-icon mdc-icon-button";
    start.appendChild(menu.root_);

    var title = document.createElement('span');
    title.className = "mdc-top-app-bar__title";
    title.appendChild(document.createTextNode("Where M I"));
    start.appendChild(title);

    var end = document.createElement('section');
    end.className = "mdc-top-app-bar__section mdc-top-app-bar__section--align-end";
    div.appendChild(end);

    var icon = new ImageButton('content/photo.png');
    icon.root_.className += " mdc-top-app-bar__navigation-icon";
    end.appendChild(icon.root_);

    super(header);

    this.title = title;
    this.end = end;

    this.listen('MDCTopAppBar:nav', () => {
      mainDrawer.open = !mainDrawer.open;
    });
  }
}
