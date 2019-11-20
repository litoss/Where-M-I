class Switch extends mdc.switch.MDCSwitch{
    constructor(id) {
        var item = document.createElement('div');
        item.className = "mdc-switch";
        item.innerHTML =
        '<div class="mdc-switch__track"></div>' +
        '<div class="mdc-switch__thumb-underlay">' +
          '<div class="mdc-switch__thumb">' +
            '<input type="checkbox" id="' + id + '" class="mdc-switch__native-control" role="switch">' +
          '</div>' +
        '</div>';

        super(item);
    }
}
