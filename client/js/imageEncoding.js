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
      var dataUrl = e.target.result;
      var base64 = dataUrl.split(',')[1]
      resolve(base64);
    };

    reader.readAsDataURL(blob);
  });
}

function getDistance(x1,x2,y1,y2){
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

/*async function appendBuffer(buffer1, buffer2) {
  console.log(buffer1,buffer2);
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set( new Uint8Array(buffer1), 0);
  tmp.set( new Uint8Array(buffer2), buffer1.byteLength);
  return tmp;
}


function concatBlobs(blobs, type, callback) {
        var buffers = [];

        var index = 0;

        function readAsArrayBuffer() {
            if (!blobs[index]) {
                return concatenateBuffers();
            }
            var reader = new FileReader();
            reader.onload = function(event) {
                buffers.push(event.target.result);
                index++;
                readAsArrayBuffer();
            };
            reader.readAsArrayBuffer(blobs[index]);
        }

        readAsArrayBuffer();

        function concatenateBuffers() {
            var byteLength = 0;
            buffers.forEach(function(buffer) {
                byteLength += buffer.byteLength;
            });

            var tmp = new Uint16Array(byteLength);
            var lastOffset = 0;
            buffers.forEach(function(buffer) {
                // BYTES_PER_ELEMENT == 2 for Uint16Array
                var reusableByteLength = buffer.byteLength;
                if (reusableByteLength % 2 != 0) {
                    buffer = buffer.slice(0, reusableByteLength - 1)
                }
                tmp.set(new Uint16Array(buffer), lastOffset);
                lastOffset += reusableByteLength;
            });

            var blob = new Blob([tmp.buffer], {
                type: type
            });

            callback(blob);
        }
    };
*/
