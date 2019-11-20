var search = document.createElement('div');
search.className = "mdc-text-field mdc-text-field--outlined mdc-text-field--with-trailing-icon";
search.index = 1;
search.style['margin'] = '10px';
search.innerHTML = '<i class="material-icons mdc-text-field__icon">search</i><input class="mdc-text-field__input" id="text-field-hero-input"><label for="text-field-hero-input" class="mdc-floating-label">Cerca</label>';
search.addEventListener('click', () => {

});

const textField = mdc.textField.MDCTextField.attachTo(search);
