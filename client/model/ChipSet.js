class ChipSet {
    constructor(elements) {
        var item = document.createElement('div');
        item.className = 'mdc-chip-set mdc-chip-set--filter';
        for(var i in elements) item.appendChild(new Chip(elements[i]));
        return item;
    }
}
