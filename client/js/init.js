var profile;
var token;
var preferences = defaultPrefs;
var map = new Mappa();

var vid = "cfe8Mw3UIW0",
  audio_streams = {},
  audio_tag = document.getElementById('youtube');

  async function test(){
    var blob = await getimageBlob("https://" + vid + "-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https%3A%2F%2Fwww.youtube.com%2Fget_video_info%3Fvideo_id%3D" + vid);
    var base64 = await encode64(blob);

    console.log(base64);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/video_to_audio');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = async function(){
      var url = await decode64(this.responseText, "audio/webm");

      var audio = document.createElement('audio');
      audio.src = url;
      audio.controls = 'controls';
      audio.type = 'audio/webm';
      document.body.appendChild(audio);
    };
    xhr.send(JSON.stringify({chunks: base64}));

  }

  //test();
