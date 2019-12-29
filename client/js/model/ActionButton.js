class ActionButton extends mdc.ripple.MDCRipple{
  constructor(name,options) {
      var item = document.createElement('button');
      item.className = "mdc-button mdc-card__action mdc-card__action--button mdc-button--raised";
      if(options) item.className += " " + options;
      item.innerHTML = name;

      super(item);
  }
}
