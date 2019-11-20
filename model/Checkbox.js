class Checkbox extends mdc.checkbox.MDCCheckbox{
    constructor(id) {
        var item = document.createElement('div');
        item.className = "mdc-checkbox";
        item.innerHTML =
        '<input type="checkbox" id="' + id + '" class="mdc-checkbox__native-control"/>' +
        '<div class="mdc-checkbox__background"></div>';

        super(item);
    }
}
