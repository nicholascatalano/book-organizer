function getApi() {
  var requestUrl = 'https://www.googleapis.com/books/v1/volumes?q=witcher';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
}

getApi();
