class IconButton extends mdc.iconButton.MDCIconButtonToggle{
    constructor(icon) {
        var item = document.createElement('button');
        item.className = "mdc-icon-button mdc-button--raised material-icons";
        item.innerHTML = icon;

        super(item);
    }
}
