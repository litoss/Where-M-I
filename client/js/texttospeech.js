// Google Cloud Text-to-Speech API
// https://cloud.google.com/text-to-speech/docs/

function texttospeech(){

    var req = gapi.client.texttospeech.text.synthesize({
      input: {text: "Ciao Stefano Propato, benvenuto su Where em ai, ti prego di scrivere altre migliaia di righe di codice per rendermi ancora più funzionale. Grazie."},
      voice: {
        languageCode: "it-IT"
      },
      audioConfig:{audioEncoding: 'MP3'}
    });

    req.execute(function(response) {
      console.log(response);
      var snd = new Audio("data:audio/mp3;base64," + response.audioContent);
      snd.play();
      var str = JSON.stringify(response.result);
    });
  }
