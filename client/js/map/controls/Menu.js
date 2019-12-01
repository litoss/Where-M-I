class Menu extends TopAppBar{
  constructor(){

    var menu = new IconButton('menu');
    var icon = new ImageButton('content/photo.png');

    super('Where M I', menu.root_, icon.root_, "mdc-top-app-bar--relative mdc-top-app-bar--dense");

    this.icon = icon;

    gapi.load('auth2', () => {
      var auth2 = gapi.auth2.init({
        client_id: '588726918570-3tfcmo8nh5al0mupr29rsjmlop8jm9ce.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });

      auth2.attachClickHandler(icon.root_, {}, (googleUser) => {
        profile = googleUser.getBasicProfile();
        icon.setImage(profile.getImageUrl());

        var items = document.querySelectorAll('.mdc-list-item--disabled');
        for(var i=0; i<3;i++) items[i].className="mdc-list-item";

      }, (error) => {
        console.log(error);
      });
    });

    this.listen('MDCTopAppBar:nav', () => {
      mainDrawer.open = !mainDrawer.open;
    });
  }
}
