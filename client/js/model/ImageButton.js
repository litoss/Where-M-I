class ImageButton extends mdc.ripple.MDCRipple{
  constructor(src, options){
    var root = document.createElement('button');
    root.className = "mdc-icon-button";
    if(options) root.className += " " + options;

    var img = document.createElement('img');
    img.className = "mdc-icon-button__icon mdc-image__circular";
    img.setAttribute('src', src);
    root.appendChild(img);

    super(root);
    this.unbounded = true;
    this.img = img;
  }

  setImage(newSrc){
    this.img.setAttribute('src', newSrc);
  }
}
