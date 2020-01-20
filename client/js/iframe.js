// Iframe Player API
// https://developers.google.com/youtube/iframe_api_reference

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player');
}

function newPlayer(vid, button){
  player.loadVideoById({
    'videoId': vid,
  });
  player.setVolume(50);

  player.addEventListener('onStateChange', (event) => {
    console.log(event);
    if(event.data == 0){
      button.setIcon('replay');
    }
  })
}

function pauseVideo(){
  player.pauseVideo();
}

function playVideo(){
  player.playVideo();
}
