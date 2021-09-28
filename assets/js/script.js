// GIVEN a weather dashboard with form inputs
// WHEN I search for a city

var apiKey = "ec563e39065a30ccacdb51c199d52f0e";
var searchBtn = $("#btn");

var displayWeather = function(data) {
    console.log("..displaying weather..");
    var cWeatherCloud = data.weather[0].description;
    var cWeatherTemp = "Temp: "+ data.main.temp+"°F and "+cWeatherCloud;
    console.log(cWeatherTemp);

    var cWeatherWindSpeed = data.wind.speed+" mph";
    var cWeatherWindDeg = data.wind.deg;
    var cWeatherWindDir = "";

    //simple function for changing angle into cardinal direction
    var windDirection = (function(){
        if (0<cWeatherWindDeg<22.5 || 337.5<cWeatherWindDeg<360) {
            cWeatherWindDir = "N";
        } if (22.5<cWeatherWindDeg<67.5) {
            cWeatherWindDir = "NE";
        } if (67.5<cWeatherWindDeg<112.5) {
            cWeatherWindDir = "E";
        } if (112.5<cWeatherWindDeg<157.5) {
            cWeatherWindDir = "SE";
        } if (157.5<cWeatherWindDeg<202.5) {
            cWeatherWindDir = "S";
        } if (202.5<cWeatherWindDeg<247.5) {
            cWeatherWindDir = "SW";
        } if (247.5<cWeatherWindDeg<292.5) {
            cWeatherWindDir = "W";
        } if (292.5<cWeatherWindDeg<337.5) {
            cWeatherWindDir = "NW";
        }
    });
    windDirection();

    var cWeatherWind = "Wind: "+cWeatherWindSpeed+" from the "+cWeatherWindDir
    console.log(cWeatherWind);

    var cWeatherHumid = "Humidity: "+data.main.humidity+"%";
    console.log(cWeatherHumid);

    //image for sky
    var cWeatherCloudIcon = data.weather[0].icon;
    
    //adds info to page. still need to add an icon
    $('#current').html("<ul><li>"+cWeatherTemp+"</li><li>"+cWeatherWind+"</li><li>"+cWeatherHumid+"</li></ul>");
    $('#image').html("<img src='http://openweathermap.org/img/wn/"+cWeatherCloudIcon+"@4x.png' />");
};

var getWeather = function(city) {
    console.log("..getting weather..");
    var apiCall = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=imperial";
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
    var city = $("#city-search").val().replace(/ /g, ""); //hmmm, regex to get rid of spaces
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