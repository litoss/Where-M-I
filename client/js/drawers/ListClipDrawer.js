function openClips(){

  var content = document.createElement('div');

  var title = document.createElement('h2');
  title.innerHTML = "Clip Disponibili";
  content.appendChild(title);

  var clips = [];

  listVideos().then(async function(response){

    for(var i in response){
      var clip = await getVideo(response[i].id.videoId);
      clips.push(clip);
    }

    var list = new List("mdc-list--two-line");
    content.appendChild(list.root_);

    var checkboxes = [];
    for(var i in clips){

      var li = document.createElement('li');
      li.className = "mdc-list-item";

      var span = document.createElement('span');
      span.className = "mdc-list-item__text";
      li.appendChild(span);

      var checkbox = new Checkbox("check-"+i);
      checkboxes.push(checkbox);
      li.appendChild(checkbox.root_);

      var infoButton = new IconButton('info');
      li.appendChild(infoButton.root_);

      var primaryText = document.createElement('span');
      primaryText.className = "mdc-list-item__primary-text";
      primaryText.innerHTML = clips[i].snippet.title;
      span.appendChild(primaryText);

      var secondaryText = document.createElement('span')
      secondaryText.className = "mdc-list-item__secondary-text";
      secondaryText.innerHTML = clips[i].snippet.description;
      span.appendChild(secondaryText);

      (function(i){
        infoButton.listen('click', () => {
          openInfoVideo(clips[i].statistics);
        });
      })(i);

      list.add(li);
    }

    var modify = new ActionButton('Modifica Clip');
    content.appendChild(modify.root_);

    var remove = new ActionButton('Rimuovi Clip');
    content.appendChild(remove.root_);

    var public = new ActionButton('Pubblica bozza');
    content.appendChild(public.root_);

    remove.listen('click',()=>{
      for(var i in clips){
        if(checkboxes[i].checked){
          removeVideo(clips[i].id);
          list.listElements[i].style.display = 'none';
        }
      }
    });

    public.listen('click',()=>{

      for(var i in clips){
        if(checkboxes[i].checked){
          if(clips[i].status.privacyStatus != 'public') updateVideo(clips[i].id);
          else{
            var snackbar = new SnackBar('Select a draft video');
            snackbar.open();
          }
        }
      }
    });

    modify.listen('click',()=>{
      var count = 0;
      for(var c in clips){
        if(checkboxes[c].checked){
          count++;
        }
      }
      if(count == 1){
        clips.forEach((e, i) => {
          if(checkboxes[i].checked){
            var id = e.id;
            if(e.status.privacyStatus == 'unlisted'){
            var xhr = new XMLHttpRequest();
            xhr.open('POST','/audio_from_yt',false);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = async function(){
              var url = await decode64(this.responseText, "video/webm");
            openVideoDialog(url).then(async (response) => {
                  var blob = await getimageBlob(response);
                  var base644 = await convertBlobToBase64(blob);
                  var req = new XMLHttpRequest();
                  req.open('POST','/audio_to_video');
                  req.setRequestHeader('Content-Type', 'application/json');
                  req.onload = async function(){
                    var base64 = await this.responseText;
                    var url = await decode64(this.responseText,"video/webm")
                    var blob = await decode64BLOB(base64);
                    insertClip(clips[i].snippet.title+ '',clips[i].snippet.description,'public',blob);
                  }
                  req.send(JSON.stringify({ chunks: base644 }));
              })
            }
            xhr.send(JSON.stringify({id:id}));
          }else{
            var snackbar = new SnackBar('Select draft video please');
            snackbar.open();
          }
        }
        });

      }else{
        var snackbar = new SnackBar('Select only one video please');
        snackbar.open();
      }
    })

    pageDrawer = new PageDrawer('Your Clips', content);
    pageDrawer.open = true;
  });
}
