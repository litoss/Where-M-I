function search(){
    console.log(gapi);
    var request = gapi.client.youtube.search.list({
      q: q,
      part: 'snippet'
    });

    request.execute(function(response) {
      var str = JSON.stringify(response.result);
      console.log(str);
    });
}
