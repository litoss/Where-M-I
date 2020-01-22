function openSearch(){

  var isOpen;
  var searchSettings = preferences;
  var object;
  var uri;
  var time;

  var content = document.createElement('div');

  var tabBar = new TabBar(searchTab.map(o => o['name']), searchTab.map( o => o['icon']));
  content.appendChild(tabBar.root_);

  var container = document.createElement('div');
  content.appendChild(container);

  tabBar.listen("MDCTabBar:activated", (event) => {
    container.innerHTML = '';

    switch (event.detail.index) {
      case 0:
        isOpen = false;

        var searchText= new TextField("What", "search");
        searchText.required = true;

        var searchPlace = new IconButton('search');
        var settingsPlace = new IconButton('settings');
        var searchHeader = document.createElement('div');
        var searchDiv = document.createElement('div');

        searchHeader.appendChild(searchText.root_);
        searchHeader.appendChild(searchPlace.root_);
        searchHeader.appendChild(settingsPlace.root_);

        container.appendChild(searchHeader);
        container.appendChild(searchDiv);

        var settings = document.createElement('div');

        settingsPlace.listen('click', () => {

          if(!isOpen){

            var div1 = document.createElement('hr');
            div1.className = 'mdc-list-divider';
            settings.appendChild(div1);

            var listCat = new List();
            for (var i in categories) listCat.add(new SelectList(categories[i].name,categories[i].id));
            var catSel = new Select("category",listCat.root_,'form-field');
            catSel.setValue(searchSettings.category);
            settings.appendChild(catSel.root_);

            var opening =  document.createElement('div');
            var open = document.createElement('h4');
            open.innerHTML = 'Open at : '
            opening.appendChild(open);
            var slider1 = new Slider();
            slider1.min = 0;
            slider1.max = 24;
            time = slider1.value = 8;

            slider1.listen('MDCSlider:change', () =>{
              time = slider1.value;
            });

            opening.appendChild(slider1.root_);
            settings.appendChild(opening);

            var div2 = document.createElement('hr');
            div2.className = 'mdc-list-divider';
            settings.appendChild(div2);

            settingsPlace.root_.after(settings);

            catSel.listen('MDCSelect:change',(event) => {
              searchSettings.category = catSel.value;
            })
            isOpen = true;
            slider1.layout();
          }else{
            settings.innerHTML = '';
            isOpen = false;
          }
        });

        searchPlace.listen('click', () => {
          if(searchSettings.category == 'all') var cat = '';
          else var cat = searchSettings.category;
          object = {name:searchText.value, category:cat, time:time};

          var xhr = new XMLHttpRequest();
          xhr.open('POST', '/find_place');
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
              var place = response[i];
              var name = place.name;
              var img = await decode64(place.image);
              var card = new Card(name,null,null, img,null,null,'about-card');
              searchDiv.appendChild(card.root_);

              var addListener = function(index){
                card.primaryAction.addEventListener("click", () => {
                  var place = response[index];
                  pageDrawer.open = false;
                  selectedPlace(place);
                });
              }
              addListener(i);
            }
          }

          xhr.send(JSON.stringify(object));
        });
        break;
      case 1:
        container.innerHTML = '';
        isOpen = false;

        var searchText= new TextField("Insert a location", "search");
        searchText.required = true;

        var search = new IconButton('search');
        var searchHeader = document.createElement('div');
        var searchDiv = document.createElement('div');

        searchHeader.appendChild(searchText.root_);
        searchHeader.appendChild(search.root_);

        container.appendChild(searchHeader);
        container.appendChild(searchDiv);

        searchText.input.focus();
        
        search.listen('click', async() => {
          geocoder_geocode(searchText.value).then((result) => {
            updateMap(result);
            map.setCenter(result);
            pageDrawer.open = false;
          }).catch(() => {
            var snackbar = new SnackBar('Scrivi qualcosa di sensato');
            clearInterval(interval);
          })
        });
        break;

      case 2:
        container.innerHTML = '';
        isOpen = false;

        var searchText= new TextField("What", "search");
        searchText.required = true;

        var searchButton = new IconButton('search');

        var searchHeader = document.createElement('div');
        var searchDiv = document.createElement('div');

        searchHeader.appendChild(searchText.root_);
        searchHeader.appendChild(searchButton.root_);

        container.appendChild(searchHeader);
        container.appendChild(searchDiv);

        searchButton.listen('click', () => {
          object = {namer:searchText.value};

          var xhr = new XMLHttpRequest();
          xhr.open('POST', '/find_route');
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
              var place = await firstPlace(response[i].route[0]);
              var name = response[i].namer;
              var img = await decode64(place.image);
              var start = "Start from: " + place.name + "";
              var descr = "Number of steps: " + response[i].route.length + ".";
              var card = new Card(name,null,descr, img ,null,null,'about-card');
              card.setSubTitle(start);

              searchDiv.appendChild(card.root_);
              var addListener = function(index){
                card.primaryAction.addEventListener("click", () => {
                  var route = response[index];
                  pageDrawer.open = false;
                  selectedPath(route);
                });
              }
              addListener(i);
              }
            };
          xhr.send(JSON.stringify(object));
        });
        break;
      }
    });

  tabBar.activateTab(0);
  activated = 0;

  pageDrawer = new PageDrawer('Search', content);
  pageDrawer.open = true;
}

function searchVideo(){

}
