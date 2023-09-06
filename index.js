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

function showWeather(response){
    let actualTemperature = document.querySelector("#temperature");
    let actualCity = document.querySelector("#location");
    let actualDescription= document.querySelector("#description");
    let actualHValue= document.querySelector("#hvalue");
    let actualWValue= document.querySelector("#wvalue");
    let actualDate= document.querySelector("#date");
    let actualIcon= document.querySelector("#icon");

    actualTemperature.innerHTML= Math.round(response.data.temperature.current);
    actualCity.innerHTML= response.data.city;
    actualDescription.innerHTML=response.data.condition.description;
    actualHValue.innerHTML= response.data.temperature.humidity;
    actualWValue.innerHTML= response.data.wind.speed;
    actualDate.innerHTML= showDate(response.data.time*1000);
    actualIcon.setAttribute  ("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    actualIcon.setAttribute  ("alt", response.data.condition.description);    
}

let apiKey= "abet7074937b235fc6624oada0e683be";
let city = "Nairobi";
let units = "metric";
let apiUrl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showWeather);
