class Select extends mdc.select.MDCSelect {
  constructor(label, list, options){

    var item = document.createElement('div');
    item.className = 'mdc-select mdc-select--outlined';
    if(options) item.className += " " + options;

    var anchor = document.createElement('div');
    anchor.className = 'mdc-select__anchor';
    item.appendChild(anchor);

    var dropdownIcon = document.createElement('i');
    dropdownIcon.className = 'mdc-select__dropdown-icon';
    anchor.appendChild(dropdownIcon);

    var selectedText = document.createElement('div');
    selectedText.className = 'mdc-select__selected-text';
    anchor.appendChild(selectedText);

    var outline = document.createElement('div');
    outline.className = 'mdc-notched-outline';
    anchor.appendChild(outline);

    var leading = document.createElement('div');
    leading.className = 'mdc-notched-outline__leading';
    outline.appendChild(leading);

    var notch = document.createElement('div');
    notch.className = 'mdc-notched-outline__notch';
    outline.appendChild(notch);

    var trailing = document.createElement('div');
    trailing.className = 'mdc-notched-outline__trailing';
    outline.appendChild(trailing);


    var floatingLabel =  document.createElement('label');
    floatingLabel.className = 'mdc-floating-label';
    floatingLabel.innerHTML = label;
    notch.appendChild(floatingLabel);


    var listContainer = document.createElement('div');
    listContainer.className = 'mdc-select__menu mdc-menu mdc-menu-surface ';
    listContainer.setAttribute('role','listbox');
    listContainer.appendChild(list);

    item.appendChild(listContainer);

    super(item);

    this.selectedText = selectedText;
  }
}
