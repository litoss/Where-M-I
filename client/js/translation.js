// Google Cloud Translation API
// https://cloud.google.com/translate/docs/

async function detect(text){
  console.log(gapi.client.language.detections.detect);

  let response = await gapi.client.language.detections.detect({
    q: text
  });

  return response.result.data.detections[0][0].language;
}

async function translate(text, source, target){

  let response = await gapi.client.language.translations.translate({
    q: text,
    source: source,
    target: target,
    format: 'text'
  });;

  return response.result.data.translations[0].translatedText;
}
