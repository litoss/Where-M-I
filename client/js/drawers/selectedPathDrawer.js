async function selectedPath(path){

  var content = document.createElement('div');
  content.id = 'content';

  for(var i in path.route){
    searchPlace(path.route[i]);
  }

  var navigationButton = new FloatingActionButton('navigation', 'drawer-fab');

  content.appendChild(navigationButton.root_);

  navigationButton.listen('click', () => {
    free = false;
    player.forward.root_.disabled = false;
    playlist = path.route.slice();
    place = -1;
    next();
    pageDrawer.open = false;
  })

  pageDrawer  = new PageDrawer(path.namer, content);
  pageDrawer.open = true;
}

function searchPlace(olc){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/find_place');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = async function(){
    var response = JSON.parse(xhr.response);
    var image = await decode64(response[0].image, "image/jpg");
    if(response[0].description.length > 100) descr = response[0].description.substring(0,100)+"...";
    else descr = response[0].description;
    var card = new Card (response[0].name, null, descr, image, null,null,'about-card');
    document.querySelector("#content").appendChild(card.root_);
  }
  xhr.send(JSON.stringify({OLC: olc}));

}
