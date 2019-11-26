var approx= 0.1;
var queryUrl;

function setQuery(approx){

  var lat = placeMarker.getPosition().lat();
  var long =placeMarker.getPosition().lng();

  const url="http://dbpedia.org/sparql";

  var queryPlaces = [
  "  PREFIX dbo: <http://dbpedia.org/ontology/>",
  "  PREFIX dbr: <http://dbpedia.org/resource/>",
  "  PREFIX dbp: <http://dbpedia.org/property/>",
  "  PREFIX foaf: <http://xmlns.com/foaf/0.1/>",
  "  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>",
  "  SELECT  DISTINCT ?name ?lat ?long ?abstract ?img",
  "    where {",
  "       ?place foaf:name ?name .",
  "       ?place dbo:thumbnail ?img.",
  "       ?place rdf:type dbo:Place . ",
  "       ?place geo:lat ?lat . ",
  "       ?place geo:long ?long . ",
  "       ?place dbo:abstract ?abstract.",
  "       FILTER (?lat > " + (lat - approx)+ " && ?lat < "+ (lat + approx) +")",
  "       FILTER (?long > "+ (long - approx) + " && ?long <"+ (long + approx) +") ",
  "       FILTER (lang(?abstract) = 'it')",
  "     }",
  " limit 50"
  ].join(" ");

  queryUrl = url+"?query="+ encodeURIComponent(queryPlaces) +"&format=json";
}

function selectPlace() {

  document.getElementById('content_content').innerHTML = '';
  document.getElementById('content_title').innerHTML = 'Select your Place';
  var div = document.createElement("div");
  document.getElementById('content_content').appendChild(div);
  setQuery(approx);
  fetch(queryUrl).then(function(response){
    return response.json();
  }).then(function(jsonResponse){
    for(var i in jsonResponse.results.bindings){
      var title = jsonResponse.results.bindings[i].name.value;
      var descr = jsonResponse.results.bindings[i].abstract.value;
      var img = jsonResponse.results.bindings[i].img.value;
      var button = new ActionButton('select');
      button.addEventListener("click", function(){

      });
      var placeCard = new CardTemp(title,null,descr,img,button);
      placeCard.className += ' about-card';
      div.appendChild(placeCard);
    }
  })
  mainDrawer.open = false;
  pageDrawer.open = true;
}
