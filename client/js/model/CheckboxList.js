class CheckboxList{
  constructor( checkbox, value){
    this.root_ = document.createElement('li');
    this.root_.className = 'mdc-list-item';

    this.checkbox = checkbox;

    var name = document.createElement('label');
    name.className = 'mdc-list-item__text';
    name.innerHTML = value;

    this.root_.appendChild(checkbox.root_);
    this.root_.appendChild(name);

    //return this.root_;
  }
}
