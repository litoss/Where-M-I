function openCheckListBrowser(){

  document.getElementById('content_title').innerHTML = 'Browser - Check List';
  document.getElementById('content_content').innerHTML = '';

  var list = [];

  for(var i in browserList)
    if(browserList[i].check) list.push(new ElementList(browserList[i].description, null, 'check_circle'));
    else list.push(new ElementList(browserList[i].description, null, 'cancel'));

  document.getElementById('content_content').appendChild(new List(list).root_);
  mainDrawer.open = false;
  pageDrawer.open = true;
}
