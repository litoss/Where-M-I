function loginDialog(){
  if (profile == null){
    var content = document.createElement('div');
    var card = new CardTemp('ciao',null);
    content.appendChild(card);
    var footer = document.createElement('div');

    var login = new ActionButton('login');
    footer.appendChild(login);

    gapi.load('auth2', () => {
      var auth2 = gapi.auth2.init({
        client_id: '588726918570-3tfcmo8nh5al0mupr29rsjmlop8jm9ce.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });

      auth2.attachClickHandler(login, {}, (googleUser) => {
        profile = googleUser.getBasicProfile();
        menuButton.icon.setImage(profile.getImageUrl());

        var items = document.querySelectorAll('.mdc-list-item--disabled');
        for(var i=0; i<3;i++) items[i].className="mdc-list-item";

      }, (error) => {
        console.log(error);
      });
    });


    var dialog = new Dialog(content,footer,"To reach Editor you should Log in.");



    document.getElementById('map').appendChild(dialog.root_);
    dialog.open();

    dialog.listen('MDCDialog:closing', function() {
      document.getElementById('map').removeChild(dialog.root_);
    });
  }
}
