// DEPENDENCIES
var searchFormEl = document.querySelector("#search-form");
var searchResults = document.getElementById("dynamic-results");
var googleResults = document.getElementById("dynamic-google-results");
var searchInput = document.getElementById("search-input");
var savedBooksContainer = document.getElementById("saved-books-container");
var savedBookList = document.getElementById("saved-book-list");
var savedBooks = [];

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
      for (var i = 0; i < 8; i++) {
        printLocResults(locData.results[i]);
      }
    });
}

function getGoogleApi() {
  searchTerm = searchInput.value.split(" ");
  urlTerm = searchTerm.join("+");
  var requestUrl =
    "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm;
  fetch(requestUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (googleData) {
      if (!googleData.items.length) {
        console.log("No results found.");
      } else {
        printGoogleResults(googleData);
      }
    });
}

function printGoogleResults(googleData) {
  console.log(googleData);
  var googleTitle = googleData.items[0].volumeInfo.title;
  var googleLink = googleData.items[0].volumeInfo.previewLink;
  console.log(googleTitle);
  console.log(googleLink);

  var googleInfoCard = document.createElement("div");
  googleInfoCard.classList.add("mb-2", "p-2", "dynamic-card", "card");

  var googlePageLink = document.createElement("a");
  googlePageLink.textContent = googleTitle;
  googlePageLink.setAttribute("href", googleLink);

  googleResults.innerHTML = "";

  googleInfoCard.append(googlePageLink);
  googleResults.append(googleInfoCard);

  var saveBookBtn = document.createElement("button");
  googleInfoCard.appendChild(saveBookBtn);
  saveBookBtn.classList.add("saved-button");

  saveBookBtn.addEventListener("click", function (event) {
    event.preventDefault();
    storeBooks();
    renderBookList();
  });
  function storeBooks() {
    // check to see if "savedBooks" is in localStorage
    savedBooks = getSavedBooks();
    savedBooks.push({
      googleTitle,
      googleLink,
    });
    localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
  }
  renderBookList();
}

function getSavedBooks() {
  if (localStorage.getItem("savedBooks")) {
    return JSON.parse(localStorage.getItem("savedBooks"));
  } else {
    return [];
  }
}

function printLocResults(locData) {
  console.log(locData);

  // variable to hold card which will house LOC results info
  var locInfoCard = document.createElement("div");
  locInfoCard.classList.add("mb-2", "mx-2", "p-2", "dynamic-card", "card");

  // variable to hold body of the LOC results info
  var locInfoBody = document.createElement("div");
  locInfoBody.classList.add("card-body");
  locInfoCard.append(locInfoBody);

  // variable to hold title of LOC result
  var locTitleEl = document.createElement("h5");
  locTitleEl.textContent = locData.title;

  // variable to hold body content of loc results
  var locBodyInfoEl = document.createElement("p");

  // if statement to check if there is a value in the description of a result
  if (locData.description) {
    locBodyInfoEl.innerHTML =
      "<strong>Description:</strong> " + locData.description[0] + "<br/>";
  } else {
    ("<strong>Description:</strong> No description for this result.");
  }

  // button variable that redirects to LOC result
  var locButtonEl = document.createElement("a");
  locButtonEl.textContent = "Read More";
  locButtonEl.setAttribute("href", locData.url);
  locButtonEl.classList.add("btn", "btn-dark");

  // appends title, body info (description), and read more button to body of card
  locInfoBody.append(locTitleEl, locBodyInfoEl, locButtonEl);

  // appends LOC info card to search results container
  searchResults.append(locInfoCard);
}

function renderBookList() {
  savedBooks = getSavedBooks();
  savedBookList.innerHTML = "";
  for (var i = 0; i < savedBooks.length; i++) {
    var savedBook = savedBooks[i];
    var li = document.createElement("li");
    var link = document.createElement("a");
    link.textContent = savedBook.googleTitle;
    link.setAttribute("href", savedBook.googleLink);
    li.setAttribute("data-index", i);
    var deleteBookBtn = document.createElement("button");
    deleteBookBtn.textContent = "🗑️";
    deleteBookBtn.addEventListener("click", function (event) {
      event.preventDefault();
      var element = event.target;
      if (element.matches("button") === true) {
        var index = element.parentElement.getAttribute("data-index");
        savedBooks.splice(index, 1);
        localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
        renderBookList();
      }
    });
    li.appendChild(link);
    li.appendChild(deleteBookBtn);
    savedBookList.appendChild(li);
  }
}

function init() {
  renderBookList();
}

// USER INPUT
searchFormEl.addEventListener("submit", formSubmitHandler);

// INITIALIZATION
init();
