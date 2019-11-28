class Menus extends mdc.menu.MDCMenu{
    constructor(list) {
        var div = document.createElement('div');
        div.className = "mdc-menu mdc-menu-surface";

        var ul = document.createElement('ul');
        ul.className = 'mdc-list';
        ul.setAttribute('role', 'menu');
        ul.setAttribute('aria-hidden', 'true');
        ul.setAttribute('aria-orientation', 'vertical');
        ul.setAttribute('tabindex', '-1');

        for(var i in elements){
          var li = document.createElement('li');
          li.className = 'mdc-list-item';
          li.setAttribute('role', 'menuitem');

          var span = document.createElement('span');
          span.className = "mdc-list-item__text";

          span.appendChild(document.createTextNode(elements[i]));
          li.appendChild(span);
          ul.appendChild(li);
        }

        div.appendChild(ul);

        super(div);
    }
}
