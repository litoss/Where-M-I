class TabBar extends mdc.tabBar.MDCTabBar{
    constructor(icons, names) {
        var item = document.createElement('div');
        item.className = "mdc-tab-bar";

        var scroller = document.createElement('div');
        scroller.className = 'mdc-tab-scroller';
        item.appendChild(scroller);

        var area = document.createElement('div');
        area.className = 'mdc-tab-scroller__scroll-area';
        scroller.appendChild(area);

        var cont = document.createElement('div');
        cont.className = "mdc-tab-scroller__scroll-content";
        area.appendChild(cont);

        for(var i in icons) cont.appendChild(new Tab(icons[i], names[i]).root_);

        super(item);
    }
}
