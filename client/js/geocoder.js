// Google Maps API Geocoder
// https://developers.google.com/maps/documentation/javascript/reference/geocoder

var geocoder;

function geocoder_init(){
  geocoder = new google.maps.Geocoder;
}

function geocoder_geocode(address){
  return new Promise((resolve,reject) =>{
    geocoder.geocode({'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        resolve(results[0].geometry.location);
      }else{
        reject();
      }
    });
  });
}
