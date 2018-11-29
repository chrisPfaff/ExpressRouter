let express = require("express");
let router = express.Router();
require("dotenv").config();
const fetch = require("node-fetch");
//const getImage = require("../controllers/getImageController");
router.use(express.static(__dirname + "/public"));

let groceryList = [];
let id = 0;

router.get("/", function(req, res) {
  res.render("items", {
    groceryListItems: groceryList
  });
});

router.get("/new", function(req, res) {
  res.render("new");
});

router.get("/get", function(req, res) {
  res.render("get", {
    groceryListItems: groceryList
  });
});

router.get("/item/get/:id", function(req, res) {
  var item = req.query.item;
  groceryList.forEach(function(listItems) {
    if (item === listItems[0]) {
      res.render("showItem", { item: item });
    }
  });
  res.render("notFound");
});

router.get("/edit", function(req, res) {
  res.render("edit", { groceryListItems: groceryList });
});

router.post("/item/edit/:id", async function(req, res) {
  var oldItem = req.body.item;
  var newItem = req.body.newItem;
  let x = await fetch(
    `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${
      req.body.newItem
    }&client_id=${process.env.API_KEY}`
  )
    .then(data => {
      return data.json();
    })
    .then(item => {
      return item.results[0].urls.thumb;
    });
  groceryList.forEach(function(listItems, index) {
    if (oldItem === listItems[1]) {
      var id = listItems[2];
      groceryList.splice(index, 1);
      groceryList.splice(index, 0, [x, newItem, id]);
      console.log(x);
      res.redirect("/");
    }
  });
  res.render("notFound");
});

router.post("/item", async function(req, res) {
  let url = await fetch(
    `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${
      req.body.item
    }&client_id=${process.env.API_KEY}`
  )
    .then(data => {
      return data.json();
    })
    .then(item => {
      return item.results[0].urls.thumb;
    });

  groceryList.push([url, req.body.item, id]);
  console.log(groceryList);
  id++;
  res.redirect("/");
});

router.get("/delete", function(req, res) {
  res.render("delete", {
    groceryListItems: groceryList
  });
});

router.delete("/item/delete/:id", function(req, res) {
  var item = req.body.item;
  groceryList.forEach(function(listItems, index) {
    console.log(listItems);
    if (item === listItems[1]) {
      groceryList.splice(index, 1);
      res.redirect("/");
    }
  });
  res.render("notFound");
});

module.exports = router;
