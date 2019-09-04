var express = require('express');
var exphbs = require('express-handlebars');
const expressip = require('express-ip');
const axios = require('axios');

var app = express();
// let PORT = process.env.PORT || 3000;
// app.set("PORT", PORT);

app.engine('handlebars', exphbs());
app.use(expressip().getIpInfoMiddleware);
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', { title: 'Job Rappido' });
});

app.get('/search', function (req, res) {
  queries = req.query;

  let url = `https://indreed.herokuapp.com/api/jobs`;
  if (queries) {
    axios.get(url, {
      params: queries
    })
      .then(function (response) {
        res.render("search", { title: "Job Rappido", jobs: response.data });


      })
      .catch(function (error) {
        console.log(error);
      });
  }
  else {
    res.render("search", { title: "Job Rappido" })
  }


});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}


app.listen(port, function () {
    console.log('Server started');
});
