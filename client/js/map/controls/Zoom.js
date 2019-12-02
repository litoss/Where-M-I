class Zoom{
  constructor(){
    var div = document.createElement('div');
    var buttonAdd = new IconButton('add','mdc-button--raised');
    var buttonRemove = new IconButton('remove','mdc-button--raised');

    buttonAdd.unbounded = true;
    buttonRemove.unbounded = true;

    buttonAdd.listen('click', this.zoomIn);
    buttonRemove.listen('click', this.zoomOut);

    div.appendChild(buttonAdd.root_);
    div.appendChild(buttonRemove.root_);
    return div;
  }

  zoomIn(){
    if(map.getZoom() < 19) map.setZoom(map.getZoom()+1);
  }

  zoomOut(){
    if(map.getZoom() > 0) map.setZoom(map.getZoom()-1);
  }
}
