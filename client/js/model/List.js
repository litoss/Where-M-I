class List extends mdc.list.MDCList{
    constructor(options) {
        var item = document.createElement('ul');
        item.className = "mdc-list ";
        if(options) item.className += " " + options;
        super(item);
    }

    add(newElement){
      this.root_.appendChild(newElement);
    }

    size(){
      return this.listElements.length;
    }
}
