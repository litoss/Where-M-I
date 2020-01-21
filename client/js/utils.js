async function getimageBlob(url){

  let response = await fetch( url);
  let result = await response.blob();
  return result;
}

function encode64(blob){
    return new Promise(function(resolve, reject){
      var fileReader = new FileReader();
      fileReader.onload = function() {
          var dataUrl = this.result;
          var base64 = dataUrl.split(',')[1]
          resolve(base64);
      };

      fileReader.readAsDataURL(blob);
    });
  }

function decode64(string, type){
  var byteCharacters = atob(string);
  var byteNumbers = new Array(byteCharacters.length);
  for (var j = 0; j < byteCharacters.length; j++) {
    byteNumbers[j] = byteCharacters.charCodeAt(j);
  }
  var byteArray = new Uint8Array(byteNumbers);
  var blob = new Blob([byteArray], {type: type});
  return URL.createObjectURL(blob);
}

function convertBlobToBase64(blob){
    var convertPromise = new Promise(function(resolve, reject){
      var fileReader = new FileReader();
      fileReader.onload = function() {
          var dataUrl = this.result;
          var base64 = dataUrl.split(',')[1]
          resolve(base64);
      };

      fileReader.readAsDataURL(blob);
    });

    return convertPromise;
  }

function getDatafromURL(blob){
  return new Promise((resolve,reject) => {
    const reader = new FileReader();

    reader.onload = function(e) {
      var dataUrl = e.target.result;
      var base64 = dataUrl.split(',')[1]
      resolve(base64);
    };

    reader.readAsDataURL(blob);
  });
}

function getDistance(pos1, pos2){
  var deltaX = Math.abs(pos1.lat() - pos2.lat());
  var deltaY = Math.abs(pos1.lng() - pos2.lng());
  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
}

function decode64BLOB(string, type){
  var byteCharacters = atob(string);
  var byteNumbers = new Array(byteCharacters.length);
  for (var j = 0; j < byteCharacters.length; j++) {
    byteNumbers[j] = byteCharacters.charCodeAt(j);
  }
  var byteArray = new Uint8Array(byteNumbers);
  var blob = new Blob([byteArray], {type: type});
  return blob;
}


function decodeOlc(olc){
  var decode = OpenLocationCode.decode(olc);
  return new google.maps.LatLng({lat: decode.latitudeCenter, lng: decode.longitudeCenter});
}

function getMarkerByOlc(olc1){
  for(var i in markerPlaces){
    var olc2 = OpenLocationCode.encode(markerPlaces[i].getPosition().lat(), markerPlaces[i].getPosition().lng(), OpenLocationCode.CODE_PRECISION_NORMAL)
    if(olc1 == olc2){
      return markerPlaces[i].marker;
    }
  }
}
