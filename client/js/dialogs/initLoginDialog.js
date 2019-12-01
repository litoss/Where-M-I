var dialog;
var footer;

function loginDialog(){
  if (profile == null){
    var content = document.createElement('div');
    var card = new CardTemp('ciao',null);
    content.appendChild(card);
    footer = document.createElement('div');

    var login = document.createElement('div');



    footer.appendChild(login);


    dialog = new Dialog(content,footer,"To reach Editor you should Log in.");

    dialog.listen('MDCDialog:closing', function() {
      document.getElementById('map').removeChild(dialog.root_);
    });

    gapi.signin2.render(login, {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': false,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
      });

  }

  function onSuccess(googleUser) {
    profile = googleUser.getBasicProfile();
    menuButton.icon.setImage(profile.getImageUrl());

    var logOut = new ActionButton('LogOut');

    footer.innerHTML = '';
    footer.appendChild(logOut);

    var items = document.querySelectorAll('.mdc-list-item--disabled');
    for(var i=0; i<3;i++) items[i].className="mdc-list-item";

  }

  function onFailure(error) {
    console.log(error);
  }
}
