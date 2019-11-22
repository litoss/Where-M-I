class ImageButton extends mdc.iconButton.MDCIconButtonToggle{
  constructor(src, name){
    var button = document.createElement('button');
    button.className = "mdc-button mdc-button--raised";
    button.innerHTML = "<img class='material-icons mdc-button__icon' aria-hidden='true' src='" + src + "'></img><span class='mdc-button__label'>" + name + "</span>";

    super(button);
  }
}
