console.log("projectAVALANCHE");
var poemAPIquery;
$("#enter").on("click", function() {
  $("#greeting").hide();
  $("#welcomeText").hide();
  $("#secondpage").show();

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;
      console.log(results);
    });

  // This is our API key
  var APIKey = "166a433c57516f51dfab1f7edaed8413";
  let locationInfo = $(`#typearea`).val();
  // Here we are building the URL we need to query the database
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?" +
    `q=${locationInfo}&units=imperial&APPID=` +
    APIKey;

  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);

      // Transfer content to HTML

      $("#city").html("<h1>" + response.name + " Weather Details</h1>");
      $("#currentWeather").text(
        "Current Weather: " + response.weather[0].description
      );
      $("#wind").text("Wind Speed: " + response.wind.speed);
      $("#humidity").text("Humidity: " + response.main.humidity);
      $("#temp").text("Temperature (F) " + response.main.temp);
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
        url: `https://thundercomb-poetry-db-v1.p.rapidapi.com/lines/${poemAPIquery}`,
        method: "GET",
        headers: {
          "x-rapidapi-host": "thundercomb-poetry-db-v1.p.rapidapi.com",
          "x-rapidapi-key": "19dc21ba3bmsh40de2f313d3e435p1cf0acjsn33cd70909f84"
        }
      };

      $.ajax(settings)
        .done(function(response) {
          poemNum = Math.floor(Math.random() * response.length + 1);
          responseChoice = response[poemNum];
          console.log(responseChoice);
        })
        .then(function(response) {
          $(`#poem`).empty();

          responseChoice = response[poemNum];
          var authorName = responseChoice.author;
          console.log(authorName);
          var poemTitle = responseChoice.title;
          console.log(poemTitle);
          var authorPush = $(
            `<p class="poemPrinter text-center">${authorName}</p>`
          );
          var titlePush = $(
            `<p class="poemPrinter text-center font-weight-bold">"${poemTitle}"</p>`
          );
          $(`#poem`).append(titlePush);
          $(`#poem`).append(authorPush);
          $(`#poem`).append($(`<br>`));

          var wholePoem = responseChoice.lines;
          wholePoem.forEach(element => {
            lineDiv = $(`<p class="poemPrinter text-center">${element}</p>`);
            $(`#poem`).append(lineDiv);
          });
        });
    });
});
$("#typearea").keyup(function(event) {
  if (event.keyCode === 13) {
    $("#enter").click();
  }
});
