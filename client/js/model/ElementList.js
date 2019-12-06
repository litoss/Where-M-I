class ElementList{
    constructor(primaryText, secondaryText, icon, options) {

      var li = document.createElement('li');
      li.className = "mdc-list-item";
      if(options) li.className += " " + options;

      if(icon){
        var iconSpan = document.createElement('span');
        iconSpan.className = "mdc-list-item__graphic material-icons";
        iconSpan.innerHTML = icon;
        li.appendChild(iconSpan);
      }

      var textSpan = document.createElement('span');
      textSpan.className = "mdc-list-item__text";
      li.appendChild(textSpan);

      if(secondaryText){
        var primarySpan = document.createElement('span');
        primarySpan.className = "mdc-list-item__primary-text";
        primarySpan.innerHTML = primaryText;
        textSpan.appendChild(primarySpan);

        var secondarySpan = document.createElement('span');
        secondarySpan.className = "mdc-list-item__primary-text";
        secondarySpan.innerHTML = secondaryText;

        textSpan.appendChild(secondarySpan);
      }else{
        textSpan.innerHTML = primaryText;
      }

      return li;
    }
}
