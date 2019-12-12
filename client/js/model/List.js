class List extends mdc.list.MDCList{
    constructor(elements, options) {
        var item = document.createElement('ul');
        item.className = "mdc-list ";
        if(options) item.className += " " + options;
        for(var i in elements) item.appendChild(elements[i]);

        super(item);
    }
}
