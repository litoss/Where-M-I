class Tab extends mdc.tabBar.MDCTabBar{
  constructor(icon, name) {
    var button = document.createElement('button');
    button.className = 'mdc-tab mdc-tab--stacked';
    button.setAttribute('role','tab');
    button.setAttribute('aria-selected','false');
    button.setAttribute('tabindex','-1');

    var content = document.createElement('span');
    content.className = 'mdc-tab__content';
    button.appendChild(content);

    var ico = document.createElement('span');
    ico.className = 'mdc-tab__icon material-icons';
    ico.setAttribute('aria-hidden','true');
    ico.appendChild(document.createTextNode(icon));
    content.appendChild(ico);

    var text = document.createElement('span');
    text.className = 'mdc-tab__text-label';
    text.appendChild(document.createTextNode(name));
    content.appendChild(text);

    var indicator = document.createElement('span');
    indicator.className = 'mdc-tab-indicator';
    content.appendChild(indicator);

    var indicatorContent = document.createElement('span');
    indicatorContent.className = 'mdc-tab-indicator__content mdc-tab-indicator__content--underline';
    indicator.appendChild(indicatorContent);

    var ripple = document.createElement('span');
    ripple.className = 'mdc-tab__ripple mdc-ripple-upgraded';
    button.appendChild(ripple);

    super(button);
  }
}
