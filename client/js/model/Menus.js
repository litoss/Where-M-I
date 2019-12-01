class Menus extends mdc.menu.MDCMenu{
    constructor(obj) {
        var div = document.createElement('div');
        div.className = "mdc-menu mdc-menu-surface";
        div.appendChild(obj);
        super(div);
    }
}
