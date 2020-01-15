class ImageList{
    constructor(primaryText, secondaryText, src, options) {

      var li = document.createElement('li');
      li.className = "mdc-list-item";
      if(options) li.className += " " + options;

      if(src){
        var image = document.createElement('img');
        image.className = "mdc-list-item__graphic";
        image.src = src;
        li.appendChild(image);
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
        secondarySpan.className = "mdc-list-item__secondary-text";
        secondarySpan.innerHTML = secondaryText;

        textSpan.appendChild(secondarySpan);
      }else{
        textSpan.innerHTML = primaryText;
      }

      return li;
    }
}
