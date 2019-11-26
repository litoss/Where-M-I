class CardTemp{
  constructor(titleText, subtitleText, secondaryText, img, actionButtons, actionIcons, options) {
    var card = document.createElement('div');
    card.className = "mdc-card mdc-card--outlined " + options;

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

    if(actionButtons || actionIcons){
      var actions = document.createElement('div');
      actions.className = "mdc-card__actions";
      card.appendChild(actions);
    }

    if(actionButtons){
      actions.appendChild(actionButtons);
    }

    if(actionIcons){
      var actionCardIcons = document.createElement('div');
      actionCardIcons.className = "mdc-card__action-icons";
      for(var i in actionIcons){
        var button = new FontAwesomeButton(actionIcons[i].url, actionIcons[i].icon);
        button.className += " mdc-card__action mdc-card__action--icon--unbounded";
        actionCardIcons.appendChild(button);
      }
      actions.appendChild(actionCardIcons);
    }

    return card;
  }
}
