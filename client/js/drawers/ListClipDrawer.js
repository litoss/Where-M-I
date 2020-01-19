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

      //     if(clips[i].status.privacyStatus != 'public'){
      var checkbox = new Checkbox("check-"+i);
      //checkbox.checked = false;
      // checkbox.disabled = true;
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

    var playlistName = new TextField('Playlist Name',document.querySelector('.mdc-text-field'));
    content.appendChild(playlistName.root_);

    var mUpload = new ActionButton('Create Playlist with your video');
    content.appendChild(mUpload.root_);

    remove.listen('click',()=>{
      for(var i in clips){
        if(checkboxes[i].checked){
        removeVideo(clips[i].id);
      checkboxes[i].disabled = true;
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
            snackbar.listen("MDCSnackbar:closed",() => {
              document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
            });
          }
        }
      }
    });
    mUpload.listen('click',async ()=>{
      var count = 0;
      var playlistId;
      var vidToInsert = [];
      for(var i in clips){
        if(checkboxes[i].checked){
          count++;
        }
      }
      if(count > 0){
        if(playlistName.value){
          createPlaylist(playlistName.value).then((response)=>{
            for(var i in clips){
              if(checkboxes[i].checked) {
                await insertClipInPlaylist(response.result.id, clips[i].id);
              }
            };
          });
        }else{
          var snackbar = new SnackBar('Insert playlist name');
          snackbar.open();
          snackbar.listen("MDCSnackbar:closed",() => {
            document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
          });
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
      //for(var i in clips){
        clips.forEach((e, i) => {
          if(checkboxes[i].checked){
            var id = e.id;
            console.log(id);
            var xhr = new XMLHttpRequest();
            xhr.open('POST','/audio_from_yt',false);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = async function(){
              var url = await decode64(this.responseText, "video/webm");
              console.log(i);
            openVideoDialog(url).then(async (response) => {
                  var blob = await getimageBlob(response);
                  var base644 = await convertBlobToBase64(blob);
                  console.log(i);
                  var req = new XMLHttpRequest();
                  req.open('POST','/audio_to_video');
                  req.setRequestHeader('Content-Type', 'application/json');
                  req.onload = async function(){
                    var base64 = await this.responseText;
                    var url = await decode64(this.responseText,"video/webm")
                    var blob = await decode64BLOB(base64);
                    console.log(i);
                    insertClip(clips[i].snippet.title+ 'a' ,clips[i].snippet.description,'public',blob);
                  }
                  req.send(JSON.stringify({ chunks: base644 }));
                /// insertClip(clips[i].snippet.title+ 'a' ,clips[i].snippet.description,'public',blob);
              })
            }
            xhr.send(JSON.stringify({id:id}));
          }
        });

      /*  if(checkboxes[i].checked){
          var id = clips[i].id;
          console.log(id);
          var xhr = new XMLHttpRequest();
          xhr.open('POST','/audio_from_yt',false);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.onload = async function(){
            var url = await decode64(this.responseText, "video/webm");
            console.log(i);
          openVideoDialog(url).then(async (response) => {
                var blob = await getimageBlob(response);
                var base644 = await convertBlobToBase64(blob);
                console.log(i);
                var req = new XMLHttpRequest();
                req.open('POST','/audio_to_video');
                req.setRequestHeader('Content-Type', 'application/json');
                req.onload = async function(){
                  var base64 = await this.responseText;
                  var url = await decode64(this.responseText,"video/webm")
                  var blob = await decode64BLOB(base64);
                  console.log(i);
                  //insertClip(clips[i].snippet.title+ 'a' ,clips[i].snippet.description,'public',blob);
                }
                req.send(JSON.stringify({ chunks: base644 }));
              /// insertClip(clips[i].snippet.title+ 'a' ,clips[i].snippet.description,'public',blob);
            })
          }
          xhr.send(JSON.stringify({id:id}));
        }*/
      }else{
        var snackbar = new SnackBar('Select only one video please');
        snackbar.open();
        snackbar.listen("MDCSnackbar:closed",() => {
          document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
        });
      }
    })

    map.pageDrawer = new PageDrawer('Your Clips', content);
    map.pageDrawer.open = true;
  });
}
