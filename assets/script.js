// DEPENDENCIES
var searchFormEl = document.querySelector("#search-form");
var searchResults = document.getElementById("dynamic-results");
var searchInput = document.getElementById("search-input");
var searchTerm = searchInput.value;
// DATA

// FUNCTIONS
function formSubmitHandler(event) {
  event.preventDefault();
  searchTerm = searchInput.value;
  console.log("You clicked a button!");
  console.log(searchTerm);
}

function getApi() {
  var requestUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerm;
  fetch(requestUrl)
    .then( function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })

}

// USER INPUT
searchFormEl.addEventListener("submit", formSubmitHandler);

// INITIALIZATION
// getApi();

