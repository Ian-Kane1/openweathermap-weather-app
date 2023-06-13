// function to display the current weather data
function getCurrentWeather(data, zipCode) {
    console.log(data)
    // Check to see if the OpenWeather API returned an error
    if (data.cod == '404' || data.cod == '401' || zipCode.trim() == '') {
        // show the initially hidden div
        weatherContent.style.display = 'block'
        weatherContent.innerHTML = 'Please enter a valid Zip Code'
        return // exit
    }

    // create a col div element and add to the weatherContent div
    let col = document.createElement('div')
    col.setAttribute('class', 'col weather-col p-4')
    weatherContent.append(col)

    // create a date object from the dt property of the data object
    // convert the date object to a date string and time string
    let date = new Date(data.dt * 1000)
    var options = { day: 'numeric', month: 'short' };
    let dateStr = date.toLocaleDateString('en-us', options)
    var options = { hour: 'numeric', minute: 'numeric', hour12: true };
    let timeStr = date.toLocaleTimeString('en-us', options)

    // create sunrise and sunset date objects
    // convert the date objects to sunrise string and sunset string
    let sunrise = new Date(data.sys.sunrise * 1000)
    var options = { hour: 'numeric', minute: 'numeric', hour12: true };
    let sunriseStr = sunrise.toLocaleTimeString('en-us', options)
    let sunset = new Date(data.sys.sunset * 1000)
    let sunsetStr = sunset.toLocaleTimeString('en-us', options)

    // create an img element for the icon
    // set the src and alt attributes of the icon
    const icon = document.createElement('img')
    icon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    icon.setAttribute('alt', 'Weather Icon')

    // add weather data and icon to the col div
    col.innerHTML =
        '<div id="date-time-div">' + dateStr + ', ' + timeStr + '</div>' +
        '<div id="city-div">' + data.name + ', ' + data.sys.country + '</div>'
    let div = document.createElement('div')
    div.setAttribute('id', 'icon-temp-div')
    div.append(icon)
    div.innerHTML += '<span id="temp-span">' + data.main.temp + '&deg;F</span>' +
        '<span id="low-high-span" class="ms-3">' + data.main.temp_min + '&deg;F / ' + data.main.temp_max + '&deg;F</span>'
    col.append(div)
    col.innerHTML +=
        '<div id="feels-like-weather-div">' +
        '<span id="feels-like-div">Feels like ' + data.main.feels_like + '&deg;F.</span> ' +
        '<span id="weather-span">' + data.weather[0].description + '</span>' +
        '</div>' +
        '<div id="weather-info-div" class="ps-3">' +
        '<span id="humidity-span">Humidity: ' + data.main.humidity + '%</span>' +
        '<span id="windspeed-span" class="ms-2">Wind Speed: ' + data.wind.speed + ' miles/hour</span><br>' +
        '<span id="sunrise-span">Sunrise: ' + sunriseStr + '</span>' +
        '<span id="sunset-span" class="ms-2">Sunset: ' + sunsetStr + '</span>' +
        '</div>'
    weatherContent.style.display = 'block'
}

