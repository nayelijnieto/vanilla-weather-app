let now = new Date();

let p = document.querySelector("p");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];
p.innerHTML = `${day},  ${month}  ${date}th,  ${year} </br> ${hours}:${minutes}`;

//Search Engine Portion//

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-engine");
  let city = searchInput.value;
  if (city) {
    let h1 = document.querySelector("h1");
    h1.innerHTML = `${city}`;
  }
  let apiKey = "a710bd8bd76400c9658ef649d9e81728";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeather);
}

let searchButton = document.querySelector(".search-now-form");
searchButton.addEventListener("click", searchCity);

///////above: Search City & Weather ////// below: display current location weather/////

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let feelsLikeTemp = Math.round(response.data.main.feels_like);
  let windSpeed = Math.round(response.data.wind.speed);
  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("h2");
  let humidity = document.querySelector(".humidity");
  let feelsLike = document.querySelector(".feels-like");
  let windspeed = document.querySelector(".windspeed");
  let description = document.querySelector(".description");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = Math.round(response.data.main.temp);

  h1.innerHTML = `${response.data.name}`;
  h2.innerHTML = `${fahrenheitTemperature}°`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}`;
  feelsLike.innerHTML = `Feels like: ${feelsLikeTemp}°`;
  windspeed.innerHTML = `Wind speed: ${windSpeed} mph`;
  description.innerHTML = `Description: ${response.data.weather[0].description}`;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `response.data.weather[0].description`);
}

function retrieveLocation(position) {
  let apiKey = "a710bd8bd76400c9658ef649d9e81728";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
  console.log(apiUrl);
}
navigator.geolocation.getCurrentPosition(retrieveLocation);
//Unit Conversion // fahrenheit & celsius //
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("h2");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let celsiusTemperature = Math.round(((fahrenheitTemperature - 32) * 5) / 9);
  temperatureElement.innerHTML = `${celsiusTemperature}°`;
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("h2");
  temperatureElement.innerHTML = `${fahrenheitTemperature}°`;
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["THU", "FRI", "SAT", "SUN", "MON", "TUE"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col-2">
            <div class="forecast-date">${day}</div>
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png" width="50px"/>
            <div class="forecast-temperatures">
                <span class="temperature-maximums">18°</span>
                <span class="temperature-minimums">12°</span>
                
            </div>
        </div>
`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();

let locationButton = document.querySelector(".current-location-button");
locationButton.addEventListener("click", retrieveLocation);

let fahrenheitTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
