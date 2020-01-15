function createPath(){

    var route = [];

    var content = document.createElement('div');

    var nameField = new TextField("Insert name for new route");

    content.appendChild(nameField.root_);

    var search = new TextField("Search next Place");
    search.addTrailing('search');

    content.appendChild(search.root_);

    var pathSelected = document.createElement('div');
    content.appendChild(pathSelected);

    var titlePath = document.createElement('h3')
    titlePath.innerHTML = 'Selected Places';

    var createButton = new FloatingActionButton('add', 'drawer-fab');

    pathSelected.appendChild(titlePath);
    content.appendChild(createButton.root_);

    search.trailing.listen('click', async () => {

      var name = search.value;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/find_place');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = async function(){
        var response = JSON.parse(xhr.response);
        if(!response[0]){
          console.log('no response');
        }

        var listEl = new List();

        for (var i in response){
          var selected = new SelectList(response[i].name,response[i].OLC);
          listEl.add(selected);

          var addListener = function(index){
            selected.addEventListener("click", async () => {
              if(!route.includes(response[index].OLC)){
                route.push(response[index].OLC);
                var image = decode64(response[index].image, "image/jpg");
                var removeButton = new IconButton('delete');
                var card = new Card(response[index].name, null, null,image,null,[removeButton.root_],'about-card');
                pathSelected.appendChild(card.root_);
              }else {
                var snackbar = new SnackBar('This Place is already on your selected Path');
                snackbar.open();
                snackbar.listen("MDCSnackbar:closed",() => {
                  document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
                });
              }
            });
          }
          addListener(i);
        }
        var menu = new Menu(listEl.root_);
        menu.setAbsolutePosition(0,45);// da definire insieme al CSS del menu.
        content.appendChild(menu.root_);

        menu.open= !menu.open;
      };
      xhr.send(JSON.stringify({name: name}));
    })

    createButton.listen('click', () => {
      var namer = nameField.value;

      if(namer.length == 0){
        var snackbar = new SnackBar('Insert a name for your Path');
        snackbar.open();
        snackbar.listen("MDCSnackbar:closed",() => {
          document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
        });
        return;
      }

      if(route.length < 2){
        var snackbar = new SnackBar('You have to add at least two Places to your Path');
        snackbar.open();
        snackbar.listen("MDCSnackbar:closed",() => {
          document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
        });
        return;
      }

      verifyRoute(route, namer);

    })

    map.pageDrawer = new PageDrawer('Create new Path', content);
    map.pageDrawer.open = true;
}

function verifyRoute(route, name){
  xhr = new XMLHttpRequest();
  xhr.open('POST', '/find_route');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function(){
    var response = JSON.parse(xhr.responseText);
    if(!response[0]) {
      submitRoute(route, name);
      map.pageDrawer.open = false;
    }else {
      var edit = new ActionButton('edit');
      var close = new IconButton('close');
      var snackbar = new SnackBar('You already have a route started from this place',[edit.root_,close.root_]);
      snackbar.open();
      edit.listen('click', () => {
        submitRoute(route, name);
        map.pageDrawer.open = false;
      })
      snackbar.listen("MDCSnackbar:closed",() => {
        document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
      });
    }
  }
  xhr.send(JSON.stringify({OLC: route[0]}));
}

function submitRoute(route, name){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/new_route');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function(){
    //se cerco di aggiungere un nuovo percorso con la stessa partenza equivale alla modifica del percorso
    //DEVE CHIEDERE CONFERMA!!!
    var snackbar = new SnackBar('Your Path is correctly Added');
    snackbar.open();
    snackbar.listen("MDCSnackbar:closed",() => {
      document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
    });
  }
  xhr.send(JSON.stringify({namer: name, route: route, token: token}));

}
