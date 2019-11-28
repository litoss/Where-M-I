class ChipButton{
  constructor(name) {
    var item = document.createElement('button');
    item.className = 'mdc-chip';
    item.innerHTML =
    '<span class="mdc-chip__checkmark" > ' +
      '<svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">' +
        '<path class="mdc-chip__checkmark-path" fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>' +
      '</svg>' +
    '</span>' +
    '<span class="mdc-chip__text"> ' + name + '</span>';

    return item;
  }
}
