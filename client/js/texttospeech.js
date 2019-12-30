// Google Cloud Text-to-Speech API
// https://cloud.google.com/text-to-speech/docs/

async function texttospeech(input, lang){

    var response = await gapi.client.texttospeech.text.synthesize({
      input: {text: input},
      voice: {
        languageCode: lang
      },
      audioConfig:{audioEncoding: 'MP3'}
    });

    var snd = new Audio("data:audio/mp3;base64," + response.result.audioContent);
    snd.play();
}
