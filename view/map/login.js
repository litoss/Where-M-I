class Login{
  constructor(){

    var login = document.createElement('div');
    login.className = "toolbar mdc-menu-surface--anchor";
    login.setAttribute('id','toolbar');
    var button = new IconButton('account_circle');
    var menu = new Menus('test');

    button.listen('click', () => {
      menu.open = true;
    })

    login.appendChild(button.root_);
    login.appendChild(menu.root_);

    return login;
  }
}
/*gapi.load('auth2', function(){
  auth2 = gapi.auth2.init({
    client_id: '588726918570-3tfcmo8nh5al0mupr29rsjmlop8jm9ce.apps.googleusercontent.com',
    cookiepolicy: 'single_host_origin',
  });

  auth2.attachClickHandler(login.root_, {},
      function(googleUser) {
        console.log(googleUser);
      }, function(error) {
        alert(JSON.stringify(error, undefined, 2));
      });
});

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}
*/
