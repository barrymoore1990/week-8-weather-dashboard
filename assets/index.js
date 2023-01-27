let city = "London"
let queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=16c44a3c4ffd80699d455707a330e33e"

fetch(queryURL)
.then(response => response.json())
.then(citiesFound => {
    var lat = citiesFound[0].lat;
    var lon = citiesFound[0].lon;
    console.log(lat, lon);

    return fetch(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=16c44a3c4ffd80699d455707a330e33e`)

})

.then(response => response.json())
// .then(function(response) {
.then(data => {
    console.log(data);
})