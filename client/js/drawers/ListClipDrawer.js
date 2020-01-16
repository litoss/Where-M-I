// var context = new BaseAudioContext();
var baseAudioContext = new AudioContext();



function openClips(){

  var content = document.createElement('div');

 var title = document.createElement('h2');
 title.innerHTML = "Clip Disponibili";
 content.appendChild(title);

 var yourVideo = [];
 listVideos().then(function(clips){
   console.log(clips);
   var list = new List("mdc-list--two-line")
   content.appendChild(list.root_);
   for(var i in clips){
     var li = document.createElement('li');
     li.className = "mdc-list-item";

     var span = document.createElement('span');
     span.className = "mdc-list-item__text";
     li.appendChild(span);

//     if(clips[i].status.privacyStatus != 'public'){
     var checkbox = new Checkbox("check-"+i);
     // checkbox.checked = true;
     // checkbox.disabled = true;
     li.appendChild(checkbox.root_);
//}
     var primaryText = document.createElement('span');
     primaryText.className = "mdc-list-item__primary-text";
     primaryText.innerHTML = clips[i].snippet.title;
     span.appendChild(primaryText);

     var secondaryText = document.createElement('span')
     secondaryText.className = "mdc-list-item__secondary-text";
     secondaryText.innerHTML = clips[i].snippet.description;
     span.appendChild(secondaryText);


    /* var likes = document.createElement('span');
     likes.className = 'mdc-list-item__likes';
     likes.innerHTML = 'likes:'+clips[i].statistics.likeCount;
     span.appendChild(likes);
*/
    /* "viewCount": "3669849",
         "likeCount": "82364",
         "dislikeCount": "3509",
         "favoriteCount": "0",
         "commentCount": "4749"
*/
     // var vid = clips[i].id.vieoId;

     list.add(li);

     yourVideo.push(clips[i]);

      }

  /*  var salva = new ActionButton('Salva Clip');
    content.appendChild(salva.root_);
*/
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
      for(var i in yourVideo){
        if(document.getElementById("check-"+i).checked){
          removeVideo(yourVideo[i].id.videoId);
          document.getElementById("check-"+i).disabled = true;
        }
      }
    });

    public.listen('click',()=>{
      for(var i in yourVideo){
        if(document.getElementById("check-"+i).checked){
          updateVideo(yourVideo[i].id.videoId);
        }
      }
    });
    mUpload.listen('click',()=>{
      for(var i in yourVideo){
        if(document.getElementById("check-"+i).checked){
          if(playlistName.value){
            createPlaylist(playlistName.value).then((response)=>{
              console.log(response,yourVideo[i].id.videoId);
              insertClipInPlaylist(response.result.id,yourVideo[i].id.videoId);
            });

          }
          else {
            var snackbar = new SnackBar('Insert playlist name');
            snackbar.open();
            snackbar.listen("MDCSnackbar:closed",() => {
              document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
              });
          }
        }
    /*    else{
          var snackbar = new SnackBar('Insert some video to add to your playlist');
          snackbar.open();
          snackbar.listen("MDCSnackbar:closed",() => {
            document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
            });
        }*/
      }
    });

    modify.listen('click',()=>{
      var count = 0;
      for(var c in yourVideo){
        if(document.getElementById("check-"+c).checked){
          count++;
        }
      }
      if(count == 1){
      for(var i in yourVideo){
        if(document.getElementById("check-"+i).checked){
          var id = yourVideo[i].id.videoId;
          console.log(id);
          var xhr = new XMLHttpRequest();
          xhr.open('POST','/audio_from_yt',false);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.onload = function(){
            var base64 = this.responseText;
            var url = decode64(base64);
            openVideoDialog(url).then(async (response) => {
              var blob = await getimageBlob(response);
              insertClip(yourVideo[i].snippet.title,yourVideo[i].snippet.description,'public',blob);
            });
        }
        xhr.send(JSON.stringify({id:id}));
      }
    }
  }
  else{
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

function readProva(base64){
  return new Promise((resolve,reject)=>{
    console.log(base64)
    var blob = decode64BLOB(base64,"audio/webm");
    // var blob = await getimageBlob(url);
    let fileReader = new FileReader();

    fileReader.onloadend = () => {
        resolve(fileReader.result);
    }

  fileReader.readAsArrayBuffer(blob);
  })
}
