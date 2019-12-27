var CLIENT_ID = '588726918570-3tfcmo8nh5al0mupr29rsjmlop8jm9ce.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDIMZTc-elycsk2nn3gM-q3_FU5188fsDU';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"];
var SCOPES = 'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/cloud-platform profile';

function handleClientLoad() {
  // Load the API client and auth2 library
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    map.topBar.authorizeButton.addEventListener('click', handleAuthClick);
    map.topBar.signoutButton.addEventListener('click', handleSignoutClick);
  });

  gapi.client.load('youtube', 'v3');
  gapi.client.load('texttospeech', 'v1');
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
    profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
    
    map.topBar.icon.setImage(profile.getImageUrl());
    map.topBar.loginCard.setTitle(profile.getName());
    map.topBar.loginCard.setImage(profile.getImageUrl());

    for(var i=6; i<9; i++) {
      map.menuDrawer.elements[i].className = "mdc-list-item";
    }
  } else {

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
}
