class Menu extends mdc.menu.MDCMenu{
    constructor(list) {
        var div = document.createElement('div');
        div.className = "mdc-menu mdc-menu-surface";
        div.appendChild(list);
        super(div);
    }
}
