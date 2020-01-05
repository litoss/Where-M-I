function openClips(){

    var content = document.createElement('div');

    var title = document.createElement('h2');
    title.innerHTML = "Clip Disponibili";
    content.appendChild(title);

    listVideos().then(function(clips){
      console.log(clips);
      var list = new List("mdc-list--two-line")
      content.appendChild(list.root_);
      for(var i in clips){
        var li = document.createElement('li');
        li.className = "mdc-list-item";

        var checkbox = new Checkbox("check-"+i);
        checkbox.checked = true;
        checkbox.disabled = true;
        li.appendChild(checkbox.root_);

        var span = document.createElement('span');
        span.className = "mdc-list-item__text";
        li.appendChild(span);

        var primaryText = document.createElement('span');
        primaryText.className = "mdc-list-item__primary-text";
        primaryText.innerHTML = clips[i].snippet.title;
        span.appendChild(primaryText);

        var secondaryText = document.createElement('span')
        secondaryText.className = "mdc-list-item__secondary-text";
        secondaryText.innerHTML = clips[i].snippet.description;
        span.appendChild(secondaryText);

        var vid = clips[i].id.vieoId;

        list.add(li);
      }
    });

    map.pageDrawer = new PageDrawer('Your Clips', content);
    map.pageDrawer.open = true;
}
