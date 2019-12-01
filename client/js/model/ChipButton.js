class ChipButton extends mdc.chips.MDCChip{
  constructor(name, trailing, leading) {

    var chip = document.createElement('div');
    chip.className = 'mdc-chip';
    chip.setAttribute('role','row');

    var chipRipple = document.createElement('div');
    chipRipple.className = "mdc-chip__ripple";
    chip.appendChild(chipRipple);

    if(leading){
      var chipIconLeading = document.createElement('i');
      chipIconLeading.className = "material-icons mdc-chip__icon mdc-chip__icon--leading";
      chipIconLeading.innerHTML = trailing;
      chip.appendChild(chipIconLeading);
    }

    var chipText = document.createElement('span');
    chipText.className = "mdc-chip__text";
    chipText.setAttribute('tabindex', '0');
    chipText.innerHTML = name;
    chip.appendChild(chipText);

    if(trailing){
      var chipIconTrailing = document.createElement('i');
      chipIconTrailing.className = "material-icons mdc-chip__icon mdc-chip__icon--trailing";
      chipIconTrailing.innerHTML = trailing;
      chip.appendChild(chipIconTrailing);
    }

    super(chip);
    this.chipText = chipText;
    this.chipIconLeading = chipIconLeading;
    this.chipIconTrailing = chipIconTrailing;
  }

  setName(newName){
    this.chipText.innerHTML = newName;
  }

  setIconLeading(newIconLeading){
    this.chipIconLeading.innerHTML = newIconLeading;
  }

  setIconTrailing(newIconTrailing){
    this.chipIconTrailing.innerHTML = newIconTrailing;
  }
}
