class ChipSet extends mdc.chips.MDCChipSet {
    constructor(chips, options) {
        var item = document.createElement('div');
        item.className = 'mdc-chip-set';
        if(options) item.className += " " + options;
        for(var i in chips) item.appendChild(chips[i]);
        super(item);
    }
}
