// Google API

//var CLIENT_ID = '588726918570-3tfcmo8nh5al0mupr29rsjmlop8jm9ce.apps.googleusercontent.com';
//var API_KEY = 'AIzaSyDIMZTc-elycsk2nn3gM-q3_FU5188fsDU';
//var CLIENT_ID = '425721672816-j6su7djeahtu76tieu0kq7jq46mtqk60.apps.googleusercontent.com';
//var API_KEY = 'AIzaSyAISXxNTs9hhEZ2dt2N-pt77lLpolf8Usc';
//var CLIENT_ID = '1032883837628-5kdrv46hovrk8sa14v31kektcocrl92t.apps.googleusercontent.com'
//var API_KEY = 'AIzaSyC_5mB9L4_u80SO0tezsJuIpj6h67kGR7E'
//var CLIENT_ID = '1032883837628-5kdrv46hovrk8sa14v31kektcocrl92t.apps.googleusercontent.com'
//var API_KEY = 'AIzaSyCRJ3AcDLybAnRdr-z9JpoXRLKPjQXsBUk'
 //var CLIENT_ID = '589163450681-b8d43caisapa34kdfrm9rdib7lngj3c5.apps.googleusercontent.com'
// var API_KEY = 'AIzaSyCbF7xg-9CdeDEOp2SHd9pJtpN-Ll-o8gk'
//var CLIENT_ID = '77613294594-37odu8ke37gjoeebo2rfhlocf0thdgb9.apps.googleusercontent.com'
//var API_KEY = 'AIzaSyBdv1s6rNFG-UIymqWKLa9Yb6djNj-tlxs'
//var CLIENT_ID = '89516997926-spbe706tb53hkkad7foujjs8f9nu3lds.apps.googleusercontent.com'
//var API_KEY = 'AIzaSyBrQAvETwgUyILRWGN4zT5hotJWByJXS5M'
//var CLIENT_ID = '563938826751-hckhc1tn144qesuo3vfeladfs7sa657d.apps.googleusercontent.com'
//var API_KEY = 'AIzaSyC1Qfs0gXY8eYKJc-TT5SKhrKng_XAROzc'
var CLIENT_ID = '239403724325-l9fa3mhgki0a2eqchi6bgap7ofn6de1s.apps.googleusercontent.com'
var API_KEY = 'AIzaSyAcsOxkEj7ANFwWY-qJuUgUbNMUl1epZso'

//var CLIENT_ID = '588726918570-3tfcmo8nh5al0mupr29rsjmlop8jm9ce.apps.googleusercontent.com'
//var API_KEY = 'AIzaSyDIMZTc-elycsk2nn3gM-q3_FU5188fsDU'
//var CLIENT_ID = '650091961358-df2k61aubrve187s4ph2lmibfrcg0l2q.apps.googleusercontent.com';
//var API_KEY = 'AIzaSyCaDN2KU-H2zGma9R8lArEjn79U49ja7XI';
//var CLIENT_ID = '650091961358-df2k61aubrve187s4ph2lmibfrcg0l2q.apps.googleusercontent.com'
//var API_KEY = 'AIzaSyCaDN2KU-H2zGma9R8lArEjn79U49ja7XI'
//var CLIENT_ID = '1032883837628-5kdrv46hovrk8sa14v31kektcocrl92t.apps.googleusercontent.com'
//var API_KEY = 'AIzaSyC_5mB9L4_u80SO0tezsJuIpj6h67kGR7E'
//var CLIENT_ID = '790908265476-je3s0tr3pbqrrobrkkogc871h06oghpo.apps.googleusercontent.com'
//var API_KEY = 'AIzaSyC1Qfs0gXY8eYKJc-TT5SKhrKng_XAROzc'

var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"];
var SCOPES = 'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/cloud-platform profile';

var profile, token, preferences;

function handleClientLoad() {
  // Load the API client and auth2 library
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    map.topBar.authorizeButton.listen('click', handleAuthClick);
    map.topBar.signoutButton.listen('click', handleSignoutClick);
  });

  gapi.client.load('youtube', 'v3');
  gapi.client.load('texttospeech', 'v1');
  gapi.client.load('translate', 'v2');
  console.log(gapi.auth2);
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
    auth = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
    profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
    getPreferences();

    map.topBar.authorizeButton.root_.style.display = "none";
    map.topBar.signoutButton.root_.style.display = "block";
    map.topBar.icon.setImage(profile.getImageUrl());
    map.topBar.loginCard.setTitle(profile.getName());
    map.topBar.loginCard.setImage(profile.getImageUrl());

    for(var i=6; i<9; i++) {
      map.menuDrawer.elements[i].className = "mdc-list-item";
    }
  } else {

    preferences = defaultPrefs;
    console.log(preferences);

    map.topBar.authorizeButton.root_.style.display = "block";
    map.topBar.signoutButton.root_.style.display = "none";
    map.topBar.icon.setImage("content/photo.png");
    map.topBar.loginCard.setTitle("Guest");
    map.topBar.loginCard.setImage("content/photo.png");

    for(var i=6; i<9; i++) {
      map.menuDrawer.elements[i].className += " mdc-list-item--disabled";
    }
  }
}

function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
  profile = null;
  preferences = defaultPrefs;
}
