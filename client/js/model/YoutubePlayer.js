class YoutubePlayer{
  constructor(video){
    console.log(video);
    var li = document.createElement('li');
    li.className = "mdc-list-item";

    var youtubeIcon = document.createElement('img')
    youtubeIcon.className = 'mdc-list-item__graphic';
    getChannel(video.snippet.channelId).then((channel) => {
      console.log(channel);
      youtubeIcon.src = channel.snippet.thumbnails.default.url;
    })
    li.appendChild(youtubeIcon);


    var span = document.createElement('span');
    span.className = "mdc-list-item__text";
    li.appendChild(span);

    var primaryText = document.createElement('span');
    primaryText.className = "mdc-list-item__primary-text";
    primaryText.innerHTML = video.snippet.title;
    span.appendChild(primaryText);

    var secondaryText = document.createElement('span')
    secondaryText.className = "mdc-list-item__secondary-text";
    secondaryText.innerHTML = "Created by : " +video.snippet.channelTitle;
    span.appendChild(secondaryText);

    var button = new IconButton('play_arrow', 'mdc-list-item__meta mdc-theme--primary-bg mdc-theme--on-secondary mdc-image__circular');
    li.appendChild(button.root_);
    var like = new IconButton('thumb_up', 'mdc-button--raised mdc-image__circular');
    li.appendChild(like.root_);
    var dislike = new IconButton('thumb_down', 'mdc-button--raised mdc-image__circular');
    li.appendChild(dislike.root_)

    button.listen('click', () => {

      if(button.getIcon() == "play_arrow" ){
        button.setIcon("pause");
        newPlayer(video.id, button);
      }else{
        button.setIcon("play_arrow");
        pauseVideo();
      }
    });

    like.listen('click',() => {

    });

    dislike.listen('click',() => {

    })

    return li;
  }
}
