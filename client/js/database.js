function getRating(olc){
  return new Promise((resolve,reject) =>{
    xhr.open('POST', '/find_place');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
      if(!xhr.response.length)
        resolve(JSON.parse(xhr.response)[0].media_rating);
      else {
        resolve('0');
      }
    }
    xhr.send(JSON.stringify({OLC: olc}));
  })
}

function addReview(olc, value, comment){
  xhr = new XMLHttpRequest();
  xhr.open('POST', '/new_review');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = async function(){
    for(var i in places){
      var olcR = OpenLocationCode.encode(places[i].getPosition().lat(), places[i].getPosition().lng(), OpenLocationCode.CODE_PRECISION_NORMAL);
      if (olcR == olc){
        places[i].place.media_rating = await getRating(olc);
      }
    }
    var snackbar = new SnackBar('Review Added succesfully');
    snackbar.open();
  }
  xhr.send(JSON.stringify({token: token, OLC: olc, rating_place: value, comment: comment}))
}

function getPlaces(area){
  return new Promise((resolve,reject) =>{
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/find_place');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
      resolve(JSON.parse(xhr.response));
    }
    xhr.send(JSON.stringify({OLC: area}));
  });
}

function getPreferences() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/find_preference');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    var response = JSON.parse(xhr.response);
    if (response[0]){
      preferences = response[0];
      if(!response[0].category) preferences.category = 'all';
      preferences.refreshTime = '120';
    }else {
      setPreferences();
      preferences = defaultPrefs;
    }
  };
  xhr.send(JSON.stringify({id: profile.getId()}));
}

function setPreferences() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/add_preference');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
  };
  xhr.send(JSON.stringify({token: token, category: defaultPrefs.category, audience: defaultPrefs.audience, language:defaultPrefs.language}));
}

function getPaths(area) {
  return new Promise((resolve,reject) =>{
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/find_route');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      resolve(JSON.parse(xhr.response));
    };
    xhr.send(JSON.stringify({OLC: area}));
  });
}

function findUser(id){
  return new Promise((resolve,reject) =>{
    xhr.open('POST', '/find_preference');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
      resolve(JSON.parse(xhr.response)[0]);
    }
    xhr.send(JSON.stringify({id: id}));
  })
}

function submitRoute(route, name){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/new_route');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function(){
    var snackbar = new SnackBar('Your Path is correctly Added');
    snackbar.open();
  }
  xhr.send(JSON.stringify({namer: name, route: route, token: token}));
}
