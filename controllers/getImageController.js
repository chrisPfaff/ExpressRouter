const fetch = require("node-fetch");

function getImage(query) {
  fetch(
    `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${query}&client_id=${
      process.env.API_KEY
    }`
  )
    .then(data => {
      return data.json();
    })
    .then(item => {
      return item.results[0].urls.thumb;
    });
}

module.exports = getImage;
