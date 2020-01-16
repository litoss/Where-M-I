function openInfoVideo(statistics) {
  var content = document.createElement('div');

  var view = document.createElement('p');
  view.innerHTML = "View Count: " + statistics.viewCount;
  content.appendChild(view);

  var like = document.createElement('p');
  like.innerHTML = "Dislike Count: " + statistics.likeCount;
  content.appendChild(like);

  var dislike = document.createElement('p');
  dislike.innerHTML = "Dislike Count: " + statistics.dislikeCount;
  content.appendChild(dislike);

  var favourite = document.createElement('p');
  favourite.innerHTML = "Favourite Count: " + statistics.favoriteCount;
  content.appendChild(favourite);

  var comment = document.createElement('p');
  comment.innerHTML = "Comment Count: " + statistics.commentCount;
  content.appendChild(comment);

  var buttonContainer = document.createElement('div');
  var close = new ActionButton('close');
  buttonContainer.appendChild(close.root_);

  var dialog = new Dialog(content, buttonContainer, "Videos Feedback");

  document.getElementById('map').appendChild(dialog.root_);
  dialog.open();

  close.listen('click',() => {
    dialog.close();
  });

  dialog.listen('MDCDialog:closing', function() {
    document.getElementById('map').removeChild(welcomeDialog.root_);
  });
}
