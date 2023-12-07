// DEPENDENCIES
var searchFormEl = document.querySelector("#search-form");
var searchResults = document.getElementById("dynamic-results");
var searchInput = document.getElementById("search-input");
var savedBooksContainer = document.getElementById("saved-books-container");
var savedBookList = document.getElementById("saved-book-list");

// DATA

// FUNCTIONS
function formSubmitHandler(event) {
  event.preventDefault();
  console.log("You clicked a button!");
  getGoogleApi();
  getLocApi();
}

function getLocApi() {
  // variable to hold LOC query url
  var locQueryUrl = "https://www.loc.gov/books/?fo=json";
  // splits and joins the search input using the correct format
  searchTerm = searchInput.value.split(" ");
  urlTerm = searchTerm.join("+");

  // redefines the LOC query url to combine with the search query
  locQueryUrl = locQueryUrl + "&q=" + urlTerm;

  // fetch API using the LOC query url
  fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    // stores the data in locData
    .then(function (locData) {
      console.log(locData);

      // if there is no data in the results section of the data array, return
      if (!locData.results.length) {
        console.log("No results found.");
      } else searchResults.textContent = "";
      // else print the results to the page using the printLocResults() function;
      for (var i = 0; i < locData.results.length; i++) {
        printLocResults(locData.results[i]);
      }
    });
}

function getGoogleApi() {
  searchTerm = searchInput.value.split(" ");
  urlTerm = searchTerm.join("+");
  console.log(searchTerm);
  console.log(urlTerm);
  var requestUrl =
    "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function printLocResults(locData) {
  console.log(locData);
  searchResults.textContent = "PRINTED!";

  // variable to hold card which will house LOC results info
  var locInfoCard = document.createElement("div");
  locInfoCard.classList.add("mb-2", "p-2", "text-dark", "bg-light", "card");

  // variable to hold body of the LOC results info
  var locInfoBody = document.createElement("div");
  locInfoBody.classList.add("card-body");
  locInfoCard.append(locInfoBody);
}

// USER INPUT
searchFormEl.addEventListener("submit", formSubmitHandler);

// INITIALIZATION
