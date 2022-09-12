const APIKEY = "653315ab4df73a915ab461ad84af107a";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
document.addEventListener("DOMContentLoaded", () => {
  search.focus();
});

const url = (loc) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${APIKEY}`;

const KelvinToCelsius = (k) => {
  return Math.floor(k - 273.15);
};

const addWeather = (data) => {
  const temp = KelvinToCelsius(data.main.temp);
  const weather = document.createElement("div");
  weather.classList.add("weather");
  weather.innerHTML = `
    <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        <small>${data.weather[0].main}</small>
  `;
  main.innerHTML = "";
  main.appendChild(weather);
};

const weatherByLocation = async (loc) => {
  const response = await fetch(url(loc), { origin: "cors" });
  const respData = await response.json();

  addWeather(respData);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const loc = search.value;
  if (loc) {
    weatherByLocation(loc);
  }
});
