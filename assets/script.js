// DEPENDENCIES
var searchFormEl = document.querySelector("#search-form");
var searchResults = document.getElementById("dynamic-results");
var searchInput = document.getElementById("search-input");

// DATA

// FUNCTIONS
function formSubmitHandler(event) {
  event.preventDefault();
  console.log("You clicked a button!");
  getGoogleApi();
  getLocApi();
}

function getLocApi() {
  var locQueryUrl = "https://www.loc.gov/books/?fo=json";
  searchTerm = searchInput.value.split(" ");
  urlTerm = searchTerm.join("+");

  locQueryUrl = locQueryUrl + "&q=" + urlTerm;

  fetch(locQueryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function getGoogleApi() {
  searchTerm = searchInput.value.split(" ");
  urlTerm = searchTerm.join("+");
  console.log(searchTerm);
  console.log(urlTerm);
  var requestUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerm;
  fetch(requestUrl)
    .then( function (response) {
     if (!response.ok) {
      throw response.json()
     }
     return response.json()
    })
    .then(function(googleData) {
      console.log(googleData);
      if (!googleData.results.length) {
        console.log("No results found.")
      } else searchResults.textContent = "";
      for (var i = 0; i < googleData.results.length; i++) {
        printGoogleResults(googleData.results[i]);
      };
    });
};

function printGoogleResults(googleData) {
  console.log(googleData);
  searchResults.textContent = "PRINTED!";
}


// USER INPUT
searchFormEl.addEventListener("submit", formSubmitHandler);

// INITIALIZATION


