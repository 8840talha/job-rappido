var express = require('express');
var exphbs = require('express-handlebars');
const expressip = require('express-ip');
const axios = require('axios');


var app = express();





app.use(expressip().getIpInfoMiddleware);

app.engine('handlebars', exphbs());

app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', { title: 'Job Rappido',country:req.ipInfo.country});
});

app.get('/search', function (req, res) {
  queries = req.ipInfo+""+req.query;

  let url = `https://indreed.herokuapp.com/api/jobs?`;
  if (queries) {
    axios.get(url, {
      params: queries
    })
      .then(function (response) {
        res.render("search", { title: "Job Rappido", jobs: response.data,country:req.ipInfo.country });


      })
      .catch(function (error) {
        console.log(error);
      });
  }
  else {
    res.render("search", { title: "Job Rappido",country:req.ipInfo.country })
  }


});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function () {
  console.log('Server started');
});
