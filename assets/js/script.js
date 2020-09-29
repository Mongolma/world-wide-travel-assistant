$(document).ready(function () {
    $(".currentTime").text(moment().format("llll"));
    // $(document).foundation();
});

// Add Date to top banner of app
var currentDate = moment().format("[Today is:] dddd, MMMM Do, YYYY");
var $todayDate = $(".todayDate");
$todayDate.text(currentDate);

// Clear screen data
$("#clear").click(function (event) {
    event.preventDefault();
    location.reload();
});

$("#submit").click(function (event) {
    event.preventDefault();
    var country = $("#country").val().trim().toUpperCase();
    var city = $("#city").val().trim().toUpperCase();
    var startDate = $("#sd").val().toString();
    var endDate = $("#ed").val().toString();
    // start year
    var syear = new Date(startDate).getFullYear();
    // start month
    var smonth = new Date(startDate).getMonth() + 1;
    // end year
    var eyear = new Date(endDate).getFullYear();
    // end month
    var emonth = new Date(endDate).getMonth() + 1;
    // start Day
    var startDay = new Date(startDate).getDate() + 1;
    // End Day
    var endDay = new Date(endDate).getDate() + 1;
    if (syear === eyear) {
        if (smonth === emonth) {
            var visitMonth = smonth;
        } else {
            var visitMonth = smonth + "," + emonth;
        }
    }
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    // Here we are building the URL we need to query the database
    var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" +
        city +
        "," +
        country +
        "&appid=" +
        APIKey;

    var latitude;

    var longitude;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET",
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var countrycode = response.sys.country;
            // function calls using the information we got from the weatherapi call
            console.log(response);
            //  calendricapi(
            //     countrycode,
            //     syear,
            //     eyear,
            //     smonth,
            //     emonth,
            //     visitMonth,
            //     startDay,
            //     endDay
            // );
            weatherforcastapi(lat, lon);
            // coutryflag(countrycode);
        });
});

// Calendricapi call begin
function calendricapi(
    countrycode,
    syear,
    eyear,
    smonth,
    emonth,
    visitMonth,
    startDay,
    endDay
) {
    if (syear === eyear) {
        $.ajax({
            url:
                "https://calendarific.com/api/v2/holidays?&api_key=dfd7976d8e75420dd3c5e1009a633b9446657f23&country=" +
                countrycode +
                "&year=" +
                syear +
                "&month=" +
                visitMonth,
            method: "GET",
        }).then(function (response) {
            var holidayarray = response.response.holidays;
            for (var i = 0; i < holidayarray.length; i++) {
                var hname = holidayarray[i].name;
                var hdescription = holidayarray[i].description;
                var hlocation = holidayarray[i].locations;
                var hstate = holidayarray[i].states;
                var htype = holidayarray[i].type;
                var hmonth = holidayarray[i].date.datetime.month;
                var hday = holidayarray[i].date.datetime.day;
                var hyear = holidayarray[i].date.datetime.year;
                var hdate = hmonth + "/" + hday + "/" + hyear;
                if (hmonth === smonth) {
                    if (hday < startDay) {
                        continue;
                    }
                }
                if (hmonth === emonth) {
                    if (hday > endDay) {
                        continue;
                    }
                }
                var trEl = $("<tr>");
                var td1 = $("<td>").text(hname);
                var td2 = $("<td>").text(hdate);
                trEl.append(td1, td2);
                $("#holiday").append(trEl);
            }
            console.log(response);
        });
    } else {
        // Code to be addded
        $.ajax({
            url:
                "https://calendarific.com/api/v2/holidays?&api_key=dfd7976d8e75420dd3c5e1009a633b9446657f23&country=" +
                countrycode +
                "&year=" +
                syear +
                "&month=" +
                smonth,
            method: "GET",
        }).then(function (response1) {
            var holidayarray = response1.response.holidays;
            for (var i = 0; i < holidayarray.length; i++) {
                var hname = holidayarray[i].name;
                var hdescription = holidayarray[i].description;
                var hlocation = holidayarray[i].locations;
                var hstate = holidayarray[i].states;
                var htype = holidayarray[i].type;
                var hmonth = holidayarray[i].date.datetime.month;
                var hday = holidayarray[i].date.datetime.day;
                var hyear = holidayarray[i].date.datetime.year;
                var hdate = hmonth + "/" + hday + "/" + hyear;
                if (hday < startDay) {
                    continue;
                }
                var trEl = $("<tr>");
                var td1 = $("<td>").text(hname);
                var td2 = $("<td>").text(hdate);
                trEl.append(td1, td2);
                $("#holiday").append(trEl);
            }
            console.log(response1);
            // ajax call for the end year goes here and updates the ui
            $.ajax({
                url:
                    "https://calendarific.com/api/v2/holidays?&api_key=dfd7976d8e75420dd3c5e1009a633b9446657f23&country=" +
                    countrycode +
                    "&year=" +
                    eyear +
                    "&month=" +
                    emonth,
            }).then(function (response2) {
                var holidayarray = response2.response.holidays;
                for (var i = 0; i < holidayarray.length; i++) {
                    var hname = holidayarray[i].name;
                    var hdescription = holidayarray[i].description;
                    var hlocation = holidayarray[i].locations;
                    var hstate = holidayarray[i].states;
                    var htype = holidayarray[i].type;
                    var hmonth = holidayarray[i].date.datetime.month;
                    var hday = holidayarray[i].date.datetime.day;
                    var hyear = holidayarray[i].date.datetime.year;
                    var hdate = hmonth + "/" + hday + "/" + hyear;
                    if (hday > endDay) {
                        continue;
                    }
                    var trEl = $("<tr>");
                    var td1 = $("<td>").text(hname);
                    var td2 = $("<td>").text(hdate);
                    trEl.append(td1, td2);
                    $("#holiday").append(trEl);
                }
                console.log(response2);
            });
        });
    }
}


