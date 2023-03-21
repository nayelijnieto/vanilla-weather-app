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
  } else {
    alert("What city's weather would you like to search?");
  }
  let apiKey = "a710bd8bd76400c9658ef649d9e81728";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeather);
}

let searchButton = document.querySelector("button");
searchButton.addEventListener("click", searchCity);

///////above: Search City & Weather ////// below: display current location weather/////

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let feelsLikeTemp = Math.round(response.data.main.feels_like);
  let windSpeed = Math.round(response.data.wind.speed);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${temperature}°F`;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}`;
  let feelsLike = document.querySelector(".feels-like");
  feelsLike.innerHTML = `Feels like: ${feelsLikeTemp}°`;
  let windspeed = document.querySelector(".windspeed");
  windspeed.innerHTML = `Wind speed: ${windSpeed} mph`;
  let description = document.querySelector(".description");
  description.innerHTML = `Description: ${response.data.weather[0].description}`;
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

let locationButton = document.querySelector(".current-location-button");
locationButton.addEventListener("click", retrieveLocation);
