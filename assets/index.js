let searchBtn = document.querySelector(".btn");
let searchInput = document.querySelector("#search-input");
let history = document.querySelector("#history");
let listGroup = document.querySelector(".list-group");


searchBtn.addEventListener("click", function(){
    event.preventDefault()
    let aaa = searchInput.value;
    myFunction(aaa)
    searchInput.value="";
})





listGroup.addEventListener("click", function(){
    event.preventDefault()
    let aaa = event.target.textContent
    myFunction(aaa)
})






function myFunction(cityToSearchFor) {
    let city = cityToSearchFor;
    let createButton = document.createElement("BUTTON");
    createButton.textContent = city;
    createButton.className = "btn btn-secondary"
    history.prepend(createButton);
    let queryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=16c44a3c4ffd80699d455707a330e33e"

    fetch(queryURL)
    .then(response => response.json())
    .then(citiesFound => {
        var lat = citiesFound[0].lat;
        var lon = citiesFound[0].lon;
        console.log(lat, lon);

        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=16c44a3c4ffd80699d455707a330e33e`)

    })

    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
}