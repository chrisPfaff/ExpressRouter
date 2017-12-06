let express = require('express');
let router = express.Router();


router.use(express.static(__dirname + '/public'));

let groceryList = [['Ham', 1], ['Cheese', 2]];
let id = 3;

router.get('/', function(req, res) {
  res.render('items' , {
    groceryListItems: groceryList
  });
});

router.get('/new', function(req, res) {
  res.render('new');
})

router.get('/get', function(req, res) {
  res.render('get',  {
    groceryListItems: groceryList
  });
})

router.get('/get/:id', function(req, res) {
  var item = req.query.item;
  groceryList.forEach(function(listItems) {
    if(item === listItems[0]) {
      res.render('showItem', {item: item})
    }
  })
  res.render('notFound');
})

router.get('/edit', function(req, res) {
  res.render('edit', {groceryListItems: groceryList});
})

router.post('/edit/:id' , function(req, res) {
  var oldItem = req.body.item;
  var newItem = req.body.newItem;
  groceryList.forEach(function(listItems, index) {
    if(oldItem === listItems[0]) {
      var id = listItems[1];
      console.log(newItem);
      groceryList.splice(index, 1);
      groceryList.splice(index, 0, [newItem, id]);
      res.redirect('/item');
    }
  })
  res.render('notFound');
})

router.post('/', function(req, res) {
  console.log(req.body.item);
  groceryList.push([req.body.item, id]);
  id++;
  res.redirect('/item');
});

router.get('/delete', function(req, res) {
  res.render('delete', {
    groceryListItems: groceryList
  });
})

router.delete('/delete/:id', function(req, res) {
  var item = req.body.item;
  groceryList.forEach(function(listItems, index) {
    if(item === listItems[0]) {
      groceryList.splice(index, 1);
      res.redirect('/item');
    }
  })
  res.render('notFound');
})



module.exports = router;