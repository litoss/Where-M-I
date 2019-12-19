async function getimageBlob(url){
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  let response = await fetch(proxyurl + url);
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

function decode64(string){
  var byteCharacters = atob(string);
  var byteNumbers = new Array(byteCharacters.length);
  for (var j = 0; j < byteCharacters.length; j++) {
    byteNumbers[j] = byteCharacters.charCodeAt(j);
  }
  var byteArray = new Uint8Array(byteNumbers);
  var blob = new Blob([byteArray], {type: "image/jpg"});
  return URL.createObjectURL(blob);
}
