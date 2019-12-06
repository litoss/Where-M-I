var dialog;
var footer;

function initLoginDialog(){
  var content = document.createElement('div');
  if (profile == null){
    var name = "Guest";
    var img = 'content/photo.png';

  }else {
    var name = profile.getName();
    var img = profile.getImageUrl();
  }

  var card = new Card(name,null,null,img);
  card.className = "about-card";
  content.appendChild(card);
  footer = document.createElement('div');
  var login = document.createElement('div');
  footer.appendChild(login);

  dialog = new Dialog(content,footer,"");

  dialog.listen('MDCDialog:closing', function() {
    document.getElementById('map').removeChild(dialog.root_);
  });

  render(login);

  }

  function onSuccess(googleUser) {
    profile = googleUser.getBasicProfile();
    menuButton.icon.setImage(profile.getImageUrl());

    var logOut = new ActionButton('LogOut');
    logOut.addEventListener('click', signOut);
    footer.innerHTML = '';
    footer.appendChild(logOut);

    var items = document.querySelectorAll('.mdc-list-item--disabled');
    for(var i=0; i<3;i++) items[i].className="mdc-list-item";

  }

  function onFailure(error) {
    console.log(error);
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      menuButton.icon.setImage('content/photo.png');
      var login = document.createElement('div');
      footer.innerHTML= "";
      footer.appendChild(login);
      render(login);
      var items = document.querySelector('#editor-buttons').querySelectorAll('.mdc-list-item');
      for(var i=0; i<3;i++) items[i].className="mdc-list-item mdc-list-item--disabled";
    });
  }

  function render(button){
    gapi.signin2.render(button, {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': false,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
      });
}
