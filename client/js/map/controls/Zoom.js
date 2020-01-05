class Zoom extends IconButton{
  constructor(increment){
    super(increment > 0 ? 'zoom_in' : 'zoom_out','mdc-button--raised mdc-image__circular');
    this.unbounded = true;
    this.listen('click', () => {
      if(map.getZoom() > 0 && map.getZoom() < 19) map.setZoom(map.getZoom()+increment);
    });
  }
}
