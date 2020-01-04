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
      catSel.setValue(searchSettings.categories);
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
        searchSettings.categories = catSel.value;
      })

      isOpen = true;
    }else{
      settingsButton.root_.nextElementSibling.remove();
      isOpen = false;
    }
  })

  button.listen('click', () => {
    
    var name = search.value;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/find_place');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = async function(){
      searchDiv.innerHTML = '';
      var response = JSON.parse(xhr.response);
      for(var i in response) {
        var place = response[i];
        var img = await decode64(place.image);
        var card = new Card(place.name,null,null, img,null,null,'about-card');
        card.primaryAction.id = i;
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
    };
    xhr.send(JSON.stringify({name: name}));
  })



  map.pageDrawer = new PageDrawer('Search', content);
  map.pageDrawer.open = true;
}
