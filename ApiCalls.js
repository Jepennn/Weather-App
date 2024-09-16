// Purpose: This file contains the functions that fetch the data from the APIs.

/*----------------------geoAPI starts here----------------------*/
async function geoAPI(place) {
  const apiKey = "55ee6e62cda44578642b0677234564f3";
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  //Washing the data
  return {
    lat: data[0].lat,
    lon: data[0].lon,
  };
}
/*----------------------geoAPI ends here----------------------*/

/*-------------------Function that fetches the UV index data from the OpennUV.io API------------------------------*/
async function getUvIndex(place) {
  const apiKey = "openuv-3mktcrlzxrg6x1-io";

  //Fetching the cordinates from the geoAPI
  const { lat, lon } = await geoAPI(place);

  //Preparing the headers for the request
  const myHeaders = new Headers();
  myHeaders.append("x-access-token", apiKey);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  // Fetching the data from the API
  const response = await fetch(
    `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`,
    requestOptions
  );

  //Parsing the data
  const data = await response.json();

  //washing the data
  const uvIndexData = {
    uvIndex: data.result.uv.toFixed(1),
    uvMax: data.result.uv_max.toFixed(1),
  };
  return uvIndexData;
}

/*--------------------------------------------------------------------------*/

/*----------------------Function that fetches the weather data from openWeather API.--------------------*/
async function getWeatherDetails(place) {
  const apiKey = "55ee6e62cda44578642b0677234564f3";

  //Fetching the cordinates from the geoAPI
  const { lat, lon } = await geoAPI(place);

  // Fetching the data from the API
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();

  //Washing the data
  const weatherDetails = {
    city: data.name,
    country: data.sys.country,
    temp: data.main.temp.toFixed(0),
    weatherDescription: data.weather[0].description,
    icon: data.weather[0].icon,
  };
  console.log(weatherDetails);
  return weatherDetails;
}

/*-----------------------------------------------------------------------------------*/

/*-----------------exporting api functions------------------ */
export { getWeatherDetails };
export { getUvIndex };
