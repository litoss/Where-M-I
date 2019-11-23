class IconButton extends mdc.iconButton.MDCIconButtonToggle{
    constructor(icon, options) {
        var item = document.createElement('button');
        item.className = "mdc-icon-button material-icons " + options;
        item.innerHTML = icon;

        super(item);
    }
}
