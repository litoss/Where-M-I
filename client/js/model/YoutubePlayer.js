class YoutubePlayer{
  constructor(video){
    var li = document.createElement('li');
    li.className = "mdc-list-item";

    var youtubeIcon = document.createElement('img')
    youtubeIcon.className = 'mdc-list-item__graphic';
    getChannel(video.snippet.channelId).then((channel) => {
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

    var button;
    if(getCurrentPlayer() != video.id.videoId){
      button = new IconButton('play_arrow', 'mdc-list-item__meta mdc-theme--primary-bg mdc-theme--on-secondary mdc-image__circular');
    }else{
      button = new IconButton('pause', 'mdc-list-item__meta mdc-theme--primary-bg mdc-theme--on-secondary mdc-image__circular');
      addButton(button);
    }
    li.appendChild(button.root_);


    if(profile) getRating(video.id.videoId).then((rating) => {

      var like = new IconButton('thumb_up', 'mdc-image__circular');
      var dislike = new IconButton('thumb_down', 'mdc-image__circular');

      if(rating == 'like') {
        this.like = new IconButton('thumb_up', 'mdc-liked');
      }else this.like = new IconButton('thumb_up');

      if(rating == 'dislike') {
        this.dislike = new IconButton('thumb_down', 'mdc-image__circular mdc-disliked');
      }else this.dislike = new IconButton('thumb_down');

      li.appendChild(this.like.root_);
      li.appendChild(this.dislike.root_);

      this.like.listen('click',() => {
        rate(video.id.videoId, 'like');
        this.like.root_.className += ' mdc-liked';
        this.dislike.root_.className = 'mdc-icon-button material-icons';
      });

      this.dislike.listen('click',() => {
        rate(video.id.videoId, 'dislike');
        this.like.root_.className = 'mdc-icon-button material-icons';
        this.dislike.root_.className += ' mdc-disliked';
      })
    });


    button.listen('click', () => {
      if(getCurrentPlayer() != video.id.videoId){
        newPlayer(video.id.videoId);
        addButton(button);
        addButton(map.player.playButton);
      }else{
        playPause();
      }
    });

    return li;
  }
}
