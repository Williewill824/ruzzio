$(document).ready(function () {
   var dates = [];
   var temperatures = [];
   var humidities = [];

  $("#search-btn").click(function (event) {
     event.preventDefault();

    var userCity = $("#input").val();
     getCurrent(userCity);
     getFiveDayForCast(userCity);
    
    
     
   })
});

function getCurrent(userCity){
  var APIKey = "4641272d610c090cce9d1120a51b5feb";

  var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + userCity + "&appid=" + APIKey;
    

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var city = response.name;
    var humidity = response.main.humidity;
    var date = moment().format("MMM DD")
    var windSpeed = response.wind.speed;
    var icon = response.weather[0].icon;
    var temp = response.main.temp;
    var img = "https://openweathermap.org/img/wn/" + icon + ".png";

    console.log(response);

    getUv(lat,lon);
    $("#cityname").text("City: " + city);
    $("#date").text("Date: " + date);
    $("#temp").text("Temperature: " + temp + String.fromCharCode(176) + "F");
    $("#humidity").text("Humidity: " + humidity + "%");
    $("#windspeed").text("Wind Speed: " + windSpeed + "Mph");
    $("#icon").attr("src",img);
});
};

function getUv(lat,lon){
  var APIKey = "4641272d610c090cce9d1120a51b5feb";
  var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat +  "&lon=" + lon + "&appid=" + APIKey;

  $.ajax({
    url: queryURL2,
    method: "GET"
  }).then(function(response){
    console.log(response);
   
    var uvIndex = response.value;
    $("#uv").text("UV Index: " + uvIndex);
    if( uvIndex < 8){
       $("#uv").addClass("low");
       $("#uv").removeClass("high");
    } else {
      $("#uv").addClass("high");
      $("#uv").removeClass("low");
    }
});
};

function getFiveDayForCast(userCity){
  var APIKey = "4641272d610c090cce9d1120a51b5feb";

  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + userCity + "&appid=" + APIKey;


  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    
    console.log("five days",response);
     for(var i = 1; i < 6; i++){
      var day = response.list[i];
      var date = moment().add(i, 'days').format('L');
      var humidity = day.main.humidity;
      var icon = "http://openweathermap.org/img/wn/" + day.weather[0].icon + ".png";
      var temp = day.main.temp;
      

      
      var dateEl = $("<p>").text("Date: " + date);
      var humidityEl = $("<p>").text("Humidity: " + humidity + "%"); 
      var iconEl = $("<img>").attr("src", icon);  
      var tempEL = $("<p>").text("Temperature: " + temp + String.fromCharCode(176) + "F");

      var forecastCol = $("<div class='col'>");
      var forecastMainDiv = $("<div class='forecastDays'>");
      forecastCol.append(forecastMainDiv);
      forecastMainDiv.append(dateEl, iconEl, tempEL, humidityEl);
      $("#fiveday").append(forecastCol);
     };

    
    
});
    getCurrent(); 
    // getFiveDayForCast();
};











