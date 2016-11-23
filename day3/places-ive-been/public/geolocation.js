var map;

if ("geolocation" in navigator){
  navigator.geolocation.getCurrentPosition(onLocation, onError);
}

function onLocation(position){

  var myPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  createMap(myPosition);
  LoadPositionFromStorage();
  setupAutocomplete();
}

function onError(err){
  console.log("What are you using, IE 7??", err);
}

function createMap(position){
  var mapOptions = {
    center: position,
    zoom: 17
  };

  map = new google.maps.Map($('#map')[0], mapOptions);
  createMarker(position);
}

function createMarker(position) {
  var marker = new google.maps.Marker({
    position: position,
    map: map
  });
}

function setupAutocomplete(){
  var input = $('#get-places')[0];
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', function(){
    var place = autocomplete.getPlace();
    if (place.geometry.location) {
      map.setCenter(place.geometry.location);
      createMarker(place.geometry.location);
      SavePositionToStorage(place.geometry.location);
      map.setZoom(17);
    } else {
      alert("The place has no location...?")
    }
  });
}

function SavePositionToStorage(position){
    var arrayPositions     = JSON.parse(window.localStorage.getItem("positions")) || [];

    arrayPositions.push(position);
    window.localStorage.setItem("positions",JSON.stringify(arrayPositions));
}

function LoadPositionFromStorage(){
  var arrayPositions = JSON.parse(window.localStorage.getItem("positions")) || [];

  arrayPositions.forEach(function(element){
    createMarker(element);
  });
}

