class IconButtonToggle extends mdc.iconButton.MDCIconButtonToggle{
    constructor(icon_on, icon_off) {
        var item = document.createElement('button');
        item.className = "mdc-icon-button mdc-button--raised";
        item.innerHTML = '<i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">' + icon_on + '</i>' +
                        '<i class="material-icons mdc-icon-button__icon">' + icon_off + '</i>';
        super(item);
    }
}
