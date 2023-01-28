let searchBtn = document.querySelector(".btn");
let searchInput = document.querySelector("#search-input");
let history = document.querySelector("#history");
let listGroup = document.querySelector(".list-group");
let currentDay = document.querySelector("#today");
let forecastEl = document.querySelector("#forecast");

for ( var i = 0; i < localStorage.length; i++ ) {
    let city = localStorage.getItem(localStorage.key(i))
    console.log(city);
    let createButton = document.createElement("BUTTON");
    createButton.textContent = city;
    createButton.className = "btn btn-secondary"
    history.prepend(createButton);
  }


searchBtn.addEventListener("click", function(){
    event.preventDefault()
    forecastEl.innerHTML = "";
    let aaa = searchInput.value;
    myFunction(aaa)
    searchInput.value="";
})


listGroup.addEventListener("click", function(){
    event.preventDefault()
    forecastEl.innerHTML = "";
    let aaa = event.target.textContent
    myFunction(aaa)
})


function myFunction(cityToSearchFor) {

    let city = cityToSearchFor;
    localStorage.setItem(city, city);
    let createButton = document.createElement("BUTTON");
    createButton.textContent = city;
    createButton.className = "btn btn-secondary"
    history.prepend(createButton);
    let queryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&units=metric&appid=16c44a3c4ffd80699d455707a330e33e"

    fetch(queryURL)
    .then(response => response.json())
    .then(citiesFound => {
        var lat = citiesFound[0].lat;
        var lon = citiesFound[0].lon;
        console.log(lat, lon);

        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=16c44a3c4ffd80699d455707a330e33e`)

    })

    .then(response => response.json())
    .then(data => {
        let date = moment(data.list[0].dt_txt).format('DD-MM-YYYY');;
        let weatherIcon = "http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png";
        let temp = data.list[0].main.temp;
        let wind = data.list[0].wind.speed;
        let humidity = data.list[0].main.humidity;
        console.log(data);
        console.log(data.list[8].weather[0].icon);
        
        currentDay.innerHTML = 
        `<div class="current">
        <h1>${data.city.name} (${date}) <img src="${weatherIcon}"></h1>
        <p>Temp: ${temp} °C</p>
        <p>Wind: ${wind} KPH</p>
        <p>Humidity: ${humidity}%</p>
        </div>`;

        // Same as above but for loop for each day from now
        // 8, 16, 24, 32, 39
        function function2(p) {
            date = moment(data.list[p].dt_txt).format('DD-MM-YYYY');;
            weatherIcon = "http://openweathermap.org/img/wn/" + data.list[p].weather[0].icon + "@2x.png";
            temp = data.list[p].main.temp;
            wind = data.list[p].wind.speed;
            humidity = data.list[p].main.humidity;

            forecastEl.innerHTML += 
            `<div class="fiveDay">
            <h3>${date}</h3>
            <img src="${weatherIcon}">
            <p>Temp: ${temp} °C</p>
            <p>Wind: ${wind} KPH</p>
            <p>Humidity: ${humidity}%</p>
            </div>`;
        }
        function2(8);
        function2(16);
        function2(24);
        function2(32);
        function2(39);

        
    })
}

