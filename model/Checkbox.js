class Checkbox extends mdc.checkbox.MDCCheckbox{
    constructor(id) {
        var div_checkbox = document.createElement('div');
        div_checkbox.className = "mdc-checkbox";

        var input = document.createElement('input');
        input.className = "mdc-checkbox__native-control";
        input.setAttribute('type','checkbox');
        input.setAttribute('id',id);

        var div_background = document.createElement('div');
        div_background.className = "mdc-checkbox__background";

        var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.setAttribute('class', 'mdc-checkbox__checkmark');
        svg.setAttribute('viewBox', '0 0 24 24');

        var path = document.createElementNS('http://www.w3.org/2000/svg',"path");
        path.setAttribute('class', 'mdc-checkbox__checkmark-path');
        path.setAttribute( 'd', 'M1.73,12.91 8.1,19.28 22.79,4.59');
        path.setAttribute( 'fill', 'none');

        svg.appendChild(path);
        div_background.appendChild(svg);
        div_checkbox.appendChild(input);
        div_checkbox.appendChild(div_background);
        
        super(div_checkbox);
    }
}
