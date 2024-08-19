import { cities } from "./cordinates.js";

// Function that fetches the UV-index data from the API
function getUVIndex(city) {
  const token = "Your API key here";

  const myHeaders = new Headers();
  myHeaders.append("x-access-token", token);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  // Fetching the data from the API
  fetch(
    `https://api.openuv.io/api/v1/uv?lat=${cities[city].lat}&lng=${cities[city].lon}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log("Something bad happend", error));
}

getUVIndex("Stockholm");

/*--------------------------------------------------------------------------*/

// Function that fetches the weather data from the API (Use metric units för att få data i Celsius)

async function getWeatherDetails(city) {
  const apiKey = "Your API key here";

  const lat = cities[city].lat;
  const lon = cities[city].lon;

  // Fetching the data from the API
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();

  console.log(data);
}

getWeatherDetails("Stockholm");
