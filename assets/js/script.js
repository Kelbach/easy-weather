// GIVEN a weather dashboard with form inputs
// WHEN I search for a city

var apiKey = "ec563e39065a30ccacdb51c199d52f0e";
var searchBtn = $("#btn");

var cities = JSON.parse(localStorage.getItem('cities')) || [];

$("document").ready(function() {
    for (var i = 0; i < cities.length; i++) {
        var searched = $("<div>").addClass("col-12");
        var button = $("<button>").addClass("city").text(cities[i]);
        $("#searched").append(searched.append(button));
    }
    $(".city").on("click", function(event) {
        event.preventDefault();
        var city = $(this).text();
        console.log(city);
    
        if (city) {
            if(cities.indexOf(city) === -1) {
                cities.push(city);
                localStorage.setItem('cities', JSON.stringify(cities));
                console.log(cities);
                var searched = $("<div>").addClass("col-12");
                var button = $("<button id='prev-btn'>").text(city);
                $("#searched").append(searched.append(button));
            }
            $("#dash-title").text("Your Weather Dashboard for "+city);
            getWeather(city);
    
        } else {
            alert("Please Enter a City");
        }
        
    });


});

var displayWeather = function(data) {
    $("#current").html("");
    console.log("..displaying weather..");
    var date = moment.unix(data.dt).format("dddd, MMMM Do, YYYY");
    console.log(date);
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
    var cardTitle = $("<h3>").text(date);
    var uList = $("<ul>").addClass("list-group-item");
    var listTemp = $("<li id='temp'>").addClass("list-group-item").text(cWeatherTemp);
    var listWind = $("<li>").addClass("list-group-item").text(cWeatherWind);
    var listHumid = $("<li>").addClass("list-group-item").text(cWeatherHumid);
    //var cardImage = $("<img src='http://openweathermap.org/img/wn/"+cWeatherCloudIcon+"@4x.png' />");

    $('#current').append(cardTitle).append(uList.append(listTemp).append(listWind).append(listHumid));
    //html("<h3>"+date+"</h3></li><li class='list-group-item'>"+cWeatherTemp+"</li><li class='list-group-item'>"+cWeatherWind+"</li><li class='list-group-item'>"+cWeatherHumid+"</li>");
    $('#image').html("<img src='http://openweathermap.org/img/wn/"+cWeatherCloudIcon+"@4x.png' />");

    var lat = data.coord.lat;
    var lon = data.coord.lon;

    getFive( lat , lon );
};

var getFive = function( x , y ) {
    console.log("..getting future weather for lat: "+x+", lon: "+y);
    var apiFCall = "https://api.openweathermap.org/data/2.5/onecall?lat="+x+"&lon="+y+"&exclude={"+"}&appid="+apiKey+"&units=imperial";
    console.log(apiFCall);

    fetch(apiFCall)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayFive(data);
            });
        } else {
            alert("Error: Five Day Forecast Not Found");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to Open Weather");
    });
};

var displayFive = function(data) {
    $("#future").html("");

    for (var i = 1; i < 6 ; i++) {
        var day = data.daily[i];
        var date = moment.unix(day.dt).format("dddd, Do");
        console.log("/////////"+date+"/////////");

        var fWeatherTemp = "Low: "+ day.temp.min+"°F, High: "+day.temp.max+"°F";
        console.log(fWeatherTemp);

        var fWeatherWindSpeed = day.wind_speed+" mph";
        var fWeatherWindDeg = day.wind_deg;
        var fWeatherWindDir = "";

        //simple function for changing angle into cardinal direction
        var windDirection = (function() {
            if (0<fWeatherWindDeg<22.5 || 337.5<fWeatherWindDeg<360) {
                fWeatherWindDir = "N";
            } if (22.5<fWeatherWindDeg<67.5) {
                fWeatherWindDir = "NE";
            } if (67.5<fWeatherWindDeg<112.5) {
                fWeatherWindDir = "E";
            } if (112.5<fWeatherWindDeg<157.5) {
                fWeatherWindDir = "SE";
            } if (157.5<fWeatherWindDeg<202.5) {
                fWeatherWindDir = "S";
            } if (202.5<fWeatherWindDeg<247.5) {
                fWeatherWindDir = "SW";
            } if (247.5<fWeatherWindDeg<292.5) {
                fWeatherWindDir = "W";
            } if (292.5<fWeatherWindDeg<337.5) {
                fWeatherWindDir = "NW";
            }
        });
        windDirection();

        var fWeatherWind = "Wind: "+fWeatherWindSpeed+" "+fWeatherWindDir;
        console.log(fWeatherWind);

        var fWeatherHumid = "Humidity: "+day.humidity+"%";
        console.log(fWeatherHumid);

        //image for sky
        var fWeatherCloudIcon = day.weather[0].icon;

        //generate cards for forecast
        var card = $("<div>").addClass("card border m-1 w-40")
        //.html("<h4>"+date+"</h4><ul><li class='list-group-item'>"+fWeatherTemp+"</li><li class='list-group-item'>"+fWeatherWind+"</li><li class='list-group-item'>"+fWeatherHumid+"</li></ul>");
        var cardTitle = $("<h4>").text(date);
        var uvF = Math.floor(day.uvi);
        var uvFuture = $("<li>").addClass("list-group-item uv-"+uvF).text("UV Index: "+ day.uvi);    
        var ulist = $("<ul>").addClass("list-group");
        var listTemp = $("<li id='temp'>").addClass("list-group-item").text(fWeatherTemp);
        var listWind = $("<li>").addClass("list-group-item").text(fWeatherWind);
        var listHumid = $("<li>").addClass("list-group-item").text(fWeatherHumid);
        var cardImage = $("<img src='http://openweathermap.org/img/wn/"+fWeatherCloudIcon+"@4x.png' />");
        
        $('#future').append(card.append(cardTitle).append(cardImage).append(ulist.append(listTemp).append(listWind).append(listHumid).append(uvFuture)));
    }
    //generate uv index for current day
    var uvF = Math.floor(data.current.uvi);
    var uvCurrent = $("<li>").addClass("list-group-item uv-"+uvF).text("UV Index: "+data.current.uvi);
    $("#current ul").append(uvCurrent);
};

var getWeather = function(city) {
    console.log("..getting current weather..");
    var apiCCall = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=imperial";
    console.log(apiCCall);

    fetch(apiCCall)
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
    var city = $("#city-search").val().replace(/ /g, "+"); //hmmm, regex to get rid of spaces
    console.log(city);

    if (city) {
        if(cities.indexOf(city) === -1) {
            cities.push(city);
            localStorage.setItem('cities', JSON.stringify(cities));
            console.log(cities);
            var searched = $("<div>").addClass("col-12");
            var button = $("<button id='prev-btn' city='"+city+"'>").text(city);
            $("#searched").append(searched.append(button));
        }
        $("#dash-title").text("Your Weather Dashboard for "+city);
        getWeather(city);

    } else {
        alert("Please Enter a City");
    }
    
});