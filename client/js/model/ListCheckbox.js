class ListCheckBox extends mdc.list.MDCList{
    constructor(ids, names) {
        var ul = document.createElement('ul');
        ul.className = "mdc-list";
        ul.setAttribute('role','group');
        ul.setAttribute('aria-label','List with checkbox items');

        for(var i in ids){
          var li = document.createElement('li');
          li.className = 'mdc-list-item';
          li.setAttribute('role', 'checkbox');
          li.setAttribute('aria-checked', 'false');

          var span = document.createElement('span');
          span.className = 'mdc-list-item__graphic';
          span.appendChild(new Checkbox(ids[i]).root_);

          var label = document.createElement('label');
          label.className = 'mdc-list-item__text';
          label.setAttribute('for', ids[i]);
          label.appendChild(document.createTextNode(names[i]));

          li.appendChild(span);
          li.appendChild(label);
          ul.appendChild(li);
        }

        super(ul);
    }
}
