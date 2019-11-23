class TextField extends mdc.textField.MDCTextField{
    constructor(placeholder, icon) {
        var div = document.createElement('div');
        div.className = "mdc-text-field text-field mdc-text-field--outlined mdc-text-field--no-label mdc-text-field--with-trailing-icon";

        var input = document.createElement('input');
        input.className = "mdc-text-field__input";
        input.setAttribute('type','text');
        input.setAttribute('aria-label','Text field aria label');
        input.setAttribute('aria-describedby','text-field-outlined-no-label');
        input.setAttribute('placeholder',placeholder);
        div.appendChild(input);

        var i = document.createElement('i');
        i.className = 'material-icons mdc-text-field__icon';
        i.appendChild(document.createTextNode(icon));
        div.appendChild(i);

        var outline = document.createElement('div');
        outline.className = 'mdc-notched-outline mdc-notched-outline--no-label';
        div.appendChild(outline);

        var leading = document.createElement('div');
        leading.className = 'mdc-notched-outline__leading';
        outline.appendChild(leading);

        var trailing = document.createElement('div');
        trailing.className = 'mdc-notched-outline__trailing';
        outline.appendChild(trailing);

        super(div);
    }
}
