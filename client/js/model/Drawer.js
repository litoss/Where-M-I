class Drawer{
  constructor(headerContent, mainContent) {
    this.root_ = document.createElement('aside');
    this.root_.className = "mdc-drawer mdc-drawer--modal";
    var header =document.createElement('div');

    var content = document.createElement('div');
    content.className = "mdc-drawer__content";

    header.appendChild(headerContent);
    content.appendChild(mainContent);
    this.root_.appendChild(header);
    this.root_.appendChild(content);

  }
}
