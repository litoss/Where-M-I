class IconButtonToggle extends mdc.iconButton.MDCIconButtonToggle{
    constructor(icon_on, icon_off, options) {
        var item = document.createElement('button');
        item.className = "mdc-icon-button";
        if(options) item.className += " " + options;
        item.innerHTML = '<i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">' + icon_on + '</i>' +
                        '<i class="material-icons mdc-icon-button__icon">' + icon_off + '</i>';
        super(item);
    }
}
