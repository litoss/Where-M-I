function search(){
    q = "boating|sailing -fishing";
    var request = gapi.client.youtube.search.list({
      q: q,
      part: 'snippet'
    });

    request.execute(function(response) {
      var str = JSON.stringify(response.result);
    });

    var req = gapi.client.texttospeech.text.synthesize({
      input: {text: "ciao"}
    });

    req.execute(function(response) {
      console.log(response);

      var str = JSON.stringify(response.result);
    });
  }
