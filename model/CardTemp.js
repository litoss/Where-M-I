class CardTemp{
  constructor(titleText, subtitleText, secondaryText, img, actionsButtons, actionsIcons) {
    var card = document.createElement('div');
    card.className = "mdc-card mdc-card--outlined";
    card.style.margin = '20px';

    var primaryAction = document.createElement('div');
    primaryAction.className = "mdc-card__primary-action";
    primaryAction.setAttribute('tabindex','0');
    card.appendChild(primaryAction);

    var media = document.createElement('div');
    media.className = "mdc-card__media";
    media.style.backgroundImage = "url('" + img + "')";
    primaryAction.appendChild(media);

    var primary = document.createElement('div');
    primary.className = "mdc-card__primary";
    primaryAction.appendChild(primary);

    var title = document.createElement('h2');
    title.className = "demo-card__title mdc-typography mdc-typography--headline6";
    title.appendChild(document.createTextNode(titleText));
    primary.appendChild(title);

    if(subtitleText){
      var subtitle = document.createElement('h3');
      subtitle.className = "mdc-typography mdc-typography--subtitle2";
      subtitle.appendChild(document.createTextNode(subtitleText));
      primary.appendChild(subtitle);
    }

    if(secondaryText){
      var secondary = document.createElement('div');
      secondary.className = "mdc-typography mdc-typography--body2";
      secondary.appendChild(document.createTextNode(secondaryText));
      primary.appendChild(secondary);
    }

    if(actionsButtons || actionsIcons){
      var actions = document.createElement('div');
      actions.className = "mdc-card__actions";
      card.appendChild(actions);
    }

    if(actionsButtons){
      var actionsCardButtons = document.createElement('div');
      actionsCardButtons.className = "mdc-card__action-buttons";
      for(var i in actionsButtons){
        var button = new FontAwesomeButton(actionsButtons[i].url, actionsButtons[i].name);
        button.className += " mdc-card__action mdc-card__action--button";
        actionsCardButtons.appendChild(button);
      }
      actions.appendChild(actionsCardButtons);
    }

    if(actionsIcons){
      var actionsCardIcons = document.createElement('div');
      actionsCardIcons.className = "mdc-card__action-icons";
      for(var i in actionsIcons){
        var button = new FontAwesomeButton(actionsIcons[i].url, actionsIcons[i].icon);
        button.className += " mdc-card__action mdc-card__action--icon--unbounded";
        actionsCardIcons.appendChild(button);
      }
      actions.appendChild(actionsCardIcons);
    }

    return card;
  }
}
