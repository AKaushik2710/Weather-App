
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
        return 'linear-gradient(to right, rgba(38, 141, 238, 0.8),rgba(134, 231, 255, 0.9))';
    }
    else if(temperature < 10){
        return 'linear-gradient(to right, rgba(38, 238, 65, 0.8),rgba(161, 245, 179, 0.9))';
    }
    else if(temperature < 20){
        return 'linear-gradient(to right, rgba(220, 252, 81, 0.8),rgba(218, 255, 183, 0.9))';
    }
    else if(temperature < 30){
        return 'linear-gradient(to right, rgba(255, 238, 2, 0.8),rgba(250, 247, 92, 0.9))';
    }
    else{
        return 'linear-gradient(to right, rgba(255, 137, 2, 0.8),rgba(250, 200, 92, 0.9))';
    }
}

const displayWeatherData = (data) => {
    const weatherDataElement = document.getElementById("weather-data");

    if(Object.keys(data).length === 0){
        weatherDataElement.innerHTML = "Please enter a location to see weather."
    }
    else{
        const backgroundColor = getBackgroundColor(Math.floor(data.main.temp - 273.15));
        weatherDataElement.style.background = backgroundColor;

        weatherDataElement.innerHTML = `
                                <h3 id="nm">${data.name}</h3>
                                <p id="temperature">Temperature: ${Math.floor(data.main.temp - 273.15)}C</p>
                                <p id="humid">Humidity: ${data.main.humidity}%</p>
                                <p id="ws">Wind Speed: ${data.wind.speed} m/s</p>
                                `;
    }
}

window.onload = async () => {
    const weatherData = await getWeatherData();
    displayWeatherData(weatherData);
}