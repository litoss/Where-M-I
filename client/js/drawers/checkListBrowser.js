function openCheckListBrowser(){
  var content = document.createElement('div');

  var list = new List();
  for(var i in browserList)
    if(browserList[i].check) list.addElement(new ElementList(browserList[i].description, null, 'check_circle'));
    else list.addElement(new ElementList(browserList[i].description, null, 'cancel'));

  content.appendChild(list.root_);

  map.pageDrawer = new PageDrawer('Browser - Check List', content);
  map.pageDrawer.open = true;
}
