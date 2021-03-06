var myDiv = $("#myDiv");
var myPage = $("#myPage")
setTimeout(function () {
    myDiv.css('display', 'none')
    myPage.removeClass("hide")
}, 7 * 1000);


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
                    var mappedResponse = forecastResponse.DailyForecasts.map(function (forecast) {
                        if (forecast.Day.Icon < 10) {
                            forecast.Day.Icon = `0${forecast.Day.Icon}`
                        }

                        if (forecast.Night.Icon < 10) {
                            forecast.Night.Icon = `0${forecast.Night.Icon}`
                        }
                        return forecast
                    })
                    console.log(mappedResponse)
                    $("#city").text(keyResponse[0].LocalizedName)
                    $("#date").text(moment(forecastResponse.DailyForecasts[0].Date).format("MM/DD/YYYY"))
                    $("#temperature").text(forecastResponse.DailyForecasts[0].Temperature.Minimum.Value)
                    $("#temp").text(forecastResponse.DailyForecasts[0].Temperature.Maximum.Value)
                    $(".icon").empty()
                    var icon = $("<img>").attr("src", "https://api.accuweather.com/developers/Media/Default/WeatherIcons/" + mappedResponse[0].Day.Icon + "-s.png");
                    console.log(icon);
                    $(".icon").append(icon);
                });
        });
});
