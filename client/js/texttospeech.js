function texttospeech(input, lang){
    var req = gapi.client.texttospeech.text.synthesize({
      input: {text: input },
      voice: {
        languageCode: lang
      },
      audioConfig:{audioEncoding: 'MP3'}
    });

    req.execute(function(response) {
      var snd = new Audio("data:audio/mp3;base64," + response.audioContent);
      snd.play();
      var str = JSON.stringify(response.result);
    });
  }
