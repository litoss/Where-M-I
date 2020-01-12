function openCheckListBrowser(){
  var content = document.createElement('div');

  var list = new List();
  for(var i in browserList)
    list.add(new ElementList(browserList[i].description, null, browserList[i].check ? 'check_circle' : 'cancel'));

  content.appendChild(list.root_);

  map.pageDrawer = new PageDrawer('Browser - Check List', content);
  map.pageDrawer.open = true;
}
