class YoutubePlayer{
  constructor(videos){
    var current = 0;
    var div = document.createElement('div');

    var prev = new IconButton('chevron_left', 'mdc-button--raised');
    var play = new IconButtonToggle('pause', 'play_arrow', 'mdc-button--raised');
    var next = new IconButton('chevron_right', 'mdc-button--raised');
    var description = document.createElement('p');


    div.appendChild(prev.root_);
    div.appendChild(play.root_);
    div.appendChild(next.root_);
    div.appendChild(description);

    play.listen('MDCIconButtonToggle:change', async (event) => {
      if(event.detail.isOn){
        newPlayer(videos[current]);
      }else{
        pauseVideo();
      }
    });

    prev.listen('click',() => {
      if(current > 0){
        play.on = false;
        current--;
      }
    })
    next.listen('click',() => {
      if(current < videos.length){
        play.on = false;
        current++;
      }
    })

    return div;
  }
}
