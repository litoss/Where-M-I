class ActionButton {
  constructor(name) {
      var item = document.createElement('button');
      item.className = "mdc-button mdc-card__action mdc-card__action--button mdc-button--raised";

      item.innerHTML = name;

      return item;
  }
}
