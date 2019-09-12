console.log("projectAVALANCHE");

var queryURL = `https://api.spotify.com/v1/playlists/${playlist_id}&api_key=f5b0995a65cc4dde87fa7cbb1fe2d1b6`;

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
