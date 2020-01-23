function openSettings(){
  var content = document.createElement('div');

  var addButton = new FloatingActionButton('edit', 'drawer-fab');
  content.appendChild(addButton.root_);

  //audience
  var listAud = new List();
  for (var i in audience) listAud.add(new SelectList(audience[i].name,audience[i].id));
  var aud = new Select("Audience",listAud.root_,'form-field');
  aud.setValue(preferences.audience);
  content.appendChild(aud.root_);

  //languages
  var listEl = new List();
  for (var i in languages) listEl.add(new SelectList(languages[i].name,languages[i].tag));
  var lang = new Select("Language",listEl.root_,'form-field');
  lang.setValue(preferences.language);
  content.appendChild(lang.root_);

  //categories
  var listCat = new List();
  for (var i in categories) listCat.add(new SelectList(categories[i].name,categories[i].id));
  var catSel = new Select("Category",listCat.root_,'form-field');
  catSel.setValue(preferences.category);
  content.appendChild(catSel.root_);

  //refreshTime

  var listRefresh = new List();
  for (var i in refreshTime) listRefresh.add(new SelectList(refreshTime[i].name,refreshTime[i].id));
  var listRefresh = new Select("Refresh",listRefresh.root_,'form-field refresh-select');
  listRefresh.setValue(preferences.refreshTime);

  content.appendChild(listRefresh.root_);

  var div = document.createElement('div');

  var timer = document.createElement('p');
  timer.className = 'timer';

  var refresh = new IconButton('sync', 'mdc-button--raised mdc-image__circular refresh-button');
  div.appendChild(refresh.root_);

  content.appendChild(div);

  refresh.listen('click', () => {
    clearMap();
    updateMap(position.marker.position);
    clearTimeout(timeout);
    updateAfterTimeOut();
  })

  pageDrawer = new PageDrawer('Settings', content);
  pageDrawer.open = true;

  addButton.listen("click", () => {

    preferences = {
      token: token,
      language: lang.value,
      audience: aud.value,
      category: catSel.value,
      refreshTime: listRefresh.value
    };

    pageDrawer.open = false;

    if(profile){
      xhr = new XMLHttpRequest();
      xhr.open('POST', '/add_preference');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function() {
        clearMap();
        updateMap(position.marker.position);
        clearTimeout(timeout);
        updateAfterTimeOut();
        if (xhr.status !== 200) {
          var snackbar = new SnackBar('Something went wrong please try again');
          snackbar.open();
        }else{
          var snackbar = new SnackBar('Preferences updated successfully');
          snackbar.open();
        }
      };
      xhr.send(JSON.stringify(preferences));
    };
  });
}
