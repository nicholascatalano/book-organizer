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
}

function getGoogleApi() {
  searchTerm = searchInput.value.split(" ");
  urlTerm = searchTerm.join("+");
  console.log(searchTerm);
  console.log(urlTerm);
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


