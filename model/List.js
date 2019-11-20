class List extends mdc.list.MDCList{
    constructor(elements, icon) {
        var item = document.createElement('ul');
        item.className = "mdc-list mdc-list--two-line";

        for(var i in elements) item.innerHTML +=
        '<li class="mdc-list-item" tabindex="0">' +
          '<span class="mdc-list-item__graphic material-icons" aria-hidden="true">' + icon + '</span>' +
          '<span class="mdc-list-item__text">' +
            '<span class="mdc-list-item__primary-text">' + elements[i].primary + '</span>' +
            '<span class="mdc-list-item__secondary-text">' + elements[i].secondary + '</span>' +
          '</span>' +
        '</li>';

        super(item);
    }
}
