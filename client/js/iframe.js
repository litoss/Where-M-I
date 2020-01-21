// Iframe Player API
// https://developers.google.com/youtube/iframe_api_reference

var player;
var currentId;
var currentButton;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function newPlayer(vid, button){
  currentId = vid;
  currentButton = button;
  player.loadVideoById({
    'videoId': vid,
  });
  player.setVolume(50);
}

function playPause() {
  if(currentButton.getIcon() == 'pause'){
    player.pauseVideo();
  }
  else{
    player.playVideo();
  }
}

function getCurrentPlayer(){
  return currentId;
}

function onPlayerStateChange(event) {
  if(event.data === 0) {
    currentButton.setIcon('play_arrow');
  }
  else if(event.data === 1) {
    currentButton.setIcon('pause');
  }
  else if(event.data === 2) {
    currentButton.setIcon('play_arrow');
  }
}
