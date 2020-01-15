var approx=0.001;
var queryUrl;

function setQuery(position, approx){

  var lat = position.lat();
  var long = position.lng();

  const url="https://dbpedia.org/sparql";

  var queryPlaces = [
  "  PREFIX dbo: <http://dbpedia.org/ontology/>",
  "  PREFIX dbr: <http://dbpedia.org/resource/>",
  "  PREFIX dbp: <http://dbpedia.org/property/>",
  "  PREFIX foaf: <http://xmlns.com/foaf/0.1/>",
  "  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>",
  "  SELECT  DISTINCT ?name ?lat ?long ?abstract ?img",
  "    where {",
  "       ?place rdfs:label ?name .",
  "       FILTER (lang(?name) = 'en')",
  "       ?place dbo:thumbnail ?img.",
  "       ?place geo:lat ?lat . ",
  "       ?place geo:long ?long . ",
  "       OPTIONAL {?place dbo:abstract ?abstract.}",
  "       FILTER (?lat > " + (lat - approx)+ " && ?lat < "+ (lat + approx) +")",
  "       FILTER (?long > "+ (long - approx) + " && ?long <"+ (long + approx) +") ",
  "       FILTER (lang(?abstract) = 'en')",
  "     }",
  " limit 50"
  ].join(" ");

  queryUrl = url+"?query="+ encodeURIComponent(queryPlaces) +"&format=json";
}
