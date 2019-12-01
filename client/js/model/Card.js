class Card {
  constructor(title, mediaFile, type, acButtons, icButtons) {
    var item = document.createElement('div');
    var classname = "mdc-card " + type ;
    item.className = classname;
    var primaryAction = document.createElement('div');
    primaryAction.className = "mdc-card__primary-action";
    var media = document.createElement('div');
    media.className = "mdc-card__media";
    var primary = document.createElement('div');
    primary.className = "mdc-card__primary";
    var actions = document.createElement('div');
    actions.className = "mdc-card__actions";
    var actionButtons = document.createElement('div');
    actionButtons.className = "mdc-card__action-buttons";
    var actionIcons = document.createElement('div');
    actionIcons.className = "mdc-card__action-icons";

    media.innerHTML='<img class="aboutImg" src=" ' + mediaFile + ' " alt="'+ title + 'Img">';
    primary.innerHTML='<h2 class="mdc-typography mdc-typography--headline6">' + title + ' </h2> ';

    if (acButtons != ""){
      actionButtons.appendChild(acButtons);
      actions.appendChild(actionButtons);
    };

    if (icButtons != ""){
      actionIcons.appendChild(icButtons);
      actions.appendChild(actionIcons);
    };

    primaryAction.appendChild(media);
    primaryAction.appendChild(primary);
    item.appendChild(primaryAction);

    if (icButtons != "" || acButtons != "") item.appendChild(actions);

  return item;
  }
}
