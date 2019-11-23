class ZoomLess extends IconButton{
  constructor(){
    super('remove','mdc-button--raised');
    this.unbounded = true;
    this.listen('click', () => {
        if(map.getZoom() > 0) map.setZoom(map.getZoom()-1);
    });
  }
}
