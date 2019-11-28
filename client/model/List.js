class List extends mdc.list.MDCList{
    constructor(primaryText, secondaryText, icon) {
        var item = document.createElement('ul');
        item.className = "mdc-list mdc-list--two-line";

        for(var i in elements){
          var li = document.createElement('li');
          li.className = "mdc-list-item";
          li.setAttribute('tabindex','0');

          if(icon){
            var iconSpan = document.createElement('span');
            span.className = "mdc-list-item__graphic material-icons";
            span.innerHTML = icon
          }


          if(primaryText){
            var primarySpan = document.createElement('span');
            primarySpan.className = ""
          }

          if(primaryText && secondaryText){
            var textSpan = document.createElement('span');

          }

          item.innerHTML +=
          '<li class="mdc-list-item" tabindex="0">' +
            '<span class="mdc-list-item__graphic material-icons" aria-hidden="true">' + icon + '</span>' +
            '<span class="mdc-list-item__text">' +
              '<span class="mdc-list-item__primary-text">' + elements[i].primary + '</span>' +
              '<span class="mdc-list-item__secondary-text">' + elements[i].secondary + '</span>' +
            '</span>' +
          '</li>';
        }

        super(item);
    }
}
