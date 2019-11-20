class FormField extends mdc.formField.MDCFormField{
    constructor(element, label) {
        var item = document.createElement('div');
        item.className = "mdc-form-field";
        item.appendChild(element);

        var label = document.createElement('label');
        label.setAttribute('for', element.id);
        label.innerHTML = label;

        item.appendChild(label);

        this.input = element;
        super(item);
    }
}
