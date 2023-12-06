// DEPENDENCIES
var searchFormEl = document.querySelector("#search-form");
var searchResults = document.getElementById("#dynamic-results");

// DATA

// FUNCTIONS
function formSubmitHandler(event) {
  event.preventDefault();
  console.log("You clicked a button!");
}

function getApi() {
  var requestUrl = 'https://www.googleapis.com/books/v1/volumes?q=search+terms';
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
getApi();