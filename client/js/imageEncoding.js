async function getimageBlob(url){

  let response = await fetch( url);
  let result = await response.blob();
  return result;
}

function encode64(file) {
  var to64 = convertBlobToBase64(file);
  return to64;
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

function getDatafromURL(blob){
  return new Promise((resolve,reject) => {
    const reader = new FileReader();

    reader.onload = function(e) {
      resolve(e.target.result);
    };

    reader.readAsDataURL(blob);
  });
}

function getDistance(x1,x2,y1,y2){
  var deltaX = Math.abs(x1 - x2);
  var deltaY = Math.abs(y1 - y2)
  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
}
