class List extends mdc.list.MDCList{
    constructor(elements, options) {
        var ul = document.createElement('ul');
        ul.className = "mdc-list ";
        if(options) ul.className += "mdc-list--two-line";
        for(var i in elements) ul.appendChild(elements[i]);

        super(ul);
    }
}
