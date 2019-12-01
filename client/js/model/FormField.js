class FormField extends mdc.formField.MDCFormField{
    constructor(element, lab) {
        var item = document.createElement('div');
        item.className = "mdc-form-field";
        item.appendChild(element.root_);

        var label = document.createElement('label');
        label.setAttribute('for', element.id);
        label.innerHTML = lab;

        item.appendChild(label);

        super(item);
        this.input = element;

    }
}
