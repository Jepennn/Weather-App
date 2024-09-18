import { getWeatherDetails } from "./ApiCalls.js";

/*------------------------------Setting date top right corner----------------------------*/
const monthNames = [
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

let date = new Date();
let day = date.getDate();
let month = monthNames[date.getMonth()];

date = `${day} ${month}`;
document.getElementById("date").innerText = date;
/*----------------------------------Setting date right corener ends here------------------------------------*/

/*-------------------------------Starting to show stockholms weather as defualt------------------------------*/
presentWeather("Stockholm");

/*----------------------------------Setting up serch functions--------------------------------------------*/
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents the page from reloading when the form is submitted

  const inputData = capitalizeFirstLetter(searchInput.value).trim();

  presentWeather(inputData);
  clearSearchInput();
});

/*--------------------------------Setting temperatur details------------------------------------------------*/
function presentWeather(place = "Stockholm") {
  const uvIndex = document.getElementById("uv-index");
  const temp = document.getElementById("temperature");
  const city = document.getElementById("city");
  const icon = document.getElementById("weather-icon");
  // const weatherDescription = document.getElementById("weather-description");

  getWeatherDetails(place)
    .then((data) => {
      uvIndex.innerText = `UV Index: ${data.uvIndex}, max: ${data.uvMax}`;
      temp.innerText = `${data.temp}°`;
      city.innerText = `${data.country}, ${data.city}`;
      icon.setAttribute(
        "src",
        `http://openweathermap.org/img/w/${data.icon}.png`
      );
    })
    .catch((error) => {
      temp.innerText = "Error";
      city.innerText = "Not found";
      uvIndex.innerText = "UV Index: Can't find any data";
      console.log("Something bad happend", error);
    });
}
/*------------------------Setting weather details ends here--------------------------*/

/*--------------------------------------Some small help functions---------------------------------------*/
function clearSearchInput() {
  searchInput.value = "";
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
/*---------------------------------Some small help functions ends here----------------------------------*/
