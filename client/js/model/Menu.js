class Menu extends mdc.menu.MDCMenu{
    constructor(list , options) {
        var div = document.createElement('div');
        div.className = "mdc-menu mdc-menu-surface" + options;
        div.appendChild(list);
        super(div);
    }
}
