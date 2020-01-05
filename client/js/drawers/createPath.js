function createPath(){

    var route = [];

    var content = document.createElement('div');

    var search = new TextField("What", "search");
    search.required = true;
    content.appendChild(search.root_);

    var searchButton = new IconButton('search');
    content.appendChild(searchButton.root_);

    var pathSelected = document.createElement('div');
    content.appendChild(pathSelected);

    var titlePath = document.createElement('h3')
    titlePath.innerHTML = 'Selected Places';

    var createButton = new ActionButton('create new path');

    pathSelected.appendChild(titlePath);
    pathSelected.appendChild(createButton.root_);

    var searchDiv = document.createElement('div');
    content.appendChild(searchDiv);

    searchButton.listen('click', async () => {

      var name = search.value;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/find_place');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = async function(){
        searchDiv.innerHTML = '';
        var response = JSON.parse(xhr.response);
        if(!response[0]){
          var errorText = document.createElement('h3');
          errorText.innerHTML = 'No results';
          searchDiv.appendChild(errorText);
        }

        var title = document.createElement('h3');
        title.innerHTML = 'Select next Place';
        searchDiv.appendChild(title);

        for(var i in response) {
          var place = response[i];
          var img = await decode64(place.image);
          var card = new Card(place.name,null,null, img,null,null,'about-card');
          card.primaryAction.id = i;
          searchDiv.appendChild(card.root_);

          var addListener = function(index){
            card.primaryAction.addEventListener("click", async () => {
              var place = response[index];
              var img = await decode64(place.image);
              var card = new Card(place.name);
              pathSelected.appendChild(card.root_);
              route.push(place.OLC);
            });
          }
          addListener(i);
        }
      };
      xhr.send(JSON.stringify({name: name}));
    })

    createButton.listen('click', () => {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/new_route');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = async function(){
        console.log(xhr.response);
      }
      xhr.send(JSON.stringify({route: route}));
    })

    map.pageDrawer = new PageDrawer('Create new Path', content);
    map.pageDrawer.open = true;
}
