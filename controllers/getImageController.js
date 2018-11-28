const fetch = require("node-fetch");

async function getImage(query) {
  await fetch(
    `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=dog&client_id=${
      process.env.API_KEY
    }`
  )
    .then(data => {
      return data.json();
    })
    .then(item => {
      console.log(item.results[0].urls.thumb);
    });
}

module.exports = getImage;
