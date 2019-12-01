class Dialog extends mdc.dialog.MDCDialog{
  constructor(mainContent, footerContent, title) {
    var item = document.createElement('div');
    item.className = "mdc-dialog";
    var container = document.createElement('div');
    container.className = "mdc-dialog__container";
    var surface = document.createElement('div');
    surface.className = "mdc-dialog__surface";
    if (title != null){
      var dialogTitle = document.createElement("h2");
      dialogTitle.className = "mdc-dialog__title";
      dialogTitle.innerHTML = title;
      surface.appendChild(dialogTitle);
    }
    var content = document.createElement('div');
    content.className = "mdc-dialog__content";
    var footer = document.createElement('footer');
    footer.className = "mdc-dialog_actions";
    var scrim = document.createElement('div');
    scrim.className = "mdc-dialog__scrim";

    footer.appendChild(footerContent);
    content.appendChild(mainContent);
    surface.appendChild(content);
    surface.appendChild(footer);
    container.appendChild(surface);
    item.appendChild(container);
    item.appendChild(scrim);

    super(item);
  }
}
