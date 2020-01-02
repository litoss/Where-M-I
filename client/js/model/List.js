class List extends mdc.list.MDCList{
    constructor(options) {
        var item = document.createElement('ul');
        item.className = "mdc-list";
        if(options) item.className += " " + options;
        super(item);
        this.content = [];
    }

    add(newElement, content){
      this.root_.appendChild(newElement);
      if(content) this.content.push(content);
    }
    
    size(){
      return this.listElements.length;
    }

    getElements(){
      return this.listElements;
    }
}
