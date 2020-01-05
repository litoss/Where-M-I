class Radio extends mdc.radio.MDCRadio{

  constructor(id){
    var radio = document.createElement('div');
    radio.className = "mdc-radio";

    var input = document.createElement('input');
    input.className = "mdc-radio__native-control";
    input.type = "radio";
    input.name = "radios";
    input.id = id;
    input.checked;
    radio.appendChild(input);

    var background = document.createElement('div');
    background.className = "mdc-radio__background";
    radio.appendChild(background);

    var outer = document.createElement('div');
    outer.className = "mdc-radio__outer-circle";
    background.appendChild(outer);

    var inner = document.createElement('div');
    inner.className = "mdc-radio__inner-circle";
    background.appendChild(inner);

    var ripple = document.createElement('div');
    ripple.className = "mdc-radio__ripple";
    radio.appendChild(ripple);

    super(radio);
  }
}
