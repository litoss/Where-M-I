function openSettings(){

  var content = document.createElement('div');

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
  catSel.setValue(preferences.categories);
  content.appendChild(catSel.root_);

  map.pageDrawer = new PageDrawer('Settings', content);
  map.pageDrawer.open = true;

  map.pageDrawer.listen( "MDCDrawer:closed", () => {
    var form = new FormData();
    form.append('token', token);
    if(lang.value)form.append('language', lang.value);
    if(aud.value)form.append('audience', aud.value);

    if(catSel.value)form.append('categories',catSel.value);
    else form.append('categories', 'none');

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
      console.log(JSON.stringify(preferences));
    };

  })

}
