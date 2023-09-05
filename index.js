function showWeather(response){
    let actualTemperature = document.querySelector("#temperature");
    let actualCity = document.querySelector("#location");
    let actualDescription= document.querySelector("#description");
    let actualHValue= document.querySelector("#hvalue");
    let actualWValue= document.querySelector("#wvalue");

    actualTemperature.innerHTML= Math.round(response.data.temperature.current);
    actualCity.innerHTML= response.data.city;
    actualDescription.innerHTML=response.data.condition.description;
    actualHValue.innerHTML= response.data.temperature.humidity;
    actualWValue.innerHTML= response.data.wind.speed;
    
}

let apiKey= "abet7074937b235fc6624oada0e683be";
let city = "Nairobi";
let units = "metric";
let apiUrl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showWeather);
