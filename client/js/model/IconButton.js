class IconButton extends mdc.ripple.MDCRipple{
    constructor(icon, options) {
        var item = document.createElement('button');
        item.className = "mdc-icon-button material-icons";
        if(options) item.className += " " + options;
        item.innerHTML = icon;

        super(item);
        this.unbounded = true;
    }

    setIcon(icon){
      this.root_.innerHTML = icon;
    }

    getIcon(){
      return this.root_.innerHTML;
    }
}
