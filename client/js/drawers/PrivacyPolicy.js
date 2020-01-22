function openPrivacy(){
  var content = document.createElement('div');

  var h2 = document.createElement('h2');
  h2.innerHTML = "Privacy Policy";

  var h3 = document.createElement('h3');
  h3.innerHTML = "Chi Siamo";

  var description = document.createElement("p")
  content.appendChild(list.root_);

  pageDrawer = new PageDrawer('Browser - Check List', content);
  pageDrawer.open = true;
}
