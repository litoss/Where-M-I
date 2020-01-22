// Google API

var CLIENT_ID = '588726918570-3tfcmo8nh5al0mupr29rsjmlop8jm9ce.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDIMZTc-elycsk2nn3gM-q3_FU5188fsDU';
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
    topBar.authorizeButton.listen('click', handleAuthClick);
    topBar.signoutButton.listen('click', handleSignoutClick);
  });

  gapi.client.load('youtube', 'v3');
  gapi.client.load('texttospeech', 'v1');
  gapi.client.load('translate', 'v2');
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
    auth = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
    profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
    getPreferences();

    topBar.authorizeButton.root_.style.display = "none";
    topBar.signoutButton.root_.style.display = "block";
    topBar.icon.setImage(profile.getImageUrl());
    topBar.loginCard.setTitle(profile.getName());
    topBar.loginCard.setImage(profile.getImageUrl());

    for(var i=6; i<9; i++) {
      menuDrawer.elements[i].className = "mdc-list-item";
    }
  } else {

    preferences = defaultPrefs;

    topBar.authorizeButton.root_.style.display = "block";
    topBar.signoutButton.root_.style.display = "none";
    topBar.icon.setImage("content/photo.png");
    topBar.loginCard.setTitle("Guest");
    topBar.loginCard.setImage("content/photo.png");

    for(var i=6; i<9; i++) {
      menuDrawer.elements[i].className += " mdc-list-item--disabled";
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