// function to display the 5 day / 3 hour weather forecast data
function getWeatherForecast(data, zipCode) {
    console.log(data)
    // check if error is returned
    if (data.cod == '404' || data.cod == '401' || zipCode.trim() == '') {
        weatherContent.style.display = 'block'
        weatherContent.innerHTML = 'Please enter a valid Zip Code'
        return
    }

    // create a div element for the city name
    // add the city name and city counrty to the name div
    let name = document.createElement('div')
    name.setAttribute('id', 'city-name-div')
    name.innerHTML = data.city.name + ', ' + data.city.country
    weatherContent.append(name)

    // iterate through array of forecast objects 
    data.list.forEach(forecast => {

        // create a col div element and add to the weatherContent div
        let col = document.createElement('div')
        col.setAttribute('class', 'col weather-col p-4 forecast-div')
        weatherContent.append(col)

        // create a date object from the dt property of the data object
        // convert the date object to a date string and time string
        let date = new Date(forecast.dt * 1000)
        var options = { day: 'numeric', month: 'short' };
        let dateStr = date.toLocaleDateString('en-us', options)
        var options = { hour: 'numeric', minute: 'numeric', hour12: true };
        let timeStr = date.toLocaleTimeString('en-us', options)

        // create an img element for the icon
        // set the src and alt attributes of the icon
        const icon = document.createElement('img')
        icon.setAttribute('src', `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`)
        icon.setAttribute('alt', 'Weather Icon')

        // check if the forecast is for the first forecast in the list
        // if so, add the date string to the weatherContent div
        if (forecast.dt == data.list[0].dt) {
            let day = document.createElement('div')
            day.setAttribute('id', 'day-div')
            day.append(dateStr)
            weatherContent.insertBefore(day, col)
        }

        // check if the time string is 2:00 AM
        // if so, add the date string to the weatherContent div
        if (timeStr == '2:00 AM') {
            let day = document.createElement('div')
            day.setAttribute('id', 'day-div')
            day.innerHTML = dateStr
            weatherContent.insertBefore(day, col)
        }

        // add weather data and icon to the col div
        col.innerHTML =
            '<div id="date-time-div">' + timeStr + '</div>'
        let div = document.createElement('div')
        div.setAttribute('id', 'icon-temp-div')
        div.append(icon)
        div.innerHTML += '<span id="temp-span">' + forecast.main.temp + '&deg;F</span>' +
            '<span id="low-high-span" class="ms-3">' + forecast.main.temp_min + '&deg;F / ' + forecast.main.temp_max + '&deg;F</span>'
        col.append(div)
        col.innerHTML +=
            '<div id="feels-like-weather-div">' +
            '<span id="feels-like-div">Feels like ' + forecast.main.feels_like + '&deg;F.</span> ' +
            '<span id="weather-span">' + forecast.weather[0].description + '</span>' +
            '</div>' +
            '<div id="weather-info-div" class="ps-3">' +
            '<span id="humidity-span">Humidity: ' + forecast.main.humidity + '%</span>' +
            '<span id="windspeed-span" class="ms-2">Wind Speed: ' + forecast.wind.speed + ' miles/hour</span><br>' +
            '<span id="cloudiness-span">Cloudiness: ' + forecast.clouds.all + '&#37;</span>' +
            '<span id="prob-of-rain-span" class="ms-2">Probability of Rain: ' + forecast.pop * 100 + '&#37;</span>'
        '</div>'
        weatherContent.style.display = 'block'
    });
}

// Declare Variables
const weatherContent = document.querySelector('#weather')
const API_KEY = "" // insert your API key here

// create 5 day forecast button
// place 5 day forecast button after current weather button
const forcastContent = document.createElement('button')
forcastContent.innerText = '5 Day Forcast'
forcastContent.setAttribute('id', 'getForecast')
document.querySelector('#getWeather').after(forcastContent)

// eventlistener for current weather button triggered by a mouseclick
// fetches weather data from api and calls current weather function
document.querySelector('#getWeather').addEventListener('click', function () {
    weatherContent.innerHTML = '' // clear out prior results
    let zipCode = document.querySelector('#zip').value
    let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},US&appid=${API_KEY}&units=imperial`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(url)
            // Call getCurrentWeather function
            getCurrentWeather(data, zipCode)
        }).catch((e) => {
            console.log(`This error occurred: ${e}`)
        })
})

// eventlistener for 5 day forecast button triggered by a mouseclick
// fetches weather data from api and calls forecast function
forcastContent.addEventListener('click', function () {
    weatherContent.innerHTML = ''
    let zipCode = document.querySelector('#zip').value
    let url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},US&appid=${API_KEY}&units=imperial`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(url)
            // Call getWeatherForecast function
            getWeatherForecast(data, zipCode)
        }).catch((e) => {
            console.log(`This error occurred: ${e}`)
        })
})