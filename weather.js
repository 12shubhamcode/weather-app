const API_KEY = "617612bcfb981bbb7f221b09b096d2ee";
const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");

const checkWeather = async (city) => {
  const response = await fetch(API_URL + city + `&appid=${API_KEY}`);

  if (response.status === 404) {
    document.querySelector(".status-message").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${Math.round(
      data.main.temp
    )}°C`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed}km/h`;

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "image/cloud.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "image/sun.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "image/rain.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "image/mist.png";
    } else if (data.weather[0].main === "Haze") {
      weatherIcon.src = "image/haze.png";
    }
    weather.style.display = "block";
    document.querySelector(".status-message").style.display = "none";
  }
};

searchBtn.addEventListener("click", function () {
  checkWeather(searchBox.value);
});
searchBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
