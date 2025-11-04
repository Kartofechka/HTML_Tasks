const API_KEY = 'e6f48566ef9144d7a8d07fafd2ade2bb';
const API_URL = 'https://api.weatherbit.io/v2.0/current';

const latInput = document.getElementById('latitude');
const lonInput = document.getElementById('longitude');
const weatherBtn = document.getElementById('getWeatherBtn');
const weatherDiv = document.getElementById('weatherInfo');
const errorDiv = document.getElementById('errorMessage');
const cityElem = document.getElementById('cityName');
const tempElem = document.getElementById('temperature');
const descElem = document.getElementById('weatherDescription');
const iconElem = document.getElementById('weatherIcon');
const humidElem = document.getElementById('humidity');
const windElem = document.getElementById('windSpeed');
const pressElem = document.getElementById('pressure');
const cityBtns = document.querySelectorAll('.city-btn');

function updateStyle(code, isDay) {
    document.body.className = '';
    
    document.querySelectorAll('.rain-drop, .snow-flake').forEach(el => el.remove());
    
    if (!isDay) {
        document.body.classList.add('night');
        return;
    }

    if (code >= 200 && code < 300) {
        document.body.classList.add('stormy');
    } else if (code >= 300 && code < 600) {
        document.body.classList.add('rainy');
        makeRain();
    } else if (code >= 600 && code < 700) {
        document.body.classList.add('snowy');
        makeSnow();
    } else if (code >= 700 && code < 800) {
        document.body.classList.add('cloudy');
    } else if (code === 800) {
        document.body.classList.add('sunny');
    } else if (code > 800 && code < 900) {
        document.body.classList.add('cloudy');
    } else {
        document.body.classList.add('sunny');
    }
}

function makeRain() {
    for (let i = 0; i < 50; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * 100 + 'vw';
        drop.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(drop);
    }
}

function makeSnow() {
    for (let i = 0; i < 30; i++) {
        const flake = document.createElement('div');
        flake.className = 'snow-flake';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.animationDelay = Math.random() * 5 + 's';
        document.body.appendChild(flake);
    }
}

async function getWeather(lat, lon) {
    if (!lat || !lon) {
        errorDiv.textContent = 'Пожалуйста, введите широту и долготу';
        errorDiv.classList.remove('hidden');
        return;
    }

    if (isNaN(lat) || isNaN(lon)) {
        errorDiv.textContent = 'Широта и долгота должны быть числами';
        errorDiv.classList.remove('hidden');
        return;
    }

    const latVal = parseFloat(lat);
    const lonVal = parseFloat(lon);

    if (latVal < -90 || latVal > 90) {
        errorDiv.textContent = 'Широта должна быть между -90 и 90';
        errorDiv.classList.remove('hidden');
        return;
    }

    if (lonVal < -180 || lonVal > 180) {
        errorDiv.textContent = 'Долгота должна быть между -180 и 180';
        errorDiv.classList.remove('hidden');
        return;
    }

    weatherBtn.textContent = 'Загрузка...';
    weatherBtn.disabled = true;

    try {
        const res = await fetch(`${API_URL}?lat=${latVal}&lon=${lonVal}&key=${API_KEY}&lang=ru`);
        
        if (!res.ok) {
            if (res.status === 400) throw new Error('Неверные координаты');
            if (res.status === 401) throw new Error('Ошибка авторизации API');
            if (res.status === 429) throw new Error('Превышен лимит запросов');
            throw new Error('Ошибка сервера');
        }

        const data = await res.json();
        
        if (data.data && data.data.length > 0) {
            showWeather(data.data[0]);
            errorDiv.classList.add('hidden');
        } else {
            throw new Error('Данные о погоде не найдены');
        }

    } catch (err) {
        errorDiv.textContent = err.message;
        errorDiv.classList.remove('hidden');
        weatherDiv.classList.add('hidden');
    } finally {
        weatherBtn.textContent = 'Показать погоду';
        weatherBtn.disabled = false;
    }
}

function showWeather(data) {
    cityElem.textContent = data.city_name || 'Неизвестный город';
    tempElem.textContent = Math.round(data.temp);
    descElem.textContent = data.weather.description;
    
    iconElem.src = `https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`;
    iconElem.alt = data.weather.description;

    humidElem.textContent = data.rh;
    windElem.textContent = data.wind_spd.toFixed(1);
    pressElem.textContent = data.pres.toFixed(0);

    const dayTime = data.pod === 'd';
    updateStyle(data.weather.code, dayTime);

    weatherDiv.classList.remove('hidden');
}

weatherBtn.addEventListener('click', () => {
    const lat = latInput.value.trim();
    const lon = lonInput.value.trim();
    getWeather(lat, lon);
});
