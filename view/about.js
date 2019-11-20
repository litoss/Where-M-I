function openAbout() {
  var elements = [
    {img: "content/simone.jpg", name: "Simone" },
    {img: "content/carlo.jpg", name: "Carlos" },
    {img: "content/stefano.jpg", name: "Stefano" },
    {img: "content/vincenzo.jpg", name: "Vincenzo" }
  ];

  document.getElementById('content_title').innerHTML = 'About Us';
  document.getElementById('content_content').innerHTML = '';

  for (var i in elements ){
    var card = new AboutCard(elements[i].name, elements[i].img);
    document.getElementById('content_content').appendChild(card);
  }

  mainDrawer.open = false;
  pageDrawer.open = true;
}
