console.log("projectAVALANCHE");

let playlist_id = "37i9dQZF1DX7KNKjOK0o75";
var queryURL = `https://api.spotify.com/v1/playlists/${playlist_id}`;

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
      $("#wind").text("Wind Speed: " + response.wind.speed);
      $("#humidity").text("Humidity: " + response.main.humidity);
      $("#temp").text("Temperature (F) " + response.main.temp);
      $(`#typearea`).val("");
      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + response.main.temp);
    });
});
