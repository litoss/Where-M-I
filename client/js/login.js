/*function render(button){
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

function onSuccess(googleUser) {
  profile = googleUser.getBasicProfile();
  menuButton.icon.setImage(profile.getImageUrl());
  console.log('user logged in');

  var card = new CardTemp(profile.getName(),null,null,profile.getImageUrl());
  card.className = "about-card";
  var logoutButton = new ActionButton('signout');
  var menuList = new List([card,logoutButton]);
  //menuButton.toolbar.removeChild(menus);
  menuButton.menus.root_.innerHTML = '';
  menuButton.menus.root_.appendChild(menuList.root_);
 /*
  menuButton.loginButton.innerHTML =""
  var logOutButton = new ActionButton("logout");
  logOutButton.addEventListener('click', signOut);
  menuButton.menus.root_.appendChild(logOutButton);

  var items = document.querySelectorAll('.mdc-list-item--disabled');
  for(var i=0; i<3;i++) items[i].className="mdc-list-item";*/
/*
  logoutButton.addEventListener('click', signOut);
}

function onFailure(error) {
  console.log(error);
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {

    var card = new CardTemp("Guest",null,null,"content/photo.png");
    card.className = "about-card";
    var loginButton = document.createElement('div');
    render(loginButton);
    var menuList = new List([card,loginButton]);

    menuButton.menus.root_.innerHTML = '';
    menuButton.menus.root_.appendChild(menuList.root_);
    /*
    console.log('User signed out.');
    menuButton.icon.setImage('content/photo.png');
    render(menuButton.loginButton);
    var items = document.querySelector('#editor-buttons').querySelectorAll('.mdc-list-item');
    for(var i=0; i<3;i++) items[i].className="mdc-list-item mdc-list-item--disabled";
*//*  });
}*/
