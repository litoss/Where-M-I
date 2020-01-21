var categories = [
  { id:"all", name:"All", icon:"content/location_city.svg"},
  { id:"nat", name:"Nature", icon:"content/local_fiorist.svg"},
  { id:"art", name:"Art", icon:"content/museum.svg"},
  { id:"his", name:"History", icon:"content/history.svg"},
  { id:"flk", name:"Folklore", icon:"content/excalibur.svg"},
  { id:"mod", name:"Modern culture", icon:"content/fireplace.svg"},
  { id:"rel", name:"Religion", icon:"content/cross.svg"},
  { id:"cui", name:"Food & Drink", icon:"content/restaurant.svg"},
  { id:"spo", name:"Sport", icon:"content/sports.svg"},
  { id:"mus", name:"Music", icon:"content/music_note.svg"},
  { id:"mov", name:"Film", icon:"content/local_movies.svg"},
  { id:"fas", name:"Fashion", icon:"content/location_city.svg"},
  { id:"shp", name:"Shopping", icon:"content/store_mall_directory.svg"},
  { id:"tec", name:"Tech", icon:"content/computer.svg"},
  { id:"pop", name:"Pop culture & gossip", icon:"content/camera_roll.svg"},
  { id:"prs", name:"Personal experiences", icon:"content/toys.svg"},
  { id:"oth", name:"Other", icon:"content/location_city.svg"}
];

var languages = [
  { name: 'Italiano', tag:'it', iso:'ita'},
  { name: 'English', tag:'en', iso:'eng'},
  { name: 'Deutsch', tag:'de', iso:'deu'},
  { name: 'French', tag:'fr', iso:'fra'},
  { name: 'Spanish', tag:'es', iso:'esp'}
];

var audience = [
  { id:"gen", name:"Generic"},
  { id:"pre", name:"Pre-School"},
  { id:"elm", name:"Primary School"},
  { id:"mid", name:"Secondary School"},
  { id:"scl", name:"Sector Specialists"},
];

var refreshTime = [
  { id:"30", name:"30 minutes"},
  { id:"60", name:"60 minutes"},
  { id:"120", name:"120 minutes"}
];

var searchTab = [
  { icon: "map", name: "Place"},
  { icon: "queue_music", name: "Clips"},
  { icon: "navigation", name: "Paths"}
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
  {media: "https://mpng.pngfly.com/20190401/zsf/kisspng-mongodb-document-oriented-database-nosql-openshift-web-app-development-servcie-in-dehradun-5ca1b8cb8a0f32.3708278115541024755655.jpg", title: "MongoDb"},
  {media: "https://pbs.twimg.com/profile_images/925576484122779648/ucVTUoPg_400x400.jpg", title: "Material.io"},
  {media: "http://www.logoeps.net/wp-content/uploads/2016/08/Google-Maps-logo.jpg", title: "Google Maps"},
  {media: "https://ortlerskytrails.it/wp-content/uploads/2019/03/Youtube-logo-square.png", title: "YouTube"},
  {media: "https://pbs.twimg.com/profile_images/721301450962432000/L9ehCZfC_400x400.jpg", title: "Dbpedia"}

];

