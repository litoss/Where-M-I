class Checkbox extends mdc.checkbox.MDCCheckbox{
    constructor(id) {
        var checkbox = document.createElement('div');
        checkbox.className = "mdc-checkbox";

        var input = document.createElement('input');
        input.className = "mdc-checkbox__native-control";
        input.type = 'checkbox';
        input.id = id;
        checkbox.appendChild(input);

        var background = document.createElement('div');
        background.className = "mdc-checkbox__background";
        checkbox.appendChild(background);

        var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.setAttribute('class', 'mdc-checkbox__checkmark');
        svg.setAttribute('viewBox', '0 0 24 24');
        background.appendChild(svg);

        var path = document.createElementNS('http://www.w3.org/2000/svg',"path");
        path.setAttribute('class', 'mdc-checkbox__checkmark-path');
        path.setAttribute('d', 'M1.73,12.91 8.1,19.28 22.79,4.59');
        path.setAttribute('fill', 'none');
        svg.appendChild(path);

        super(checkbox);
    }
}
