class TextField extends mdc.textField.MDCTextField{
    constructor(name, format, required, maxLenght, icon) {
        var div = document.createElement('div');
        div.className = "mdc-text-field mdc-text-field--outlined";

        if(icon){
          div.className += ' ' + 'mdc-text-field--with-leading-icon';
          var leadingIcon = document.createElement('i');
          leadingIcon.className = 'material-icons mdc-text-field__icon';
          leadingIcon.innerHTML = icon;
          div.appendChild(leadingIcon);
        }

        var input = document.createElement('input');
        input.className = "mdc-text-field__input";
        input.setAttribute('type','text');
        if(required) input.setAttribute('required',true);
        if(format) input.setAttribute('placeholder',format);
        div.appendChild(input);

        var outline = document.createElement('div');
        outline.className = 'mdc-notched-outline';
        div.appendChild(outline);

        var leading = document.createElement('div');
        leading.className = 'mdc-notched-outline__leading';
        outline.appendChild(leading);


        var notch = document.createElement('div');
        notch.className = 'mdc-notched-outline__notch';
        outline.appendChild(notch);

        var floatingLabel = document.createElement('label');
        floatingLabel.className = 'mdc-floating-label';
        floatingLabel.innerHTML = name;
        notch.appendChild(floatingLabel);


        var trailing = document.createElement('div');
        trailing.className = 'mdc-notched-outline__trailing';
        outline.appendChild(trailing);

        super(div);
    }
}
