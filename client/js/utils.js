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

function getDistance(marker1, marker2){

  var x1 = marker1.getPosition().lat();
  var x2 = marker2.getPosition().lat();
  var y1 = marker2.getPosition().lng();
  var y2 = marker2.getPosition().lng();


  var deltaX = Math.abs(x1 - x2);
  var deltaY = Math.abs(y1 - y2)
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
  return {lat: decode.latitudeCenter, lng: decode.longitudeCenter};
}
