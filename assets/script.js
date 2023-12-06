// DEPENDENCIES
var searchFormEl = document.querySelector("#search-form");
var searchResults = document.getElementById("dynamic-results");
var searchInput = document.getElementById("search-input");
var savedBooksContainer = document.getElementById("saved-books-container");
var savedBookList = document.getElementById("saved-book-list");

// DATA
var globalLocData = {};

// FUNCTIONS
function formSubmitHandler(event) {
  event.preventDefault();
  console.log("You clicked a button!");

  if (!searchInput) {
    console.error("You need a search input value!");
    return;
  }
  getLocApi();
  getGoogleApi();
  if (data.results.length) {
    console.log("No results found!");
  }
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
  var requestUrl =
    "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data2) {
      console.log(data2);
    });
}

// USER INPUT
searchFormEl.addEventListener("submit", formSubmitHandler);

// INITIALIZATION
