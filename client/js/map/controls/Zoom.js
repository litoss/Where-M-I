class Zoom{
  constructor(){
    this.root_ = document.createElement('div');
    this.root_.className = 'zoomButtons';

    var buttonAdd = new IconButton('zoom_in','mdc-button--raised mdc-image__circular');
    var buttonRemove = new IconButton('zoom_out','mdc-button--raised mdc-image__circular');

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
