console.log("projectAVALANCHE");
var poemAPIquery;
function cleanUp() {
  $(`#currentWeather`).empty();
  $(`#wind`).empty();
  $(`#humidity`).empty();
  $(`#temp`).empty();
  $(`#poem`).empty();
  $(`#city`).empty();
}

//https://stackoverflow.com/questions/28580947/jquery-animate-css-animation-only-working-once-animation-not-resetting
function reset($elem) {
  $elem.before($elem.clone(true));
  var $newElem = $elem.prev();
  $elem.remove();
  return $newElem;
}
$("#enter").on("click", function(e) {
  cleanUp();
  $("#greeting").hide();
  $("#welcomeText").hide();
  $("#secondpage").show();
  //$(".scrollToTop").hide();
  // $("#typearea").hide();
  // $(".form-control").show();

  //Scroll up button fades in when you scroll down to a certain point and fades out when you scroll back up.
  $(window).scroll(function() {
    if ($(this).scrollTop() > 400) {
      $(".scrollToTop").fadeIn();
    } else {
      $(".scrollToTop").fadeOut();
    }
  });

  //When the scroll up button is pressed scroll function will allow you to get to the top of the page smoothly instead of instantly getting there.
  $(".scrollToTop").click(function() {
    $("html, body").animate({ scrollTop: 0 });
  });

  //   function(err) {
  //     console.log(err);
  //     $(`#currentWeather`).empty();
  //     $(`#wind`).empty();
  //     $(`#humidity`).empty();
  //     $(`#temp`).empty();
  //     $(`#poem`).empty();

  //     $(`#city`).text("Sorry, we couldn't find that location!");
  //   }
  //   )
  //               .catch(err => {
  //   console.log("nick", err);
  // if ((err.statusText = "error")) {
  //   //display error message to user
  //   $(`#currentWeather`).empty();
  //   $(`#wind`).empty();
  //   $(`#humidity`).empty();
  //   $(`#temp`).empty();
  //   $(`#poem`).empty();

  //   $(`#city`).text("Sorry, we couldn't find that location!");
  // }

  // This is our API key
  var APIKey = "166a433c57516f51dfab1f7edaed8413";
  let locationInfo = $(`#typearea`).val();
  // Here we are building the URL we need to query the database
  var queryURL =
    "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?" +
    `q=${locationInfo}&units=imperial&APPID=` +
    APIKey;

  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
    //headers: { "X-Requested-With": "XMLHttpRequest" }
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
      // Log the queryURL

      console.log(queryURL);

      // Log the resulting object
      console.log(response);

      // Transfer content to HTML
      console.log($("#city"));
      $("#city").removeClass();
      $("#city").html("<h1>" + response.name + " Weather Details</h1>");
      reset($("#city"));
      $("#city").addClass("animated fadeInLeftBig");
      console.log($("#city"));
      //   Found code for Capitalize first letter of String: https://joshtronic.com/2016/02/14/how-to-capitalize-the-first-letter-in-a-string-in-javascript/

      let weatherDescription =
        response.weather[0].description.charAt(0).toUpperCase() +
        response.weather[0].description.substring(1);

      $(`#currentWeather`).removeClass();
      $(`#currentWeather`).empty();
      $("#currentWeather").text("Current Weather: " + weatherDescription);
      reset($("#currentWeather"));
      $("#currentWeather").addClass("animated fadeInRightBig");

      $(`#wind`).removeClass();
      $(`#wind`).empty();
      $("#wind").text("Wind Speed: " + response.wind.speed + " mph");
      reset($("#wind"));
      $("#wind").addClass("animated fadeInLeftBig");

      $(`#humidity`).removeClass();
      $(`#humidity`).empty();
      $("#humidity").text("Humidity: " + response.main.humidity + "%");
      reset($("#humidity"));
      $("#humidity").addClass("animated fadeInRightBig");

      $(`#temp`).removeClass();
      $(`#temp`).empty();
      $("#temp").html("Temperature " + response.main.temp + "&#176;F");
      reset($("#temp"));
      $("#temp").addClass("animated fadeInLeftBig");

      $(`#typearea`).val("");
      // Log the data in the console as well
      console.log(response.weather.description);
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + response.main.temp);

      //Poem API using Weather description as search term
      var poemAPIquery = response.weather[0].main;
      console.log(poemAPIquery);
      var settings = {
        async: true,
        crossDomain: true,
        url: `https://cors-anywhere.herokuapp.com/https://thundercomb-poetry-db-v1.p.rapidapi.com/lines/${poemAPIquery}`,
        method: "GET",
        headers: {
          "x-rapidapi-host": "thundercomb-poetry-db-v1.p.rapidapi.com",
          "x-rapidapi-key": "19dc21ba3bmsh40de2f313d3e435p1cf0acjsn33cd70909f84"
        }
      };

      if (poemAPIquery === "Thunderstorm") {
        var poemAPIquery = "Storm";

        $.ajax(settings)
          .done(function(response) {
            poemNum = Math.floor(Math.random() * response.length + 1);
            responseChoice = response[poemNum];
            console.log(responseChoice);
          })
          .then(function(response) {
            if (response[poemNum]) {
              $(`#poem`).empty();

              responseChoice = response[poemNum];
              var authorName = responseChoice.author;
              console.log(authorName);
              var poemTitle = responseChoice.title;
              console.log(poemTitle);
              var authorPush = $(
                `<p class="poemPrinter text-center animated fadeIn">${authorName}</p>`
              );
              var titlePush = $(
                `<p class="poemPrinter text-center font-weight-bold animated fadeIn">"${poemTitle}"</p>`
              );
              $(`#poem`).append(titlePush);
              $(`#poem`).append(authorPush);
              $(`#poem`).append($(`<br>`));

              var wholePoem = responseChoice.lines;
              wholePoem.forEach(element => {
                lineDiv = $(
                  `<p class="poemPrinter text-center animated fadeInUpBig">${element}</p>`
                );
                $(`#poem`).append(lineDiv);
              });
            }
          });
      } else {
        $.ajax(settings)
          .done(function(response) {
            poemNum = Math.floor(Math.random() * response.length + 1);
            responseChoice = response[poemNum];
            console.log(responseChoice);
          })
          .then(function(response) {
            if (response[poemNum]) {
              $(`#poem`).empty();

              responseChoice = response[poemNum];
              var authorName = responseChoice.author;
              console.log(authorName);
              var poemTitle = responseChoice.title;
              console.log(poemTitle);
              var authorPush = $(
                `<p class="poemPrinter text-center animated fadeIn">${authorName}</p>`
              );
              var titlePush = $(
                `<p class="poemPrinter text-center font-weight-bold animated fadeIn">"${poemTitle}"</p>`
              );
              $(`#poem`).append(titlePush);
              $(`#poem`).append(authorPush);
              $(`#poem`).append($(`<br>`));

              var wholePoem = responseChoice.lines;
              wholePoem.forEach(element => {
                lineDiv = $(
                  `<p class="poemPrinter text-center animated fadeInUpBig">${element}</p>`
                );
                $(`#poem`).append(lineDiv);
              });
            }
          });
      }
    })
    .catch(function(err) {
      cleanUp();
      $(`#city`).text("Sorry, we couldn't find that location!");
    });
});
$("#typearea").keyup(function(event) {
  if (event.keyCode === 13) {
    $("#enter").click();
  }
});

$(`#logotype`).on("click", function() {
  location.reload();
});
