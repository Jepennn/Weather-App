// Description: This file contains the functions that fetch data from the backend.

/*--------------------------------------Fetching data from backend----------------------------------------*/
async function getWeatherDetails(place) {
  try {
    const response = await fetch(`http://localhost:5001/api/weather/${place}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data from the backend");
    }

    const data = await response.json();

    //Washing the data
    const weatherDetails = {
      city: data.city,
      country: data.country,
      temp: data.temperature.toFixed(0),
      weatherDescription: data.description,
      icon: data.icon,
      uvIndex: data.uvIndex,
      uvMax: data.uvMax,
    };
    return weatherDetails;
  } catch (error) {
    console.error("Failed to fetch weather details:", error);
  }
}
/*--------------------------------------Fetching data from backend ends here----------------------------------------*/

getWeatherDetails("Stockholm");

/*-----------------exporting api functions------------------ */
export { getWeatherDetails };
