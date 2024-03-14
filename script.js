
document.getElementById("location-input").addEventListener('change', async ()=>{
    // Get the user's entered location
    const location = document.getElementById("location-input").value;
    
    //Fetch the weather data
    const weatherData = await getWeatherData(location);

    //Display weather data on a page
    displayWeatherData(weatherData);
});

const getWeatherData = async (location)=>{
    if(!location){
        return{};
    }

    const apikey = 'b72632cf51f5ae0af75dedc71e6a2364';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`);
    const data = await response.json();

    return data;
}

function getBackgroundColor(temperature){
    if(temperature < 0){
        return 'lightblue';
    }
    else if(temperature < 10){
        return 'lightgreen';
    }
    else if(temperature < 20){
        return 'lightyellow';
    }
    else if(temperature < 30){
        return 'lightsalmon';
    }
    else{
        return 'lightcoral';
    }
}

const displayWeatherData = (data) => {
    const weatherDataElement = document.getElementById("weather-data");

    if(Object.keys(data).length === 0){
        weatherDataElement.innerHTML = "Please enter a location to see weather."
    }
    else{
        const backgroundColor = getBackgroundColor(Math.floor(data.main.temp - 273.15));
        weatherDataElement.style.backgroundColor = backgroundColor;

        weatherDataElement.innerHTML = `
                                <h3>${data.name}</h3>
                                <p>Temperature: ${Math.floor(data.main.temp - 273.15)}C</p>
                                <p>Humidity: ${data.main.humidity}%</p>
                                <p>Wind Speed: ${data.wind.speed} m/s</p>
                                `;
    }
}

window.onload = async () => {
    const weatherData = await getWeatherData();
    displayWeatherData(weatherData);
}