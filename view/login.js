var googleUser = {};

var login = document.createElement('button');
login.className = "mdc-button mdc-button--raised";
login.index = 1;
login.style['margin'] = '10px';
login.innerHTML = "<img class='material-icons mdc-button__icon' aria-hidden='true' src='identity/sign-in/btn_google_dark_normal_ios.svg'></img><span class='mdc-button__label'>Accedi</span>";

gapi.load('auth2', function(){
  auth2 = gapi.auth2.init({
    client_id: '588726918570-3tfcmo8nh5al0mupr29rsjmlop8jm9ce.apps.googleusercontent.com',
    cookiepolicy: 'single_host_origin',
  });
  auth2.attachClickHandler(login, {},
      function(googleUser) {
        login.innerText = "Signed in: " + googleUser.getBasicProfile().getName();
      }, function(error) {
        alert(JSON.stringify(error, undefined, 2));
      });
});
