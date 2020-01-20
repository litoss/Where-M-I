function clipDrawer(clips){

  var content = document.createElement('div');

  var addButton = new FloatingActionButton('keyboard_voice', 'drawer-fab');
  content.appendChild(addButton.root_);

  addButton.listen('click', () => {
    addClipDrawer(clips[0].olc);
  });

  var whatClips = [];
  var what = document.createElement('h3');
  what.innerHTML = "What is this?";
  content.appendChild(what);

  var howClips = [];
  var how = document.createElement('h3');
  how.innerHTML = "How to get in?";
  content.appendChild(how);

  var whyClips = [];
  var why = document.createElement('h3');
  why.innerHTML = "What about this?";
  content.appendChild(why);

  for(var i in clips){
    if(clips[i].purpose == 'what') whatClips.push(clips[i]);
    if(clips[i].purpose == 'how') howClips.push(clips[i]);
    if(clips[i].purpose == 'why') whyClips.push(clips[i]);
  }

  if(whatClips.length){
    var whatList = new List("mdc-list--two-line mdc-list--avatar-list");
    for(var i in whatClips){
      player[i] = new YoutubePlayer(whatClips[i]);
      whatList.add(player[i]);
    }
    what.insertAdjacentElement('afterend',whatList.root_);
  }else{
    var empty = document.createElement('p');
    empty.innerHTML = "Non ci sono clip su questo luogo o che corrispondono alle tue preferenze."
    what.insertAdjacentElement('afterend',empty);
  }

  if(howClips.length){
    var howList = new List("mdc-list--two-line mdc-list--avatar-list");
    for(var i in howClips){
      player[i] = new YoutubePlayer(howClips[i]);
      howList.add(player[i]);
    }
    how.insertAdjacentElement('afterend',howList.root_);
  }else{
    var empty = document.createElement('p');
    empty.innerHTML = "Non ci sono clip su questo luogo o che corrispondono alle tue preferenze."
    how.insertAdjacentElement('afterend',empty);
  }

  if(whyClips.length){
    var whyList = new List("mdc-list--two-line mdc-list--avatar-list");
    for(var i in whyClips){
      player[i] = new YoutubePlayer(whyClips[i]);
      whyList.add(player[i]);
    }
    why.insertAdjacentElement('afterend',whyList.root_);
  }else{
    var empty = document.createElement('p');
    empty.innerHTML = "Non ci sono clip su questo luogo o che corrispondono alle tue preferenze."
    why.insertAdjacentElement('afterend',empty);
  }

  map.pageDrawer  = new PageDrawer('Clips', content);
  map.pageDrawer.open = true;

  map.pageDrawer.listen('MDCDrawer:closed', () => {

  });
}
