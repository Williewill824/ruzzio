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
    $("#cityname").text(city);
    $("#date").text(date);
    $("#temp").text(temp);
    $("#humidity").text(humidity);
    $("#windspeed").text(windSpeed);
    $("#icon").attr("src",img);
});
};

function getUv(lat,lon){
  var APIKey = "4641272d610c090cce9d1120a51b5feb";
  var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat +  "&lon=" + lon + "&appid=" + APIKey;


  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
        
           
    var uvIndex = response.value;
    
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
     for(var i = 0; i < response.list.length; i++){
      var day = response.list[i];
      var date = day.dt_txt;
      var humidity = day.main.humidity;
      var icon = day.weather[0].icon;
      var temp = day.main.temp;

      if(date.includes("15:00")){
        console.log(date,humidity,temp,icon);

        dates.push(date);
        temperatures.push(temp);
        humidities.push(humidity);

      }
        
     };
    
    
    
});
    getCurrent(); 
    // getFiveDayForCast();
};











