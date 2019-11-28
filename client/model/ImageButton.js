class ImageButton extends mdc.ripple.MDCRipple{
  constructor(src, options){
    var button = document.createElement('button');
    button.className = "mdc-icon-button ";
    if(options) button.className += options;

    var img = document.createElement('img');
    img.className = "mdc-icon-button__icon mdc-image__circular";
    img.setAttribute('src', src);
    button.appendChild(img);
    
    super(button);
    this.unbounded = true;
    this.img = img;
  }

  setImage(newSrc){
    this.img.setAttribute('src', newSrc);
  }
}
