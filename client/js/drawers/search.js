function openSearch(){

  var isOpen= false;
  console.log(preferences);
  var searchSettings = preferences;
  var object;
  var uri;
  var activated;

  var content = document.createElement('div');

  var tabBar = new TabBar(searchTab.map(o => o['name']), searchTab.map( o => o['icon']));

  var search = new TextField("What", "search");
  search.required = true;

  var searchButton = new IconButton('search');

  var settingsButton = new IconButton('settings');

  var searchHeader = document.createElement('div');
  searchHeader.appendChild(search.root_);
  var searchDiv = document.createElement('div');


  tabBar.listen("MDCTabBar:activated", (event) => {

    switch (event.detail.index) {
      case 0:
        searchHeader.appendChild(searchButton.root_);
        searchHeader.appendChild(settingsButton.root_);
        // if(searchSettings.category == 'all') var cat = ' ';
        // else var cat = searchSettings.category;
        // object = {name:search.value, category:cat};
        // uri = '/find_place';
        activated = 0;
        break;
      case 1:
        searchHeader.appendChild(searchButton.root_);
        searchHeader.appendChild(settingsButton.root_);
        // var snackbar = new SnackBar('Implementare ricerca youtube');
        // snackbar.open();
        // snackbar.listen("MDCSnackbar:closed",() => {
        //   document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
        // });
        activated = 1;
        break;
      case 2:
        searchHeader.appendChild(searchButton.root_);
        searchHeader.appendChild(settingsButton.root_);
        // object = {namer:search.value};
        // uri = "/find_route";
        activated = 2;
        break;
    }
  });

  tabBar.activateTab(0);
  activated = 0;
  content.appendChild(tabBar.root_);
  content.appendChild(searchHeader);
  content.appendChild(searchDiv);


  searchButton.listen('click', () => {
    if (activated == 0){
      if(searchSettings.category == 'all') var cat = '';
      else var cat = searchSettings.category;
      object = {name:search.value, category:cat};

      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/find_place');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = async function(){
        searchDiv.innerHTML = '';
        var response = JSON.parse(xhr.response);
        console.log(response);
        if(!response[0]){
          var errorText = document.createElement('h3');
          errorText.innerHTML = 'No results in category selected: '+ searchSettings.category;
          searchDiv.appendChild(errorText);
        }
        for(var i in response) {
          var place = response[i];
          var name = place.name;
          var img = await decode64(place.image);
          var card = new Card(name,null,null, img,null,null,'about-card');
          searchDiv.appendChild(card.root_);

          var addListener = function(index){
            card.primaryAction.addEventListener("click", () => {
              var place = response[index];
              map.pageDrawer.open = false;
              selectedPlace(place);
            });
          }
          addListener(i);
        }
      }
      console.log(object);
      xhr.send(JSON.stringify(object));
    }
    if (activated == 2){
      object = {namer:search.value};

      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/find_route');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = async function(){
        searchDiv.innerHTML = '';
        var response = JSON.parse(xhr.response);
        console.log(response);
        if(!response[0]){
          var errorText = document.createElement('h3');
          errorText.innerHTML = 'No results in category selected: '+ searchSettings.category;
          searchDiv.appendChild(errorText);
        }
        for(var i in response) {
          var route = response[i];
          var name = route.namer;
          var card = new Card(name,null,null, null ,null,null,'about-card');
          searchDiv.appendChild(card.root_);

          var addListener = function(index){
            card.primaryAction.addEventListener("click", () => {
              var route = response[index];
              map.pageDrawer.open = false;
              selectedPath(route);
            });
          }
          addListener(i);
        }
      }
      console.log(object);
      xhr.send(JSON.stringify(object));
    }
  });

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

      //category

      var listCat = new List();
      for (var i in categories) listCat.add(new SelectList(categories[i].name,categories[i].id));
      var catSel = new Select("category",listCat.root_,'form-field');
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
  });

  map.pageDrawer = new PageDrawer('Search', content);
  map.pageDrawer.open = true;
}
