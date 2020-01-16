// Iframe Player API
// https://developers.google.com/youtube/iframe_api_reference

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
  });
}

function newPlayer(vid){
  console.log(vid);
  player.loadVideoById({
    'videoId': vid,
  //  'startSeconds': 5,
  //  'endSeconds': 60,
  });
}

function pauseVideo(){
  player.pauseVideo();
}

function playVideo(){
  player.playVideo();
}
