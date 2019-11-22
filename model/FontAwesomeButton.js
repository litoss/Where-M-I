class FontAwesomeButton {
    constructor(url, icon) {
        var item = document.createElement('button');
        item.className = "mdc-icon-button";
        item.innerHTML = '<i class = "'+  icon + '"></i';

        item.addEventListener("click", function(){
          window.location.href = url;
        });
        return item;
    }
}
