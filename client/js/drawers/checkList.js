function openCheckList(){
  var content = document.createElement('div');

  var list = new List();

  var browserTag = document.createElement('h6');
  browserTag.className = 'mdc-list-group__subheader';
  browserTag.innerHTML ='Browser';
  list.add(browserTag);

  for(var i in browserList)
    list.add(new ElementList(browserList[i].description, null, browserList[i].check ? 'check_circle' : 'cancel'));

  var editorTag = document.createElement('h6');
  editorTag.className = 'mdc-list-group__subheader';
  editorTag.innerHTML ='Editor';
  list.add(editorTag);

  for(var i in editorList)
    list.add(new ElementList(editorList[i].description, null, editorList[i].check ? 'check_circle' : 'cancel'));

  content.appendChild(list.root_);

  pageDrawer = new PageDrawer('Check List', content);
  pageDrawer.open = true;
}
