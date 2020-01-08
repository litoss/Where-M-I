function openSearch(){

  var isOpen= false;

  var searchSettings = preferences;
  var prefOpen = false;

  var content = document.createElement('div');

  var search = new TextField("What", "search");
  search.required = true;
  content.appendChild(search.root_);

  var button = new IconButton('search');
  content.appendChild(button.root_);

  var listEl = new List();
  for (var i in searchType) listEl.add(new SelectList(searchType[i].name,searchType[i].id));
  var selectType = new Select("Where",listEl.root_,'form-field');
  selectType.required = true;
  content.appendChild(selectType.root_);

  var settingsButton = new IconButton('settings');
  content.appendChild(settingsButton.root_);

  var searchDiv = document.createElement('div');
  content.appendChild(searchDiv);

  settingsButton.listen('click', () => {

    if(!isOpen){
      var container = document.createElement('div');

      var div1 = document.createElement('hr');
      div1.className = 'mdc-list-divider';
      container.appendChild(div1);

      //audience
      var listAud = new List();
      for (var i in audience) listAud.add(new SelectList(audience[i].name,audience[i].id));
      var aud = new Select("Audience",listAud.root_,'form-field');
      aud.setValue(searchSettings.audience);
      container.appendChild(aud.root_);

      //languages
      var listEl = new List();
      for (var i in languages) listEl.add(new SelectList(languages[i].name,languages[i].tag));
      var lang = new Select("Language",listEl.root_,'form-field');
      lang.setValue(searchSettings.language);
      container.appendChild(lang.root_);

      //categories

      var listCat = new List();
      for (var i in categories) listCat.add(new SelectList(categories[i].name,categories[i].id));
      var catSel = new Select("Category",listCat.root_,'form-field');
      catSel.setValue(searchSettings.category);
      container.appendChild(catSel.root_);

      var div2 = document.createElement('hr');
      div2.className = 'mdc-list-divider';
      container.appendChild(div2);

      settingsButton.root_.after(container);

      aud.listen('MDCSelect:change',(event) => {
        searchSettings.audience = aud.value;
      })

      lang.listen('MDCSelect:change',(event) => {
        searchSettings.language = lang.value;
      })

      catSel.listen('MDCSelect:change',(event) => {
        searchSettings.category = catSel.value;
      })

      isOpen = true;
    }else{
      settingsButton.root_.nextElementSibling.remove();
      isOpen = false;
    }
  })

  button.listen('click', () => {
    if (selectType.value == '') {
      var snackbar = new SnackBar('You forgot to choice where you want to search');
      snackbar.open();
      snackbar.listen("MDCSnackbar:closed",() => {
        document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
      });
      return;
    }
    else if(selectType.value == 'plc'){
      console.log(searchSettings.category);
       var object = {name:search.value, category:searchSettings.category};
       var uri = '/find_place';
    }
    else if(selectType.value == 'clp') {
      alert('Implementare ricerca youtube');
      return;
    }
    else if(selectType.value == 'pth') {
      var object = {namer:search.value};
      var uri = "/find_route";
    }
    console.log(uri);
    console.log(object);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', uri);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = async function(){
      searchDiv.innerHTML = '';
      var response = JSON.parse(xhr.response);
      if(!response[0]){
        var errorText = document.createElement('h3');
        errorText.innerHTML = 'No results in category selected: '+ searchSettings.category;
        searchDiv.appendChild(errorText);
      }
      for(var i in response) {
        if(selectType.value == 'plc'){
          var place = response[i];
          var name = place.name;
          var img = await decode64(place.image);
        }else{
          var route = response [i];
          var name = route.namer;
          var img = null;
        }
        var card = new Card(name,null,null, img,null,null,'about-card');
        searchDiv.appendChild(card.root_);

        var addListener = function(index){
          card.primaryAction.addEventListener("click", () => {
            if(selectType.value == 'plc'){
              var place = response[index];
              map.pageDrawer.open = false;
              selectedPlace(place);
            }else{
              var path =  response[index];
              map.pageDrawer.open = false;
              selectedPath(path);
            }
          });
        }
        addListener(i);
      }
    }

    xhr.send(JSON.stringify(object));
  });

  map.pageDrawer = new PageDrawer('Search', content);
  map.pageDrawer.open = true;
}
