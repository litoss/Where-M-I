// Iframe Player API
// https://developers.google.com/youtube/iframe_api_reference

var frame;
var currentId;
var buttons;
var state;

function onYouTubeIframeAPIReady() {
  frame = new YT.Player('player', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function newPlayer(vid){
  for(var i in buttons){
    buttons[i].setIcon('play_arrow');
  }
  currentId = vid;
  buttons = [];
  frame.loadVideoById({
    'videoId': vid,
  });
  frame.setVolume(50);
}

function addButton(button){
  buttons.push(button);
}

function playPause() {
  if(state != 1){
    frame.playVideo();
  }
  else{
    frame.pauseVideo();
  }
}

function getCurrentPlayer(){
  return currentId;
}

function onPlayerStateChange(event) {
  var icon;
  state = event.data;

  if(state === 0) {
    icon = 'play_arrow';
  }else if(state === 1) {
    icon = 'pause';
  }else if(state === 2) {
    icon = 'play_arrow';
  }else if(state === 3){
    icon = 'slow_motion_video';
  }else{
    icon = 'play_arrow';
  }

  for(var i in buttons){
    buttons[i].setIcon(icon);
  }
}
