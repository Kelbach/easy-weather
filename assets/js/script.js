// GIVEN a weather dashboard with form inputs
// WHEN I search for a city

var apiKey = "ec563e39065a30ccacdb51c199d52f0e";
var searchBtn = $("#btn");

var displayWeather = function(data) {
    console.log("..displaying weather..");
    var cWeatherTemp = "Temp: "+ Math.round((data.main.temp-273.15)*(9/5)+32)+"°F";
    console.log(cWeatherTemp);

    var cWeatherWindSpeed = data.wind.speed+" m/s";
    var cWeatherWindDeg = data.wind.deg+"° clockwise of North";
    var cWeatherWind = "Wind: "+cWeatherWindSpeed+", "+cWeatherWindDeg
    console.log(cWeatherWind);

    var cWeatherHumid = "Humidity: "+data.main.humidity+"%";
    console.log(cWeatherHumid);
    
    $('#current').html("<ul><li>"+cWeatherTemp+"</li><li>"+cWeatherWind+"</li><li>"+cWeatherHumid+"</li></ul>");
};

var getWeather = function(city) {
    console.log("..getting weather..");
    //somethings wrong with apicall
    var apiCall = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey;
    console.log(apiCall);

    fetch(apiCall)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayWeather(data, city);
            });
        } else {
            alert("Error: City Not Found");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to Open Weather");
    });
};

searchBtn.on("click", function(event) {
    event.preventDefault();
    var city = $("#city-search").val().replace(/ /s, ""); //hmmm, regex to get rid of spaces
    console.log(city);

    if (city) {
        getWeather(city);
    } else {
        alert("Please Enter a City");
    }
    
});

// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city