// Google Cloud Translation API
// https://cloud.google.com/translate/docs/

async function translate(text, source, target){

  let response = await gapi.client.language.translations.translate({
    q: text,
    source: source,
    target: target,
    format: 'text'
  });;
  
  let result = response.result.data.translations[0].translatedText;
  return result;
}
