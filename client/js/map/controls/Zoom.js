class ZoomP extends IconButton{
  constructor(increment){
    super('zoom_in','mdc-button--raised mdc-image__circular');
    this.unbounded = true;
    this.listen('click', () => {
      console.log(map.getZoom())
      if(map.getZoom() < 21) map.setZoom(map.getZoom()+1);
    });
  }
}

class ZoomL extends IconButton{
  constructor(){
    super('zoom_out','mdc-button--raised mdc-image__circular');
    this.unbounded = true;
    this.listen('click', () => {
      if(map.getZoom() > 0) map.setZoom(map.getZoom()-1);
    });
  }
}
