const axios = require("axios");

const API_KEY = "1aa3b3a2a30479c44d2b14e77bed9a07";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

function getWeatherData(city, callback) {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erreur API");
      }
      return res.json();
    })
    .then((weatherData) => callback(null, weatherData))
    .catch((error) => callback(error, null));
}


function displayWeather(error, data) {
  if (error) {
    console.error("Erreur :", error);
    return;
  }

  console.log("Ville :", data.name);
  console.log("Description :", data.weather[0].description);
  console.log("Temperature :", data.main.temp + " °C");
  console.log("Humidite :", data.main.humidity + " %");
}


function getWeatherDataAxios(city, callback) {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;

  axios.get(url)
    .then((response) => callback(null, response.data))
    .catch((error) => callback(error, null));
}


async function OpenLibraryAPI() {
  console.log("\n--- Open Library API ---");

  const url = "https://openlibrary.org/search.json?q=javascript";

  const response = await fetch(url);
  const data = await response.json();

  console.log("Titre du premier livre :", data.docs[0].title);
  console.log("Auteur :", data.docs[0].author_name?.[0]);
}


async function nasaAPI() {
  console.log("\n--- NASA API ---");

  const url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";

  const response = await fetch(url);
  const data = await response.json();

  console.log("Titre :", data.title);
  console.log("Date :", data.date);
  console.log("URL image :", data.url);
}


async function randomUserAPI() {
  console.log("\n--- RandomUser API ---");

  const url = "https://randomuser.me/api/";

  const response = await fetch(url);
  const data = await response.json();

  const user = data.results[0];
  console.log("Nom :", user.name.first, user.name.last);
  console.log("Email :", user.email);
  console.log("Pays :", user.location.country);
}



// main
getWeatherData("Sousse", displayWeather);

getWeatherDataAxios("Sousse", (error, data) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log("Description :", data.weather[0].description);
  console.log("Température :", data.main.temp + " °C");
  console.log("Humidité :", data.main.humidity + " %");
});

OpenLibraryAPI();

nasaAPI();

randomUserAPI();