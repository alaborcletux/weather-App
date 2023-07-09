let weatherApiKey = "81dc6cdb434e2979f0032d9ebbab0e49";
let weatherDataEl = document.getElementById("weather-data");
let cityInput = document.getElementById("city-input");
let formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    let cityValue = cityInput.value;
    getWeatherData(cityValue)
})

async function getWeatherData(cityValue) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${weatherApiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("Network response was not ok")
        }
        let data = await response.json()
        // console.log(data)

        let temperature = Math.round(data.main.temp)
        let description = data.weather[0].description
        let icon = data.weather[0].icon

        // this is an array  
        let details = [
        `Feels like:${Math.round(data.main.feels_like)}`,
        `Humidity: ${data.main.humidity}%`,
        `Wind speed: ${data.wind.speed} m/s`,
        ];

        // console.log(weatherDataEl.querySelector(".icon"));
        // console.log(weatherDataEl.querySelector(".temperature"));


        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather Icon">`;
        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;
        weatherDataEl.querySelector(".description").textContent = `${description}`;

        weatherDataEl.querySelector(".details").innerHTML = details.map(detail => `<div>${detail}</div>`).join("");

    } catch (error) {

        weatherDataEl.querySelector(".description").textContent = "An error occurred. Please try again later.";
    }
}


