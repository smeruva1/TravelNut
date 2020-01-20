var myDiv = $("#myDiv");
var myPage = $("#myPage")

setTimeout(function () {
  myDiv.css('display', 'none')
  myPage.removeClass("hide")
}, 2 * 1000);


/* var apiKey = "EoaHroi7P4OkRghUpmF59aH3x9Cgg11C";

queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=EoaHroi7P4OkRghUpmF59aH3x9Cgg11C";
console.log (queryURL)

var corsAPI = `https://alex-rosencors.herokuapp.com/?url=${queryURL}`

$.ajax({
  url: corsAPI,
  method: "GET"
})
.then(function (eventRes) {
  console.log(eventRes);
}); */

var td = $(".td");
var submitBtn = $("button");
var cityArr = [];
var currentDay = moment().subtract(10, 'days').calendar();


function accuweatherURL(key, value) {
  var apikey = "?apikey=VWYubnkyp0mi8ho0Mo8xO9DHULE781DY";
  var baseURL = "";

  if (key === "key") {

    var query = "&q=" + value;
    var details = "&details=false";
    baseURL += "http://dataservice.accuweather.com/locations/v1/cities/search" + apikey + query + details

  } else if (key === "forecast") {
    baseURL += "http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + value + apikey
  }

  return baseURL
}

$("#searchBtn").on("click", function () {
  var searchFor = $("#searchInput").val();
  $("#searchInput").val("");

  console.log("Search: ", searchFor)

  $.get(accuweatherURL("key", searchFor))
    .then(function (keyResponse) {

      console.log("KeyResponse: ", keyResponse[0])
      var key = keyResponse[0].Key
      console.log("Key: ", key)
      $.get(accuweatherURL("forecast", key))
        .then(function (forecastResponse) {

          console.log("ForecastResponse: ", forecastResponse)

          $("#city").text(keyResponse[0].LocalizedName)
          $("#date").text(moment(forecastResponse.Headline.EffectiveDate).format("MM/DD/YYYY"))
          $("#temperature").text(forecastResponse.DailyForecasts[0].Temperature.Minimum.Value)




        })
    })
})



/* 
  $.ajax({
    url: queryUrl,
    method: "GET"
  })
  .then(function (weatherRes) {
    console.log(weatherRes);
    var coordinates=weatherRes.coord
   
    ;
    $(".City").text(weatherRes.name + " " + currentDay);
    $(".Temperature").text(weatherRes.main.temp);
    $(".Humidity").text(weatherRes.main.humidity);
    $(".Wind-Speed").text(weatherRes.wind.speed);
    // currentDay.text(day.format('dddd, MMMM Do YYYY'));
 */

/* 
cityArr.push(city)
console.log(cityArr) */
/*  weatherSearch (city,country) */
/* 
    $('#search-input').val("");
    $('#user-input').empty()

    cityArr.forEach(function (city) {
      $("<button>")
        .addClass('btn btn-outline-success city-btn btn-group')
        .text(city)
        .attr("weather-data", city)
        .appendTo("#user-input");
    });
    function fiveDayForecast(city) {
      var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + API_KEY;
      console.log(forecastUrl);
      
        $.ajax({
        url:forecastUrl,
        method: "GET"
      })
      .then(function (forecastRes) {
        console.log("Forecast: ", forecastRes);
    
        var fiveDayList = forecastRes.list.filter(function(day) {
          if (day.dt_txt.includes("12:00")) {
            console.log(day);
            return true;
          }
          return false;
        });
        
        fiveDayList.forEach(function(day) {
          console.log(day);
        $('.five-day').append(`
        <div class="col-md-2 col-12">
          <div class="card">
            <div class="card-body bg-primary">
              <h6>${day.dt_txt}</h6>
              <p>Temp: ${day.main.temp} F</p>
              <p>Humidity: ${day.main.humidity}%</p>
            </div>
          </div>
        </div>  
        `)
          
        });
      })
    } */