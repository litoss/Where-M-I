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

  map.pageDrawer = new PageDrawer('Settings', content);
  map.pageDrawer.open = true;

  addButton.listen( "click", () => {

    var form = new FormData();
    form.append('token', token);
    form.append('language', lang.value);
    form.append('audience', aud.value);
    form.append('category',catSel.value);

    var selected = {};
    form.forEach(function(value, key){
        selected[key] = value;
    });

    preferences = selected;

    if(profile){

      xhr = new XMLHttpRequest();
      xhr.open('POST', '/add_preference');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function() {
          if (xhr.status !== 200) {
            var snackbar = new SnackBar('Something went wrong please try again');
            snackbar.open();
            snackbar.listen("MDCSnackbar:closed",() => {
              document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
            });
          }
      };
      xhr.send(JSON.stringify(preferences));
    };
    var snackbar = new SnackBar('Preferences updated successfully');
    snackbar.open();
    snackbar.listen("MDCSnackbar:closed",() => {
      document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
    });
    if(map.pageDrawer) map.pageDrawer.open = false;
  })

}
