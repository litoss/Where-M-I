class ImageButton extends mdc.ripple.MDCRipple{
  constructor(src, options){
    var button = document.createElement('button');
    button.className = "mdc-icon-button " + options;
    button.innerHTML = "<img class='mdc-icon-button__icon mdc-image__circular' src='" + src + "'></img>";

    super(button);
  }
}
