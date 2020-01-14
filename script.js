const menu = document.getElementById("menu");
const menuIcon = document.getElementById("menu-icon");

menuIcon.addEventListener("click",() => {
    menu.classList.toggle("close");
});

const accordions = document.querySelector('.accordions');

accordions.addEventListener("click",(event)=>{
   let target = event.target.closest(".accordion");
    console.log(target.classList);
    target.classList.toggle("show");

});


let prevScrollPos = window.pageYOffset;
window.addEventListener('scroll', ()=> {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollPos < currentScrollPos) {
        menu.classList.add("hide");
        if(!menu.classList.contains("close")){
            menu.classList.add("close");
        }
    } else {
        menu.classList.remove("hide");
    }
    prevScrollPos = currentScrollPos;
});


const key = 'f8494e6ce0f5a7af7cff0a26a09c3343';

const searchInput = document.getElementById("search-field");
const searchBtn = document.getElementById("search-btn");

const today = new Date();
const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

const date = `${today.getDate()}th ${months[today.getMonth()]} ${today.getFullYear()}`;

const dateAndPlace = document.getElementById("date-place");
const tempField = document.getElementById("temp-field");
const weatherIcon = document.getElementById("weather__icon");
const weatherDesc = document.getElementById("about-weather");
const windSpeedField = document.getElementById("wind-speed");
const pressureField = document.getElementById("pressure");
const humidityField = document.getElementById("humidity");

searchBtn.addEventListener("click",updateWeatherDate);
searchInput.addEventListener('keypress',  (event)=>{
    if (event.key === 'Enter') {
        updateWeatherDate()
    }
});

    async function updateWeatherDate() {

        if (!searchInput.value) return null;

        const searchValue = isFinite(searchInput.value) ? `zip=${searchInput.value}` : `q=${searchInput.value}`;
        const json = await getWeatherData(searchValue);

        dateAndPlace.innerText = date + ` ${json.name}, ${json.sys.country}`;
        weatherIcon.src = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
        tempField.innerHTML = (json.main.temp - 273).toFixed() + '&#176;';
        weatherDesc.innerText = json.weather[0].description;
        windSpeedField.innerText = json.wind.speed;
        pressureField.innerText = json.main.pressure;
        humidityField.innerText = json.main.humidity;
};

async function getWeatherData(searchData) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${searchData}&appid=${key}`)
    return await response.json();
}

