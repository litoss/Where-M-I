function translate(text, source, target){

  return gapi.client.language.translations.translate({
    q: text,
    source: source,
    target: target,
    format: 'text'
  }).then(function(response){
    return response.result.data.translations[0].translatedText;
  });
}
