// Iframe Player API
// https://developers.google.com/youtube/iframe_api_reference

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: null
  });
}

function newPlayer(vid, button){
  player.loadVideoById({
    'videoId': vid,
  //  'startSeconds': 5,
  //  'endSeconds': 60,
  });
  player.addEventListener('onStateChange', (event) => {
    console.log(event);
    if(event == 0){
      button.setIcon('back');
    }
  })
}

function pauseVideo(){
  player.pauseVideo();
}

function playVideo(){
  player.playVideo();
}
