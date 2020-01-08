class TextField extends mdc.textField.MDCTextField{
    constructor(name, icon, options) {
        var div = document.createElement('div');
        div.className = "mdc-text-field mdc-text-field--outlined";
        if(options) div.className += " " + options;

        if(icon){
          div.className += ' ' + 'mdc-text-field--with-leading-icon';
          var leadingIcon = document.createElement('i');
          leadingIcon.className = 'material-icons mdc-text-field__icon';
          leadingIcon.innerHTML = icon;
          div.appendChild(leadingIcon);
        }

        var input;
        if(options && options.includes("mdc-text-field--textarea")){
          input = document.createElement('textarea');
          input.rows = "4";
        }else{
          input = document.createElement('input');
          input.type = "text";
        }
        input.className = "mdc-text-field__input";

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

        if(name) {
          var floatingLabel = document.createElement('label');
          floatingLabel.className = 'mdc-floating-label';
          floatingLabel.innerHTML = name;
          notch.appendChild(floatingLabel);
        }

        var trailing = document.createElement('div');
        trailing.className = 'mdc-notched-outline__trailing';
        outline.appendChild(trailing);

        super(div);

        this.input = input;
    }
    addTrailing(icon){
      this.root_.className += ' ' + 'mdc-text-field--with-trailing-icon';
      this.trailing = new IconButton(icon, "toolbar mdc-menu-surface--anchor");
      this.root_.appendChild(this.trailing.root_);
    }
}
