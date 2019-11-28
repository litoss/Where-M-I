class ElementList{
    constructor(primaryText, secondaryText, icon) {

      var li = document.createElement('li');
      li.className = "mdc-list-item";

      if(icon){
        var iconSpan = document.createElement('span');
        iconSpan.className = "mdc-list-item__graphic material-icons";
        iconSpan.innerHTML = icon;
        li.appendChild(iconSpan);
      }

      var primarySpan = document.createElement('span');
      primarySpan.className = "mdc-list-item__primary-text";
      primarySpan.innerHTML = primaryText;

      if(secondaryText){
        var textSpan = document.createElement('span');
        textSpan.className = "mdc-list-item__text";
        textSpan.appendChild(primarySpan);
        var secondarySpan = document.createElement('span');
        secondarySpan.className = "mdc-list-item__primary-text";
        secondarySpan.innerHTML = secondaryText;
        textSpan.appendChild(secondarySpan);
        li.appendChild(textSpan);
      }else{
        li.appendChild(primarySpan);
      }

      return li;
    }
}
