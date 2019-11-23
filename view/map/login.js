class Login{
  constructor(){
    var login = document.createElement('div');
    gapi.signin2.render(login, {
      'scope': 'profile email',
      'width': 150,
      'height': 48,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });
    return login;
  }

  onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  }
  onFailure(error) {
    console.log(error);
  }
}
