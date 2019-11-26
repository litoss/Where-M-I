class CardTemp{
  constructor(titleText, subtitleText, secondaryText, img, actionsButtons, actionsIcons, options) {
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

    if(actionsButtons || actionsIcons){
      var actions = document.createElement('div');
      actions.className = "mdc-card__actions";
      card.appendChild(actions);
    }

    if(actionsButtons){
      var actionsCardButtons = document.createElement('div');
      actionsCardButtons.className = "mdc-card__action-buttons";
      for(var i in actionsButtons){
        actionsButtons[i].root_.className += " mdc-card__action mdc-card__action--button";
        actionsCardButtons.appendChild(actionsButtons[i].root_);
      }
      actions.appendChild(actionsCardButtons);
    }

    if(actionsIcons){
      var actionsCardIcons = document.createElement('div');
      actionsCardIcons.className = "mdc-card__action-icons";
      for(var i in actionsIcons){
        actionsIcons[i].className += " mdc-card__action mdc-card__action--icon--unbounded";
        console.log(actionsIcons[i]);
        actionsCardIcons.appendChild(actionsIcons[i]);
      }
      actions.appendChild(actionsCardIcons);
    }

    console.log(card);
    return card;
  }
}
