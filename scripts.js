// state
let currCity = localStorage.getItem('city') || 'Lagos';
let units = 'metric';

// selectors
let city = document.querySelector('.weather__city');
let datetime = document.querySelector('.weather__datetime');
let weather__forecast = document.querySelector('.weather__forecast');
let weather__temperature = document.querySelector('.weather__temperature');
let weather__icon = document.querySelector('.weather__icon');
let weather__minmax = document.querySelector('.weather__minmax');
let weather__realfeel = document.querySelector('.weather__realfeel');
let weather__humidity = document.querySelector('.weather__humidity');
let weather__wind = document.querySelector('.weather__wind');
let weather__pressure = document.querySelector('.weather__pressure');

//search
document.querySelector('.weather__search').addEventListener('submit', e => {
  let search = document.querySelector('.weather__searchform');
  // prevent default action
  e.preventDefault();
  currCity = search.value;
  getWeather();
  localStorage.setItem('city', currCity);
  search.value = '';
})

// units
document.querySelector('.weather_unit_celsius').addEventListener('click', () => {
  units ='metric';
  getWeather();
});

document.querySelector('.weather_unit_farenheit').addEventListener('click', () => {
  units ='imperial';
  getWeather();
});

function convertTimeStamp(timestamp, timezone) {
  const convertTimeZone = timezone / 3600; // convert seconds to hours

  const date = new Date(timestamp * 1000);

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: `Etc/GMT${convertTimeZone >= 0 ? '-' : '+'}${Math.abs(convertTimeZone)}`,
    hour12: true,
  };
  return date.toLocaleString('en-US', options);
}

// convert country code to name
function convertCountryCode(country) {
  let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
  return regionNames.of(country);
}

function getWeather() {
  const API_KEY;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=0226c3de9dcc6566e26d5b3e84e72d0c&units=${units}`).then(res => res.json()).then(data => {
    city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
    datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
    weather__forecast.innerHTML = `<p>${data.weather[0].main}</p>`;
    weather__temperature.innerHTML = `<p>${data.main.temp.toFixed()}&#176</p>`;
    weather__icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"></img>`;
    weather__minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p> 
                                 <p>Max: ${data.main.temp_max.toFixed()}&#176</p>`;
    weather__realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
    weather__humidity.innerHTML = `${data.main.humidity.toFixed()}%`;
    weather__wind.innerHTML = `${data.wind.speed}${units === 'imperial' ? 'mph' : 'm/s'}`;
    weather__pressure.innerHTML = `${data.main.pressure.toFixed()} hpa`;
  });
}

document.body.addEventListener('load', getWeather());
