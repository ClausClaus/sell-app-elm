var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get("/", function (req, res, next) {
  req.url = '/index.html';
  next();
});

app.use(router);

let appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;


var apiRouters = express.Router();

apiRouters.get('/seller', (req, res) => {
  res.json(seller)
});
apiRouters.get('/goods', (req, res) => {
  res.json(goods)
});
apiRouters.get('/ratings', (req, res) => {
  res.json(ratings)
});
app.use('/api', apiRouters);

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:' + port + '\n')
});
