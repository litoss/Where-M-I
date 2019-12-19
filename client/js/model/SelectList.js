class SelectList{
  constructor( name, value){
    var item = document.createElement('li');
    item.className = 'mdc-list-item';
    item.setAttribute('data-value',value);
    item.innerHTML = name;

    return item;
  }
}
