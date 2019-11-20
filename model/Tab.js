class Tab extends mdc.tabBar.MDCTabBar{
  constructor(element) {
    var item = document.createElement('button');
    item.className = 'mdc-tab';
    item.setAttribute('role','tab');
    item.setAttribute('aria-selected','false');
    item.setAttribute('tabindex','-1');
    item.innerHTML = '<span class="mdc-tab__content">' +
                        '<span class="mdc-tab__icon material-icons" aria-hidden="true">' + element.icon +'</span>' +
                        '<span class="mdc-tab__text-label">' + element.name + '</span>' +
                        '<span class="mdc-tab-indicator">' +
                          '<span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>' +
                        '</span>' +
                      '</span>' +
                      '<span class="mdc-tab__ripple mdc-ripple-upgraded"></span>';

    super(item);
  }
}
