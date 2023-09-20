function showDate(timestamp) {
let now= new Date (timestamp);

let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
let months= ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

let day= days[now.getDay()];
let month= months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
if (hour<10) {
    hour=`0${hour}`;
}
let minutes = now.getMinutes();
if (minutes<10) {
    minutes=`0${minutes}`;
}

return `${day} ${date} ${month}, ${hour}:${minutes}`;

}

function formatDay(timestamp) {
    let now= new Date (timestamp);
    
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
    let months= ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
    let day= days[now.getDay()];
    let month= months[now.getMonth()];
    let date = now.getDate();

    
    return `${day}, ${date} ${month}`;
    
    }

function showForecast(response) {
    console.log(response.data.daily);
    let forecast =response.data.daily;

    let actualForecast= document.querySelector("#forecast-weather");
    let forecastHTML= `<div class="row">`;

    forecast.forEach (function(forecastDay, index){
        if (index < 6) {
    forecastHTML= forecastHTML + `
    <div class="col-2">
    <div class="dayOfTheWeek">${formatDay(forecastDay.time*1000)}</div>
    <div><img src=http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png id="forecast-icon"></div>
    <div class="temp-range"><span class="max">${Math.round(forecastDay.temperature.maximum)}°C</span> | <span class="min">${Math.round(forecastDay.temperature.minimum)}°C</span></div>
    </div>`;}
    });

    forecastHTML= forecastHTML + ` </div>`;

    actualForecast.innerHTML= forecastHTML;
}

function showCoordinates(response){
    let lat = response.latitude;
    let lon = response. longitude;
    let apiKey="abet7074937b235fc6624oada0e683be";
    let apiUrl= `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(showForecast);
}

function showWeather(response){
    let actualTemperature = document.querySelector("#temperature");
    let actualCity = document.querySelector("#location");
    let actualDescription= document.querySelector("#description");
    let actualHValue= document.querySelector("#hvalue");
    let actualWValue= document.querySelector("#wvalue");
    let actualDate= document.querySelector("#date");
    let actualIcon= document.querySelector("#icon");

    celciusTemperature= response.data.temperature.current;

    actualTemperature.innerHTML= Math.round(celciusTemperature);
    actualCity.innerHTML= response.data.city;
    actualDescription.innerHTML=response.data.condition.description;
    actualHValue.innerHTML= response.data.temperature.humidity;
    actualWValue.innerHTML= response.data.wind.speed;
    actualDate.innerHTML= showDate(response.data.time*1000);
    actualIcon.setAttribute  ("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    actualIcon.setAttribute  ("alt", response.data.condition.description);  
    
    showCoordinates(response.data.coordinates)

}

function search(city) {
    let apiKey= "abet7074937b235fc6624oada0e683be";
    let units = "metric";
    let apiUrl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showWeather);
}

function showCity(event) {
    event.preventDefault();
    let searchInput= document.querySelector("#search-input");
    search(searchInput.value);

}

function showFtemp(event){
    event.preventDefault();
    cLink.classList.remove("active");
    fLink.classList.add("active");
    let actualTemperature = document.querySelector("#temperature");
    actualTemperature.innerHTML= Math.round((9/5 * celciusTemperature) + 32);

}

function showCtemp(event){
    event.preventDefault();
    fLink.classList.remove("active");
    cLink.classList.add("active");
    let actualTemperature = document.querySelector("#temperature");
    actualTemperature.innerHTML= Math.round(celciusTemperature);

}

let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener ("submit", showCity);

let fLink= document.querySelector("#ftemp");
fLink.addEventListener("click", showFtemp);

let cLink= document.querySelector("#ctemp");
cLink.addEventListener("click", showCtemp);

search("Thika");