function weatherforcastapi(lat, lon) {
    var APIKey = "166a433c57516f51dfab1f7edaed8413";

    var queryURL3 =
        "https://api.openweathermap.org/data/2.5/onecall?appid=" +
        APIKey +
        "&lat=" +
        lat +
        "&lon=" +
        lon;

    $.ajax({
        url: queryURL3,
        method: "GET"
    }).then(function (response3) {
        console.log(queryURL3);
        console.log(response3);

        // Loop through the forecast list array and display a single forecast entry/time 
        //(5th entry of each day which is close to the highest temp/time of the day) from each of the 5 days
        for (var i = 6; i < forecast.list.length; i +=10) {
            // 6, 14, 22, 30, 38
            var forecastDate = $("<h5>");

            var forecastPosition = (i + 2) / 8;

            console.log("#forecast-date" + forecastPosition);

            $("#forecast-date" + forecastPosition).empty();
            $("#forecast-date" + forecastPosition).append(
                forecastDate.text(nowMoment.add(1, "days").format("M/D/YYYY"))
            );

            var forecastIcon = $("<img>");
            forecastIcon.attr(
                "src",
                "https://openweathermap.org/img/w/" +
                forecast.list[i].weather[0].icon +
                ".png"
            );

            $("#forecast-icon" + forecastPosition).empty();
            $("#forecast-icon" + forecastPosition).append(forecastIcon);

            console.log(forecast.list[i].weather[0].icon);

            $("#forecast-temp" + forecastPosition).text(
                "Temp: " + forecast.list[i].main.temp + " °F"
            );
            $("#forecast-humidity" + forecastPosition).text(
                "Humidity: " + forecast.list[i].main.humidity + "%"
            );

            $(".forecast").attr(
                "style",
                "background-color:dodgerblue; color:white"

            );
        }
    });
}

//City information
function coutryflag(countrycode) {
    //https://restcountries.eu requires no api key
    $.ajax({
        url:
            "https://restcountries.eu/rest/v2/alpha/" +
            //country code pulls code from open weather api
            countrycode,
        method: "GET",
    }).then(function (response) {
        //Pulling image data and creating element dynamically
        var imgOfFlag = $("<img>").attr("src", response.flag);
        //Displaying it to the html selected by class
        $(".flag").append(imgOfFlag);
        //Displaying language data
        $(".language").text("Language: " + response.languages[0].name);
        //Displaying population & giving comma to it
        $(".population").text(
            "Population: " +
            Number(parseFloat(response.population).toFixed()).toLocaleString()
        );
        //Displaying currencies data (some countries use several currencies)
        $(".currencies").text(
            "Currencies: " +
            response.currencies
                .filter(function (c) {
                    return c.name;
                })
                .map(function (c) {
                    return c.name + "(" + c.code + ")";
                })
                .join(", ")
        );
        //Displaying dialing code
        $(".callingCode").text("Dialing code: +" + response.callingCodes);
    });
}