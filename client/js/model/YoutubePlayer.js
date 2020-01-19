class YoutubePlayer{
  constructor(videos){
    var current = 0;
    var div = document.createElement('div');

    var prev = new IconButton('chevron_left', 'mdc-button--raised');
    var button = new IconButton('play_arrow', 'mdc-button--raised');
    var next = new IconButton('chevron_right', 'mdc-button--raised');
    var description = document.createElement('p');
    description.innerHTML = videos[current].snippet.description;
    var clipRemaning = document.createElement('p');
    clipRemaning.innerHTML = (videos.length - current - 1) + " Videos Remaning";

    div.appendChild(prev.root_);
    div.appendChild(button.root_);
    div.appendChild(next.root_);
    div.appendChild(description);
    div.appendChild(clipRemaning);

    button.listen('click', () => {

      if(button.getIcon() == "play_arrow" ){
        button.setIcon("pause");
        newPlayer(videos[current].id, button);
      }else{
        button.setIcon("play_arrow");
        pauseVideo();
      }
    });

    prev.listen('click',() => {
      if(current > 0){
        button.setIcon = "play_arrow";
        current--;
        clipRemaning.innerHTML = (videos.length - current - 1) + " Videos Remaning";
        description.innerHTML = videos[current].snippet.description;
      }
    });

    next.listen('click',() => {
      if(current < videos.length - 1){
        button.setIcon = "play_arrow";
        current++;
        clipRemaning.innerHTML = (videos.length - current - 1) + " Videos Remaning";
        description.innerHTML = videos[current].snippet.description;
      }
    })

    return div;
  }
}
