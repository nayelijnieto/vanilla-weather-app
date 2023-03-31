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

// display current weather //

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
  h2.innerHTML = `${fahrenheitTemperature}°F`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  feelsLike.innerHTML = `Feels like: ${feelsLikeTemp}°`;
  windspeed.innerHTML = `Wind speed: ${windSpeed} mph`;
  description.innerHTML = `Description: ${response.data.weather[0].description}`;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `response.data.weather[0].description`);

  getForecast(response.data.coord);
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

//Forecast Day Function//

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[day];
}
//Collect & Display Forecast//
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
            <div class="forecast-date">${formatDay(forecastDay.dt)}</div> 
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" width="50px"/>
            <div class="forecast-temperatures">
                <span class="temperature-maximums">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="temperature-minimums">${Math.round(
                  forecastDay.temp.min
                )}°</span>
                
            </div>
        </div>
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "a710bd8bd76400c9658ef649d9e81728";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

let searchButton = document.querySelector(".search-now-form");
searchButton.addEventListener("click", searchCity);

let locationButton = document.querySelector(".current-location-button");
locationButton.addEventListener("click", retrieveLocation);
