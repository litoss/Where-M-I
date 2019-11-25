var lat = 45;
var long = 10;
var approx= 0.1;
var queryUrl;

function setQuery(lat, long, approx){
  const url="http://dbpedia.org/sparql";

  var queryPlaces = [
  "  PREFIX dbo: <http://dbpedia.org/ontology/>",
  "  PREFIX dbr: <http://dbpedia.org/resource/>",
  "  PREFIX dbp: <http://dbpedia.org/property/>",
  "  PREFIX foaf: <http://xmlns.com/foaf/0.1/>",
  "  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>",
  "  SELECT  DISTINCT ?name?lat ?long ?abstract",
  "    where {",
  "       ?place foaf:name ?name .",
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

function go(){
  window.location.href = queryUrl;
}

function getJsonValue() {
  fetch(queryUrl).then(function(response){
    return response.json();
  }).then(function(jsonResponse){
    for(var i in jsonResponse.results.bindings)
    console.log(jsonResponse.results.bindings[i].name.value)
  })
}
var div = document.createElement("div");
document.body.appendChild(div);

function print() {
  setQuery(lat,long,approx);
  fetch(queryUrl).then(function(response){
    return response.json();
  }).then(function(jsonResponse){
    for(var i in jsonResponse.results.bindings){
      var name =document.createElement("h4");
      var description = document.createElement("h6");
      name.innerHTML = jsonResponse.results.bindings[i].name.value;
      description.innerHTML =jsonResponse.results.bindings[i].abstract.value;
      div.appendChild(name);
      div.appendChild(description);
    }
  })
}

function pagePlaces() {
  lat = placeMarker.getPosition().lat();
  long =placeMarker.getPosition().lng();
  document.getElementById('content_content').innerHTML = '';
  document.getElementById('content_title').innerHTML = 'posti vicini';
  var div = document.createElement("div");
  document.getElementById('content_content').appendChild(div);
  setQuery(lat,long,approx);
  fetch(queryUrl).then(function(response){
    return response.json();
  }).then(function(jsonResponse){
    for(var i in jsonResponse.results.bindings){
      var name =document.createElement("h4");
      var description = document.createElement("h6");
      name.innerHTML = jsonResponse.results.bindings[i].name.value;
      description.innerHTML =jsonResponse.results.bindings[i].abstract.value;
      div.appendChild(name);
      div.appendChild(description);
    }
  })
  mainDrawer.open = false;
  pageDrawer.open = true;
}