var simone = {
   media: "content/simone.jpg",
   title: "Simone" ,
   description: "Gocker Master",
   contacts: [
     {url:"https://www.facebook.com/Simo.Ferraguti", icon:"fab fa-facebook"},
     {url:"https://github.com/SF-Fox", icon:"fab fa-github"},
   ]
 };

 var carlos = {
   media: "content/carlo.jpg",
   title: "Carlos" ,
   description: "The &#34;Bee&#34; Man",
   contacts: [
     {url:"https://www.facebook.com/carlos.caramaschi1", icon:"fab fa-facebook"},
     {url:"https://github.com/litoss", icon:"fab fa-github"}
   ]
 };

 var stefano = {
    media: "content/stefano.jpg",
    title: "Stefano" ,
    description: " Software <del>Engineer</del> Architect",
    contacts: [
      {url:"https://www.facebook.com/stefano.propato", icon:"fab fa-facebook"},
      {url:"https://github.com/elPeroN", icon:"fab fa-github"},
      {url:"https://instagram.com/stefano.propato", icon:"fab fa-instagram"}
    ]
 }

 var vincenzo = {
   media: "content/vincenzo.jpg",
   title: "Vincenzo" ,
   description: "&lt;body&gt; builder",
   contacts: [{url:"https://www.facebook.com/vincenzo.armandi.5", icon:"fab fa-facebook"}]
 }

 var luogoSconosciuto = {
   media: "content/no_street.png",
   title: "Località Sconosciuta",
   description: "Questa è una località non ancora inserita su Where-M-I!"
 }

 var yourPlace = {
   title: "You are Here",
   description: "You can press on 'plus' to add this place or press on 'mic' to record clips for this place"
 }

 var browserList = [
   {description:"Visualizzazione di una mappa geografica della posizione del turista", check:true},
   {description:"Meccanismo di ricerca di clip dei luoghi di interesse", check:true},
   {description:"Accesso ad una playlist di audio clip relativi ai luoghi più interessanti dei dintorni", check:true},
   {description:"Organizzare la playlist per locazione, tipo, dettaglio e audience", check:true},
   {description:"L'utente può passare da una clip all'altra in maniera molto semplice", check:true},
   {description:"Il sistema riproduce la prima clip sul luogo in cui si trova", check:true},
   {description:"Il sistema sceglie il prossimo luogo da visitare", check:true},
   {description:"Il sistema ri-seleziona il luogo precedente", check:true},
   {description:"Il sistema riproduce il prossimo clip in lista sullo stesso luogo da visitare", check:true},
   {description:"Il sistema riprende la riproduzione", check:true},
   {description:"Meccanismo per filtrare la playlist di clip in base ad alcune caratteristiche", check:true},
   {description:"Visualizzazione di un'area per la registrazione ed il login, se l'utente non è loggato", check:true},
   {description:"Scelta della lingua/delle lingue dei clip", check:true},
   {description:"Scelta del tipo di audience", check:true},
   {description:"Scelta del tipo di interessi culturali dell'utente", check:true},
   {description:"Creazione di percorsi guidati personalizzati", check:true},
   {description:"Visualizzazione di un'area contentente classifiche generali su clip, vlogger e percorsi", check:true},
   {description:"Visualizzazione di una mappa geografica in base alla propria posizione GPS", check:true},
   {description:"Possibilità di aggiustare la propria posizione sulla mappa, trascinando un apposito placeholder presente sulla mappa", check:true},
   {description:"Se la posizione GPS non è disponibile, l’utente deve poter specificare manualmente la posizione navigando sulla mappa eventualmente zoomando oppure attraverso l’inserimento di: Via, Civico, Città, Provincia, Paese", check:true},
   {description:"Visualizzazione dei luoghi turistici nei dintorni, in base alla posizione specificata e su un'area specificabile dall'utente", check:true},
   {description:"Mostrare la playlist delle clip sui luoghi turistici di interesse. Estrarre le audio-guide da YouTube.", check:true},
   {description:"Possibilità di filtrare i luoghi turistici in base alla tipologia e all’orario di apertura/chiusura.", check:true},
   {description:"Possibilità di taggare un luogo turistico come già visitato. Visualizzare il tag sulla mappa.", check:true},
   {description:"Accesso ai contenuti di Wikipedia: cercare il contenuto di DBPedia relativo al luogo nella lingua richiesta e riprodurre il contenuto della descrizione iniziale con sintesi vocale", check:true},
   {description:"Implementare un meccanismo di acquisizione feedback dall’utente e visualizzare tale feedback sulla mappa.", check:true}
 ]

 var editorList = [
   {description:"Editing della clip (ad esempio rimuovere dall'inizio o dalla fine della traccia, comporre clip separate, modificare volume o altri parametri) (20 pt)", check:true},
   {description:"Composizione di più clip in un itinerario comune (un singolo upload su Youtube). Il browser deve comunque essere in grado di cercarle separatamente e riprodurle separatamente. (20 pt)", check:false},
   {description:"Visualizzazione dell’elenco dei feedback ricevuti dagli utenti e di statistiche sulle visualizzazioni. (5 pt)", check:true}
 ]
  var browserElements = [
    {name:"Map",icon:"map"},
    {name:"Search",icon:"search"},
    {name:"Charts",icon:"bar_chart"}
  ]

  var editorElements = [
    {name:"Your Places",icon:"apartment"},
    {name:"Your Clips",icon:"videocam"},
    {name:"Your Paths",icon:"directions"}
  ]

  var otherElements = [
    {name:"Checklist",icon:"check_circle"},
    {name:"About Us",icon:"emoji_people"},
    {name:"Settings",icon:"settings_applications"},
    {name:"Privacy Policy",icon:"policy"}
  ]

  var defaultPrefs = { language:'it',audience:"gen",category:"all", refreshTime:"120"}

  var searchType = [
    { name: "Place", id:'plc' },
    { name: "Clip", id:'clp' },
    { name: "Path", id:'pth' }
  ]
