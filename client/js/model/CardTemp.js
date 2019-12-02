class CardTemp{
  constructor(titleText, subtitleText, secondaryText, img, actionButtons, actionIcons, options) {
    this.root_ = document.createElement('div');
    this.root_.className = "mdc-card mdc-card--outlined " + options;

    var primaryAction = document.createElement('div');
    primaryAction.className = "mdc-card__primary-action";
    primaryAction.setAttribute('tabindex','0');
    this.root_.appendChild(primaryAction);

    this.media = document.createElement('div');
    this.media.className = "mdc-card__media";
    this.media.style.backgroundImage = "url('" + img + "')";
    primaryAction.appendChild(this.media);

    var primary = document.createElement('div');
    primary.className = "mdc-card__primary";
    primaryAction.appendChild(primary);

    this.title = document.createElement('h2');
    this.title.className = "mdc-card__title mdc-typography mdc-typography--headline6";
    this.title.appendChild(document.createTextNode(titleText));
    primary.appendChild(this.title);

    if(subtitleText){
      var subtitle = document.createElement('h3');
      subtitle.className = "mdc-typography mdc-typography--subtitle2";
      subtitle.appendChild(document.createTextNode(subtitleText));
      primary.appendChild(subtitle);
    }

    if(secondaryText){
      this.secondary = document.createElement('div');
      this.secondary.className = "mdc-typography mdc-typography--body2";
      this.secondary.innerHTML = secondaryText;
      primary.appendChild(this.secondary);
    }

    if(actionButtons || actionIcons){
      var actions = document.createElement('div');
      actions.className = "mdc-card__actions";
      this.root_.appendChild(actions);
    }

    if(actionButtons){
      var actionCardButtons = document.createElement('div');
      actionCardButtons.className = "mdc-card__action-buttons";
      for(var i in actionButtons){
        actionButtons[i].className += " mdc-card__action mdc-card__action--button";
        actionCardButtons.appendChild(actionButtons[i]);
      }
      actions.appendChild(actionCardButtons);
    }

    if(actionIcons){
      var actionCardIcons = document.createElement('div');
      actionCardIcons.className = "mdc-card__action-icons";
      for(var i in actionIcons){
        actionIcons[i].className += " mdc-card__action mdc-card__action--icon--unbounded";
        actionCardIcons.appendChild(actionIcons[i]);
      }
      actions.appendChild(actionCardIcons);
    }
  }

  setTitle(newTitle){
    this.title.innerHTML = newTitle;
  }

  setImage(newSrc){
    this.media.style.backgroundImage = "url('" + newSrc + "')";
  }

  setSecondary(newSecondaryText){
    this.secondary.innerHTML = newSecondaryText;
  }
}
