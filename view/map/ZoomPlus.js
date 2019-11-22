class ZoomPlus extends IconButton{
  constructor(){
    super('add');
    this.unbounded = true;
    this.listen('click', () => {
       if(map.getZoom() < 19) map.setZoom(map.getZoom()+1);
    });
  }
}
