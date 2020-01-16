class Card{
  constructor(titleText, subtitleText, secondaryText, img, actionButtons, actionIcons, options) {
    this.root_ = document.createElement('div');
    this.root_.className = "mdc-card mdc-card--outlined";
    if(options) this.root_.className += " " + options;

    this.primaryAction = document.createElement('div');
    this.primaryAction.className = "mdc-card__primary-action";
    this.primaryAction.setAttribute('tabindex','0');
    this.root_.appendChild(this.primaryAction);

    if(img){
      this.media = document.createElement('div');
      this.media.className = "mdc-card__media";
      this.media.style.backgroundImage = "url('" + img + "')";
      this.primaryAction.appendChild(this.media);
    }
    
    var primary = document.createElement('div');
    primary.className = "mdc-card__primary";
    this.primaryAction.appendChild(primary);

    this.title = document.createElement('h2');
    this.title.className = "mdc-card__title mdc-typography mdc-typography--headline6";
    this.title.innerHTML = titleText;
    primary.appendChild(this.title);

    this.subtitle = document.createElement('h3');
    this.subtitle.className = "mdc-typography mdc-typography--subtitle2";
    primary.appendChild(this.subtitle);

    this.secondary = document.createElement('div');
    this.secondary.className = "mdc-typography mdc-typography--body2";
    this.secondary.innerHTML = secondaryText;
    primary.appendChild(this.secondary);

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

  getTitle(){
    return this.title.innerHTML;
  }

  setTitle(newTitle){
    this.title.innerHTML = newTitle;
  }

  setSubTitle(newSubTitle){
    this.subtitle.innerHTML = newSubTitle;
  }
  getImage(){
    return this.media.style.backgroundImage.slice(4, -1).replace(/["']/g, "");
  }
  setImage(newSrc){
    this.media.style.backgroundImage = "url('" + newSrc + "')";
  }
  getSecondary(){
    return this.secondary.innerHTML;
  }
  setSecondary(newSecondaryText){
    this.secondary.innerHTML = newSecondaryText;
  }
}
