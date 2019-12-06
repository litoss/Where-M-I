class Zoom{
  constructor(){
    this.root_ = document.createElement('div');

    var buttonAdd = new IconButton('add','mdc-button--raised');
    var buttonRemove = new IconButton('remove','mdc-button--raised');

    buttonAdd.unbounded = true;
    buttonRemove.unbounded = true;

    buttonAdd.listen('click', this.zoomIn);
    buttonRemove.listen('click', this.zoomOut);

    this.root_.appendChild(buttonAdd.root_);
    this.root_.appendChild(buttonRemove.root_);
  }

  zoomIn(){
    if(map.getZoom() < 19) map.setZoom(map.getZoom()+1);
  }

  zoomOut(){
    if(map.getZoom() > 0) map.setZoom(map.getZoom()-1);
  }
}
