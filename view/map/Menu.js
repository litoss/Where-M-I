class Menu extends IconButton{
  constructor(){
    super('menu');
    this.unbounded = true;
    this.listen('click', () => {
        mainDrawer.open = true;
    });
  }
}
