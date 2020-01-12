class ActionButton extends mdc.ripple.MDCRipple{
  constructor(name,options) {
      var item = document.createElement('button');
      item.className = "mdc-button mdc-card__action mdc-card__action--button";
      if(options) item.className += " " + options;
      item.innerHTML = name;

      super(item);
  }
}
