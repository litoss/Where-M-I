var categories = [
  { id:"none", name:"Qualsiasi Categoria"},
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

 var browserList = [
   {description:"Visualizzazione di una mappa geografica della posizione del turista", check:true},
   {description:"Meccanismo di ricerca di clip dei luoghi di interesse", check:false},
   {description:"Accesso ad una playlist di audio clip relativi ai luoghi più interessanti dei dintorni", check:false},
   {description:"Organizzare la playlist per locazione, tipo, dettaglio e audience", check:false},
   {description:"L'utente può passare da una clip all'altra in maniera molto semplice", check:false},
   {description:"Il sistema riproduce la prima clip sul luogo in cui si trova", check:false},
   {description:"Il sistema sceglie il prossimo luogo da visitare", check:false},
   {description:"Il sistema ri-seleziona il luogo precedente", check:false},
   {description:"Il sistema riproduce il prossimo clip in lista sullo stesso luogo da visitare", check:false},
   {description:"Il sistema riprende la riproduzione", check:false},
   {description:"Meccanismo per filtrare la playlist di clip in base ad alcune caratteristiche", check:false},
   {description:"Visualizzazione di un'area per la registrazione ed il login, se l'utente non è loggato", check:false},
   {description:"Scelta della lingua/delle lingue dei clip", check:false},
   {description:"Scelta del tipo di audience", check:false},
   {description:"Scelta del tipo di interessi culturali dell'utente", check:false},
   {description:"Creazione di percorsi guidati personalizzati", check:false},
   {description:"Visualizzazione di un'area contentente classifiche generali su clip, vlogger e percorsi", check:false},
   {description:"Visualizzazione di una mappa geografica in base alla propria posizione GPS", check:false},
   {description:"Possibilità di aggiustare la propria posizione sulla mappa, trascinando un apposito placeholder presente sulla mappa", check:false},
   {description:"Se la posizione GPS non è disponibile, l’utente deve poter specificare manualmente la posizione navigando sulla mappa eventualmente zoomando oppure attraverso l’inserimento di: Via, Civico, Città, Provincia, Paese", check:false},
   {description:"Visualizzazione dei luoghi turistici nei dintorni, in base alla posizione specificata e su un'area specificabile dall'utente", check:false},
   {description:"Mostrare la playlist delle clip sui luoghi turistici di interesse. Estrarre le audio-guide da YouTube.", check:false},
   {description:"Possibilità di filtrare i luoghi turistici in base alla tipologia e all’orario di apertura/chiusura.", check:false},
   {description:"Possibilità di taggare un luogo turistico come già visitato. Visualizzare il tag sulla mappa.", check:false},
   {description:"Possibilità di taggare un luogo turistico come già visitato. Visualizzare il tag sulla mappa.", check:false},
   {description:"Accesso ai contenuti di Wikipedia: cercare il contenuto di DBPedia relativo al luogo nella lingua richiesta e riprodurre il contenuto della descrizione iniziale con sintesi vocale", check:false},
   {description:"Implementare un meccanismo di acquisizione feedback dall’utente e visualizzare tale feedback sulla mappa.", check:false}
 ]
  var browserElements = [
    {name:"Map",icon:"map"},
    {name:"Search",icon:"search"},
    {name:"Charts",icon:"bar_chart"}
  ]

  var editorElements = [
    {name:"Your Places",icon:"map"},
    {name:"Your Clips",icon:"videocam"},
    {name:"Your Paths",icon:"directions"}
  ]

  var otherElements = [
    {name:"Checklist",icon:"check_circle"},
    {name:"How it works",icon:"emoji_objects"},
    {name:"About Us",icon:"emoji_people"},
    {name:"Impostazioni",icon:"settings_applications"}
  ]
  var example = [];
  for(var i=0;i<10;i++) example.push({primaryText: "Ciccio Pasticcio", secondaryText: "2225 Contributi"});
