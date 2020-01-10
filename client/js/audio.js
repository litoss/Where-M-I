// Recording audio
// https://developers.google.com/web/fundamentals/media/recording-audio

var mediaRecorder, recordedChunks;

async function stopRecord(){
  return new Promise((resolve,reject) => {

    mediaRecorder.addEventListener('stop', function() {
      var url = URL.createObjectURL(new Blob(recordedChunks, {type: 'audio/webm'}));
      resolve(url);
    });

    mediaRecorder.stop();
  });
}

async function startRecord(){
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
  }).then(function(stream){

    mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'});
    mediaRecorder.addEventListener('dataavailable', function(e) {
      if (e.data.size > 0) {
        console.log("pushed");
        recordedChunks.push(e.data);
      }
    });

    recordedChunks = [];
    mediaRecorder.start();
  });
}
