class SnackBar extends mdc.snackbar.MDCSnackbar{
    constructor(name, but) {
        var item = document.createElement('div');
        item.className = "mdc-snackbar";

        var surface = document.createElement('div');
        surface.className = 'mdc-snackbar__surface';
        item.appendChild(surface);

        var label = document.createElement('div');
        label.className = 'mdc-snackbar__label';
        label.role ='status';
        label.innerHTML = name;
        surface.appendChild(label);

        var actions = document.createElement('div');
        actions.className = "mdc-snackbar__actions";
        surface.appendChild(actions);

        if(but){
          for(var i in but){
            var button = but[i];
            button.className += " mdc-snackbar__action";
            actions.appendChild(button);
          }
        }
        var parent = document.querySelector('#map');
        parent.appendChild(item);

        super(item);
    }
}
