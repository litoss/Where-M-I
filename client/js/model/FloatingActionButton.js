class FloatingActionButton extends mdc.ripple.MDCRipple{
  constructor(icon,options) {
      var item = document.createElement('button');
      item.className = "mdc-fab";
      if(options) item.className += " " + options;

      var div = document.createElement('div');
      div.className = 'mdc-fab__ripple';

      var span = document.createElement('span');
      span.className = 'mdc-fab__icon material-icons';
      span.innerHTML = icon;

      item.appendChild(div);
      item.appendChild(span);

      super(item);
  }
}
