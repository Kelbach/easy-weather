var apiKey = "db2030d1933619405c76aa6d3c7e9034";
var searchBtn = $("#btn");
var city = "";
var apiCall = "api.openweathermap.org/data/2.5/weather?q={"+city+"}&appid={"+apiKey+"}";

var getWeather = function() {
    console.log("..getting weather..");
};

searchBtn.on("click", function(event) {
    event.preventDefault();
    var cityInput = $("#city-search").val(); //hmmm
    console.log(cityInput);

    if (cityInput) {
        getWeather(cityInput);
    } else {
        alert("Please Enter a City");
    }
    
});
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city