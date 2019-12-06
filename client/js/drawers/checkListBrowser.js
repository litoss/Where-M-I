function openCheckListBrowser(){
  var content = document.createElement('div');
  var list = [];

  for(var i in browserList)
    if(browserList[i].check) list.push(new ElementList(browserList[i].description, null, 'check_circle'));
    else list.push(new ElementList(browserList[i].description, null, 'cancel'));

  content.appendChild(new List(list).root_);

  map.pageDrawer = new PageDrawer('Browser - Check List', content);
  map.pageDrawer.open = true;
}
