var googleUser = {};
var login = new ImageButton('content/btn_google_light_normal.svg', 'Login');

gapi.load('auth2', function(){
  auth2 = gapi.auth2.init({
    client_id: '588726918570-3tfcmo8nh5al0mupr29rsjmlop8jm9ce.apps.googleusercontent.com',
    cookiepolicy: 'single_host_origin',
  });

  auth2.attachClickHandler(login.root_, {},
      function(googleUser) {
        login.root_.innerText = "Signed in: " + googleUser.getBasicProfile().getName();
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
