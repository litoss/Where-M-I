class TopAppBar extends mdc.topAppBar.MDCTopAppBar{
    constructor(titleText, leftButton, rightButton, options){
      var header = document.createElement('header');
      header.className = "mdc-top-app-bar";
      if(options) header.className += " " + options;
      header.id = "content_header";

      var div = document.createElement('div');
      div.className = "mdc-top-app-bar__row";
      header.appendChild(div);

      var start = document.createElement('section');
      start.className = "mdc-top-app-bar__section mdc-top-app-bar__section--align-start";
      div.appendChild(start);

      leftButton.className += " mdc-top-app-bar__navigation-icon";
      start.appendChild(leftButton);


      var title = document.createElement('span');
      title.className = "mdc-top-app-bar__title";
      title.innerHTML = titleText;
      start.appendChild(title);

      var end = document.createElement('section');
      end.className = "mdc-top-app-bar__section mdc-top-app-bar__section--align-end";
      div.appendChild(end);

      rightButton.className += " mdc-top-app-bar__navigation-icon";
      end.appendChild(rightButton);


      super(header);

      this.title = title;
    }

    setTitle(newTitle){
      this.title.innerHTML = newTitle;
    }

}
