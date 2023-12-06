// DEPENDENCIES
var searchFormEl = document.querySelector("#search-form");

// DATA

// FUNCTIONS
function formSubmitHandler(event) {
  event.preventDefault();
  console.log("You clicked a button!");
}
// USER INPUT
searchFormEl.addEventListener("submit", formSubmitHandler);

// INITIALIZATION
