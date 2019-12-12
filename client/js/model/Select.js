class Select extends mdc.select.MDCSelect {
  constructor(label, list, options){

    var item = document.createElement('div');
    item.className = 'mdc-select';
    if(options) item.className += " " + options;

    var anchor = document.createElement('div');
    anchor.className = 'mdc-select__anchor';

    var dropdownIcon = document.createElement('i');
    dropdownIcon.className = 'mdc-select__dropdown-icon';

    var selectedText = document.createElement('div');
    selectedText.className = 'mdc-select__selected-text';

    var floatingLabel =  document.createElement('span');
    floatingLabel.className = 'mdc-floating-label';
    floatingLabel.innerHTML = label;

    var lineRipple = document.createElement('div');
    lineRipple.className = 'mdc-line-ripple';

    anchor.appendChild(dropdownIcon);
    anchor.appendChild(selectedText);
    anchor.appendChild(floatingLabel);
    anchor.appendChild(lineRipple);

    var listContainer = document.createElement('div');
    listContainer.className = 'mdc-select__menu mdc-menu-surface ';
    listContainer.appendChild(list);

    item.appendChild(anchor);
    item.appendChild(listContainer);

    super(item);
  }
}
