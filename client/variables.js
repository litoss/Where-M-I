var content = [
  { id:"none", name:"None"},
  { id:"nat", name:"Nature"},
  { id:"art", name:"Art"},
  { id:"his", name:"History"},
  { id:"flk", name:"Folklore"},
  { id:"mod", name:"Modern culture"},
  { id:"rel", name:"Religion"},
  { id:"cui", name:"Food & Drink"},
  { id:"spo", name:"Sport"},
  { id:"mus", name:"Music"},
  { id:"mov", name:"Film"},
  { id:"fas", name:"Fashion"},
  { id:"shp", name:"Shopping"},
  { id:"tec", name:"Tech"},
  { id:"pop", name:"Pop culture & gossip"},
  { id:"prs", name:"Nessuna"}, //nome errato
  { id:"none", name:"Personal experiences"},
  { id:"oth", name:"Altro"}
];

var audience = [
  { id:"gen", name:"Generic"},
  { id:"pre", name:"Pre-School"},
  { id:"elm", name:"Primary School"},
  { id:"mid", name:"Secondary School"},
  { id:"scl", name:"Sector Specialists"},
];

var chartsTab = [
  { icon: "queue_music", name: "Clips"},
  { icon: "person", name: "Vloggers"},
  { icon: "navigation", name: "Paths"}
];

var aboutTab = [
  {icon: "people_alt", name: "Developer Team" },
  {icon: "computer", name: "Technologies"}
];

var technologies = [
  {media: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png", title: "HTML"},
  {media: "https://www.lifewire.com/thmb/s9kfBeuaF14VAGgE-SjDB-L0ZDs=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/css3-57b597e85f9b58b5c2b338de.png", title: "CSS"},
  {media: "https://powerforallats.com/wp-content/uploads/2016/03/js-logo.png", title: "JavaScript"},
  {media: "https://pbs.twimg.com/profile_images/925576484122779648/ucVTUoPg_400x400.jpg", title: "Material.io"},
  {media: "https://upload.wikimedia.org/wikipedia/commons/4/48/GoogleMaps_logo.svg", title: "Google Maps"},
  {media: "https://ortlerskytrails.it/wp-content/uploads/2019/03/Youtube-logo-square.png", title: "YouTube"},
  {media: "https://pbs.twimg.com/profile_images/721301450962432000/L9ehCZfC_400x400.jpg", title: "Dbpedia"}
];

var simone = {
   media: "content/simone.jpg",
   title: "Simone" ,
   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id sem nec enim auctor fermentum. Nulla aliquam arcu id dictum egestas. Sed sit amet tellus et justo aliquam cursus.",
   contacts: [{url:"https://www.facebook.com/Simo.Ferraguti", icon:"fab fa-facebook"}]
 };

 var carlos = {
   media: "content/carlo.jpg",
   title: "Carlos" ,
   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id sem nec enim auctor fermentum. Nulla aliquam arcu id dictum egestas. Sed sit amet tellus et justo aliquam cursus.",
   contacts: [
     {url:"https://www.facebook.com/carlos.caramaschi1", icon:"fab fa-facebook"},
     {url:"https://github.com/litoss", icon:"fab fa-github"}
   ]
 };

 var stefano = {
    media: "content/stefano.jpg",
    title: "Stefano" ,
    description: "Student of Computer Science for Management, at Alma Mater Studiorum Bologna",
    contacts: [
      {url:"https://www.facebook.com/stefano.propato", icon:"fab fa-facebook"},
      {url:"https://github.com/elPeroN", icon:"fab fa-github"},
      {url:"https://instagram.com/stefano.propato", icon:"fab fa-instagram"}
    ]
 }

 var vincenzo = {
   media: "content/vincenzo.jpg",
   title: "Vincenzo" ,
   description: "Coluem que porta le pizzes. Aliquam id sem nec enim auctor fermentum. Nulla aliquam arcu id dictum egestas. Sed sit amet tellus et justo aliquam cursus.",
   contacts: [{url:"https://www.facebook.com/vincenzo.armandi.5", icon:"fab fa-facebook"}]
 }

 var luogoSconosciuto = {
   media: "content/no_street.png",
   title: "Località Sconosciuta",
   description: "Questa è una località non ancora inserita su Where-M-I!"
 }

 var yourPlace = {
   title: "Tu sei qui",
   description: "Premi il pulsante 'cerca nei dintorni' per cercare locazioni"
 }

  var example = [];
  for(var i=0;i<10;i++) example.push({primaryText: "Ciccio Pasticcio", secondaryText: "2225 Contributi"});
