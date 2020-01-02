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

  var selectCat = document.createElement('h3');
  selectCat.innerHTML = 'select categories';
  var contentSelector = new List();
  for (var i in categories){
    var li = document.createElement('li');
    li.className = 'mdc-list-item';
    li.id = categories[i].id;
    var checkbox = new Checkbox(categories[i].id);
    if (preferences.categories.includes(categories[i].id)) checkbox.checked = true;
    var name = document.createElement('label');
    name.className = 'mdc-list-item__text';
    name.innerHTML = categories[i].name;
    li.appendChild(checkbox.root_);
    li.appendChild(name);
    contentSelector.add(li,checkbox);
  }
  content.appendChild(contentSelector.root_);



  // var submit = new IconButton('add');
  // content.appendChild(submit.root_);
  //
  // submit.listen('click', () => {
  //   var form = new FormData();
  //   form.append('token', token);
  //   if(lang.value)form.append('language', lang.value);
  //   if(aud.value)form.append('audience', aud.value);
  //
  //   var selectedCheckboxes = [];
  //   for (var i in contentSelector.content){
  //      if(contentSelector.content[i].checked){
  //        selectedCheckboxes.push(contentSelector.content[i].getCheckedValue());
  //      }
  //    }
  //    if(!selectedCheckboxes[0]) selectedCheckboxes.push('none');
  //   form.append('categories', selectedCheckboxes);
  //
  //   var selected = {};
  //   form.forEach(function(value, key){
  //       selected[key] = value;
  //   });
  //
  //   preferences = selected;
  //
  //   if(profile){
  //     xhr = new XMLHttpRequest();
  //     xhr.open('POST', '/add_preference');
  //     xhr.setRequestHeader('Content-Type', 'application/json');
  //     xhr.onload = function() {
  //         if (xhr.status === 200 ) {
  //             map.pageDrawer.open = false;
  //         }
  //         else if (xhr.status !== 200) {
  //             alert('Something went wrong please try again');
  //         }
  //     };
  //     xhr.send(JSON.stringify(preferences));
  //     console.log(JSON.stringify(preferences));
  //   };
  // });


  map.pageDrawer = new PageDrawer('Settings', content);
  map.pageDrawer.open = true;

  map.pageDrawer.listen( "MDCDrawer:closed", () => {
    var form = new FormData();
    form.append('token', token);
    if(lang.value)form.append('language', lang.value);
    if(aud.value)form.append('audience', aud.value);

    var selectedCheckboxes = [];
    for (var i in contentSelector.content){
       if(contentSelector.content[i].checked){
         selectedCheckboxes.push(contentSelector.content[i].getCheckedValue());
       }
     }
     if(!selectedCheckboxes[0]) selectedCheckboxes.push('none');
    form.append('categories', selectedCheckboxes);

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
              alert('Something went wrong please try again');
          }
      };
      xhr.send(JSON.stringify(preferences));
      console.log(JSON.stringify(preferences));
    };

  })

}
