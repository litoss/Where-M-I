class Player{

  constructor(vid){
      var div = document.createElement('div');
      var div2 = document.createElement('div');
      div.appendChild(div2);
      var player = new YT.Player(div2, {
        height: '360',
        width: '640',
        videoId: vid,
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });

          // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }
      console.log(div);
    return div;
  }
}
